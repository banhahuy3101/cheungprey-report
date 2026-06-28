// Data access layer: all CRUD operations go through these functions
// so that business logic (like "double-entry lite" budget deductions
// and audit logging) is in one place.

import { v4 as uuidv4 } from "uuid";
import { store } from "./seed-data";
import type {
  AuditLog,
  Budget,
  Category,
  DistrictMonthlyReport,
  CommuneMonthlyReport,
  FinanceSummary,
  Notification,
  Profile,
  Report,
  ReportPartKey,
  Transaction,
  User,
  UserRole,
  CommuneReportData,
} from "./types";
import { ROLE_LEVEL, COMMUNE_ROLES, DISTRICT_ROLES } from "./types";

// ---- Permissions --------------------------------------------------------
//
// The PERMISSIONS map is the legacy flag-based permission table used by
// `useAuth().can(action)` in older code paths. It mirrors the new matrix
// described in the BRD. The more granular `usePermissions()` hook in
// `hooks/usePermissions.ts` should be preferred for new code.

export type PermissionFlag =
  | "canWriteTransaction"
  | "canReadTransactions"
  | "canWriteBudget"
  | "canExportPdf"
  | "canManageUsers"
  | "canDownloadReceipt"
  | "canApproveTransaction"
  | "canSendToProvince"
  | "canManageSystem";

export const PERMISSIONS: Record<UserRole, Record<PermissionFlag, boolean>> = {
  super_admin: {
    canWriteTransaction: true,
    canReadTransactions: true,
    canWriteBudget: true,
    canExportPdf: true,
    canManageUsers: true,
    canDownloadReceipt: true,
    canApproveTransaction: true,
    canSendToProvince: true,
    canManageSystem: true,
  },
  district_chief: {
    canWriteTransaction: true,
    canReadTransactions: true,
    canWriteBudget: true,
    canExportPdf: true,
    canManageUsers: true, // can manage commune_chief and commune_staff
    canDownloadReceipt: true,
    canApproveTransaction: true,
    canSendToProvince: true,
    canManageSystem: false,
  },
  district_admin: {
    canWriteTransaction: true,
    canReadTransactions: true,
    canWriteBudget: true,
    canExportPdf: true,
    canManageUsers: true, // can manage commune_staff only
    canDownloadReceipt: true,
    canApproveTransaction: true,
    canSendToProvince: false,
    canManageSystem: false,
  },
  commune_chief: {
    canWriteTransaction: true, // own commune
    canReadTransactions: true, // own commune
    canWriteBudget: true, // own commune
    canExportPdf: true,
    canManageUsers: false,
    canDownloadReceipt: true,
    canApproveTransaction: true,
    canSendToProvince: false,
    canManageSystem: false,
  },
  commune_staff: {
    canWriteTransaction: true, // own commune, draft only
    canReadTransactions: true, // own commune only
    canWriteBudget: false,
    canExportPdf: false,
    canManageUsers: false,
    canDownloadReceipt: true,
    canApproveTransaction: false,
    canSendToProvince: false,
    canManageSystem: false,
  },
  finance_viewer: {
    canWriteTransaction: false,
    canReadTransactions: true,
    canWriteBudget: false,
    canExportPdf: true,
    canManageUsers: false,
    canDownloadReceipt: false,
    canApproveTransaction: false,
    canSendToProvince: false,
    canManageSystem: false,
  },
};

/**
 * Returns the set of roles a given role is allowed to assign to other users.
 */
export function rolesAssignableBy(actor: UserRole): UserRole[] {
  if (actor === "super_admin") return [...DISTRICT_ROLES];
  if (actor === "district_chief")
    return ["commune_chief", "commune_staff", "finance_viewer"];
  if (actor === "district_admin") return ["commune_staff", "finance_viewer"];
  return [];
}

/** True if `actor` has a higher role level than `target`. */
export function canManageUser(actor: UserRole, target: UserRole): boolean {
  return ROLE_LEVEL[actor] > ROLE_LEVEL[target];
}

/** True if the user is allowed to view data at the given district. */
export function canAccessDistrict(
  actor: UserRole,
  actorDistrictId: string | null | undefined,
  targetDistrictId: string,
): boolean {
  if (actor === "super_admin") return true;
  return actorDistrictId === targetDistrictId;
}

/** True if the user is allowed to view data at the given commune. */
export function canAccessCommune(
  actor: UserRole,
  actorCommuneId: string | null | undefined,
  targetCommuneId: string,
): boolean {
  if (actor === "super_admin") return true;
  if (
    actor === "commune_chief" ||
    actor === "commune_staff" ||
    actor === "finance_viewer"
  ) {
    return actorCommuneId === targetCommuneId;
  }
  // District-level can access any commune in their district
  // (caller must additionally check district match).
  return true;
}

// ---- Users --------------------------------------------------------------

export function listUsers(): User[] {
  return store.users;
}

export function getUserById(id: string): User | undefined {
  return store.users.find((u) => u.id === id || u.uid === id);
}

export function listUsersInDistrict(districtId: string): User[] {
  return store.users.filter((u) => u.districtId === districtId);
}

export function createUser(input: Omit<User, "uid" | "id" | "createdAt"> & { uid?: string; id?: string }): User {
  const uid = input.uid ?? input.id ?? uuidv4();
  const user: User = {
    ...input,
    uid,
    id: uid,
    displayName: input.displayName ?? input.name,
    name: input.name ?? input.displayName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.users.push(user);
  return user;
}

export function updateUser(
  id: string,
  patch: Partial<Omit<User, "id" | "uid">>,
): User | undefined {
  const idx = store.users.findIndex((u) => u.id === id || u.uid === id);
  if (idx === -1) return undefined;
  store.users[idx] = {
    ...store.users[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  return store.users[idx];
}

export function deleteUser(id: string): boolean {
  const before = store.users.length;
  store.users = store.users.filter((u) => u.id !== id && u.uid !== id);
  return store.users.length < before;
}

// ---- Transactions -------------------------------------------------------

export function listTransactions(): Transaction[] {
  return [...store.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getTransaction(id: string): Transaction | undefined {
  return store.transactions.find((t) => t.id === id);
}

export function createTransaction(
  input: Omit<Transaction, "id" | "createdAt">,
): Transaction {
  const tx: Transaction = {
    ...input,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  store.transactions.push(tx);
  return tx;
}

export function updateTransaction(
  id: string,
  patch: Partial<Omit<Transaction, "id">>,
): Transaction | undefined {
  const idx = store.transactions.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  store.transactions[idx] = { ...store.transactions[idx], ...patch };
  return store.transactions[idx];
}

export function deleteTransaction(id: string): boolean {
  const before = store.transactions.length;
  store.transactions = store.transactions.filter((t) => t.id !== id);
  return store.transactions.length < before;
}

// ---- Budgets ------------------------------------------------------------

export function listBudgets(): Budget[] {
  return store.budgets;
}

export function getBudget(id: string): Budget | undefined {
  return store.budgets.find((b) => b.id === id);
}

export function createBudget(input: Omit<Budget, "id">): Budget {
  const budget: Budget = { ...input, id: uuidv4() };
  store.budgets.push(budget);
  return budget;
}

export function updateBudget(
  id: string,
  patch: Partial<Omit<Budget, "id">>,
): Budget | undefined {
  const idx = store.budgets.findIndex((b) => b.id === id);
  if (idx === -1) return undefined;
  store.budgets[idx] = { ...store.budgets[idx], ...patch };
  return store.budgets[idx];
}

export function deleteBudget(id: string): boolean {
  const before = store.budgets.length;
  store.budgets = store.budgets.filter((b) => b.id !== id);
  return store.budgets.length < before;
}

// ---- Reports ------------------------------------------------------------

export function listReports(): Report[] {
  return [...store.reports].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getReport(id: string): Report | undefined {
  return store.reports.find((r) => r.id === id);
}

export function createReport(
  input: Omit<Report, "id" | "createdAt" | "updatedAt">,
): Report {
  const now = new Date().toISOString();
  const report: Report = {
    ...input,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  store.reports.push(report);
  return report;
}

export function updateReport(
  id: string,
  patch: Partial<Omit<Report, "id">>,
): Report | undefined {
  const idx = store.reports.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  store.reports[idx] = {
    ...store.reports[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  return store.reports[idx];
}

export function deleteReport(id: string): boolean {
  const before = store.reports.length;
  store.reports = store.reports.filter((r) => r.id !== id);
  return store.reports.length < before;
}

// ---- Commune monthly reports -------------------------------------------

export function listCommuneReports(): CommuneMonthlyReport[] {
  return [...store.communeReports].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getCommuneReport(id: string): CommuneMonthlyReport | undefined {
  return store.communeReports.find((r) => r.id === id);
}

export function createCommuneReport(
  input: Omit<CommuneMonthlyReport, "id" | "createdAt" | "updatedAt">,
): CommuneMonthlyReport {
  const now = new Date().toISOString();
  const report: CommuneMonthlyReport = {
    ...input,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  store.communeReports.push(report);
  return report;
}

export function updateCommuneReport(
  id: string,
  patch: Partial<Omit<CommuneMonthlyReport, "id">>,
): CommuneMonthlyReport | undefined {
  const idx = store.communeReports.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  store.communeReports[idx] = {
    ...store.communeReports[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  return store.communeReports[idx];
}

export function deleteCommuneReport(id: string): boolean {
  const before = store.communeReports.length;
  store.communeReports = store.communeReports.filter((r) => r.id !== id);
  return store.communeReports.length < before;
}

// ---- District monthly reports ------------------------------------------

export function listDistrictReports(): DistrictMonthlyReport[] {
  return [...store.districtReports].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getDistrictReport(
  id: string,
): DistrictMonthlyReport | undefined {
  return store.districtReports.find((r) => r.id === id);
}

export function createDistrictReport(
  input: Omit<DistrictMonthlyReport, "id" | "createdAt">,
): DistrictMonthlyReport {
  const report: DistrictMonthlyReport = {
    ...input,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  store.districtReports.push(report);
  return report;
}

export function updateDistrictReport(
  id: string,
  patch: Partial<Omit<DistrictMonthlyReport, "id">>,
): DistrictMonthlyReport | undefined {
  const idx = store.districtReports.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  store.districtReports[idx] = { ...store.districtReports[idx], ...patch };
  return store.districtReports[idx];
}

export function deleteDistrictReport(id: string): boolean {
  const before = store.districtReports.length;
  store.districtReports = store.districtReports.filter((r) => r.id !== id);
  return store.districtReports.length < before;
}

// ---- Audit log ----------------------------------------------------------

export function listAuditLogs(): AuditLog[] {
  return [...store.auditLogs].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export function pushAuditLog(
  entry: Omit<AuditLog, "id" | "timestamp">,
): void {
  store.auditLogs.push({
    ...entry,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  });
}

// ---- Notifications ------------------------------------------------------

export function listNotifications(userId: string): Notification[] {
  return store.notifications
    .filter((n) => n.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function createNotification(
  input: Omit<Notification, "id" | "createdAt">,
): Notification {
  const n: Notification = {
    ...input,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  store.notifications.push(n);
  return n;
}

export function markNotificationRead(id: string, read = true): void {
  const idx = store.notifications.findIndex((n) => n.id === id);
  if (idx >= 0) store.notifications[idx].read = read;
}

// ---- Districts & Communes (catalog) ------------------------------------

export interface District {
  id: string;
  nameKh: string;
  nameEn: string;
  provinceId: string;
  provinceNameKh: string;
  chiefName: string;
}

export interface Commune {
  id: string;
  nameKh: string;
  nameEn: string;
  districtId: string;
  chiefName: string;
  villages: string[];
}

export function listDistricts(): District[] {
  return store.districts;
}

export function getDistrict(id: string): District | undefined {
  return store.districts.find((d) => d.id === id);
}

export function listCommunes(districtId?: string): Commune[] {
  return districtId
    ? store.communes.filter((c) => c.districtId === districtId)
    : store.communes;
}

export function getCommune(id: string): Commune | undefined {
  return store.communes.find((c) => c.id === id);
}

// ---- Profiles -----------------------------------------------------------

export function listProfiles(): Profile[] {
  return store.profiles;
}

export function createProfile(input: Omit<Profile, "id" | "createdAt" | "updatedAt">): Profile {
  const profile: Profile = {
    ...input,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.profiles.push(profile);
  return profile;
}

export function updateProfile(id: string, patch: Partial<Omit<Profile, "id">>): Profile | undefined {
  const idx = store.profiles.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  store.profiles[idx] = {
    ...store.profiles[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  return store.profiles[idx];
}

export function deleteProfile(id: string): boolean {
  const before = store.profiles.length;
  store.profiles = store.profiles.filter((p) => p.id !== id);
  return store.profiles.length < before;
}

export function getProfile(id: string): Profile | undefined {
  return store.profiles.find((p) => p.id === id);
}

// ---- Aggregations -------------------------------------------------------

export function getFinanceSummary(): FinanceSummary {
  const completed = store.transactions.filter((t) => t.status === "completed");
  const totalIncome = completed
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = completed
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const totalBudgetAllocated = store.budgets.reduce(
    (s, b) => s + b.allocatedAmount,
    0,
  );
  // Compute spent per budget category (current year/month)
  const spentByCategory: Record<string, number> = {};
  completed
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const d = new Date(t.date);
      // match against any budget for the same year+category,
      // or annual budget (month = null)
      const matching = store.budgets.find(
        (b) =>
          b.category === t.category &&
          b.year === d.getFullYear() &&
          (b.month === null || b.month === d.getMonth() + 1),
      );
      if (matching) {
        spentByCategory[matching.id] =
          (spentByCategory[matching.id] ?? 0) + t.amount;
      }
    });
  const totalBudgetSpent = Object.values(spentByCategory).reduce(
    (s, n) => s + n,
    0,
  );
  const totalBudgetRemaining = totalBudgetAllocated - totalBudgetSpent;
  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    totalBudgetAllocated,
    totalBudgetSpent,
    totalBudgetRemaining,
  };
}

export function getCategoryBreakdown(): Array<{
  category: Category;
  amount: number;
  percentage: number;
}> {
  const completed = store.transactions.filter(
    (t) => t.status === "completed" && t.type === "expense",
  );
  const total = completed.reduce((s, t) => s + t.amount, 0);
  const byCategory: Partial<Record<Category, number>> = {};
  completed.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount;
  });
  return Object.entries(byCategory).map(([category, amount]) => ({
    category: category as Category,
    amount: amount ?? 0,
    percentage: total > 0 ? Math.round(((amount ?? 0) / total) * 100) : 0,
  }));
}

export function getBudgetActualSpent(budget: Budget): number {
  return store.transactions
    .filter(
      (t) =>
        t.status === "completed" &&
        t.type === "expense" &&
        t.category === budget.category &&
        new Date(t.date).getFullYear() === budget.year &&
        (budget.month === null ||
          new Date(t.date).getMonth() + 1 === budget.month),
    )
    .reduce((s, t) => s + t.amount, 0);
}

export function getMonthlyTrend(months = 6): Array<{
  monthLabel: string;
  income: number;
  expense: number;
}> {
  // last N months, oldest first
  const result: Array<{ monthLabel: string; income: number; expense: number }> = [];
  const today = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const label = `${year}-${String(month + 1).padStart(2, "0")}`;
    const txs = store.transactions.filter((t) => {
      const td = new Date(t.date);
      return (
        t.status === "completed" &&
        td.getFullYear() === year &&
        td.getMonth() === month
      );
    });
    const income = txs
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = txs
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    result.push({ monthLabel: label, income, expense });
  }
  return result;
}

// ---- Formatters ---------------------------------------------------------

export function formatKHR(n: number): string {
  return `${n.toLocaleString("km-KH")} ៛`;
}

export function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatCurrency(n: number, currency: "KHR" | "USD" = "KHR"): string {
  return currency === "USD" ? formatUSD(n) : formatKHR(n);
}

const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
const KHMER_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

function toKhmerNum(n: number): string {
  return String(n).replace(/\d/g, (d) => KHMER_DIGITS[+d]);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return formatDateObj(d);
}

export function formatDateObj(d: Date): string {
  const day = toKhmerNum(d.getDate());
  const month = KHMER_MONTHS[d.getMonth()];
  const year = toKhmerNum(d.getFullYear());
  return `${day} ${month} ${year}`;
}

export function reportPartsForKeys(keys: ReportPartKey[]): string[] {
  // Just a helper for the PDF generator: returns labels for given keys
  return keys.map((k) => k);
}

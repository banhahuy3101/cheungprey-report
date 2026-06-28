// Domain types for the District Monthly Report System
// with Finance module and granular permissions.

// ============================================================
// User, Role & Permission Types
// ============================================================

/**
 * All available roles in the system, in ascending order of privilege.
 * Used to compare role hierarchy: a user can manage roles strictly
 * below their own level.
 */
export type UserRole =
  | "super_admin"
  | "district_chief"
  | "district_admin"
  | "commune_chief"
  | "commune_staff"
  | "finance_viewer";

/**
 * Role hierarchy numeric level. Higher number = higher privilege.
 * Used to enforce "can only manage roles below your own" rules.
 */
export const ROLE_LEVEL: Record<UserRole, number> = {
  finance_viewer: 10,
  commune_staff: 20,
  commune_chief: 30,
  district_admin: 40,
  district_chief: 50,
  super_admin: 100,
};

/** Roles for a commune (assigned by district admins/chiefs/super). */
export const COMMUNE_ROLES: UserRole[] = ["commune_chief", "commune_staff", "finance_viewer"];

/** Roles for district-level administration. */
export const DISTRICT_ROLES: UserRole[] = [
  "district_chief",
  "district_admin",
  "commune_chief",
  "commune_staff",
  "finance_viewer",
];

/** Roles a district_chief is allowed to assign. */
export const ROLES_ASSIGNABLE_BY_DISTRICT_CHIEF: UserRole[] = [
  "commune_chief",
  "commune_staff",
];

/** Roles a district_admin is allowed to assign. */
export const ROLES_ASSIGNABLE_BY_DISTRICT_ADMIN: UserRole[] = ["commune_staff"];

/** Document / data status used across all report collections. */
export type ReportStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "finalized"
  | "sent_to_province";

/** Optional granular permission overrides (e.g. "finance_export"). */
export type ExtraPermission = "finance_export" | "audit_log_access" | "system_config";

/**
 * A user document. Mirrors the Firestore `users/{uid}` collection.
 *
 * `uid` is the document ID and is the same as Firebase Auth UID.
 */
export interface User {
  uid: string;
  id: string; // alias of uid for legacy code; kept for backward compat
  email: string;
  displayName: string;
  name: string; // alias of displayName for legacy code
  role: UserRole;
  districtId: string;
  communeId?: string | null; // required when role is commune_*
  permissions?: ExtraPermission[];
  status: "active" | "disabled";
  createdAt: string; // ISO
  updatedAt?: string; // ISO
  updatedBy?: string; // uid of admin who last modified
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string;
}

// ============================================================
// Report & Finance domain types
// ============================================================

export type TransactionType = "income" | "expense";
export type TransactionStatus = "pending" | "completed" | "cancelled";
export type PaymentMethod = "cash" | "bank_transfer" | "ABA_KHQR";
export type Currency = "KHR" | "USD";
export type Category =
  | "operation"
  | "salary"
  | "marketing"
  | "utility"
  | "service"
  | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  currency: Currency;
  description: string;
  date: string; // ISO string
  paymentMethod: PaymentMethod;
  reference: string;
  status: TransactionStatus;
  receiptImageUrl?: string;
  /** The entity this transaction belongs to ("district" or "commune"). */
  entityType: "district" | "commune";
  /** The ID of the district or commune this transaction is for. */
  entityId: string;
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Budget {
  id: string;
  year: number;
  month: number | null; // null = annual
  category: Category;
  allocatedAmount: number;
  note?: string;
  entityType: "district" | "commune";
  entityId: string;
  createdBy?: string;
  createdAt?: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  totalBudgetAllocated: number;
  totalBudgetSpent: number;
  totalBudgetRemaining: number;
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
}

// Report parts - modular selection
export type ReportPartKey =
  | "summary"
  | "budgetVsActual"
  | "categoryBreakdown"
  | "incomeBySource"
  | "allTransactions"
  | "pendingInvoices"
  | "expenseTrend"
  | "incomeTrend";

export interface ReportPart {
  key: ReportPartKey;
  label: string;
  group: string;
}

export interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  text?: string;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
}

/** A user-built report (from the TipTap report builder). */
export interface Report {
  id: string;
  title: string;
  documentNumber: string;
  date: string;
  location: string;
  selectedParts: ReportPartKey[];
  contentJson?: TipTapNode;
  contentHtml?: string;
  variables: {
    author: string;
    approvedBy: string;
  };
  status: "draft" | "finalized";
  /** What level this report represents. */
  level: "commune" | "district";
  /** District this report belongs to. */
  districtId: string;
  /** Commune this report belongs to (for commune-level reports). */
  communeId?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/** A commune monthly report (the political/activity data, not finance). */
export interface CommuneMonthlyReport {
  id: string;
  communeId: string;
  districtId: string;
  month: number;
  year: number;
  /** All the form sections described in the BRD. */
  data: CommuneReportData;
  status: "draft" | "submitted" | "approved" | "rejected";
  rejectionReason?: string | null;
  submittedBy?: string;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommuneReportData {
  security?: {
    crimeCases: number;
    drugCases: number;
    trafficAccidents: number;
    description: string;
  };
  economy?: {
    ricePrice: number;
    jobSituation: string;
    migration: number;
  };
  partyMembers?: {
    totalMembers: number;
    femaleMembers: number;
    newMembers: number;
    exitedMembers: number;
    branches: Array<{ village: string; members: number; female: number; new: number }>;
  };
  meetings?: {
    partyLifeMeetings: number;
    trainingSessions: number;
    participants: number;
    policyPropagation: number;
  };
  grassrootsActivities?: {
    teamsDispatched: number;
    issuesResolved: number;
    charityWorks: string;
  };
  infrastructure?: {
    roads: number;
    canals: number;
    schools: number;
    wells: number;
  };
  challenges?: string;
  nextMonthPlan?: string;
}

/** A consolidated district monthly report. */
export interface DistrictMonthlyReport {
  id: string;
  districtId: string;
  month: number;
  year: number;
  documentNumber: string;
  date: string;
  summary: Record<string, number | string>;
  selectedParts: ReportPartKey[];
  contentHtml?: string;
  contentJson?: TipTapNode;
  status: "draft" | "finalized" | "sent_to_province";
  consolidatedFrom: string[]; // commune report IDs
  createdBy: string;
  createdAt: string;
  finalizedBy?: string;
  finalizedAt?: string;
  sentBy?: string;
  sentAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: "create" | "update" | "delete" | "approve" | "reject" | "submit" | "login";
  collection: string;
  documentId: string;
  changes?: Record<string, unknown>;
  districtId?: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string; // recipient
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  link?: string;
  createdAt: string;
}

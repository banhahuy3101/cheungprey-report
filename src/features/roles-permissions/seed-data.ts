// Seed data and shared in-memory data store.
import type {
  AuditLog,
  Budget,
  CommuneMonthlyReport,
  DistrictMonthlyReport,
  Notification,
  Profile,
  Report,
  Transaction,
  User,
} from "@/lib/types";

export const REPORT_PARTS = [
  { key: "summary", label: "1.1 សមតុល្យសរុប (Income - Expense)", group: "ផ្នែកទី១៖ សង្ខេបទូទៅ" },
  { key: "budgetVsActual", label: "1.2 ការប្រៀបធៀបថវិកាទល់នឹងការចំណាយជាក់ស្តែង", group: "ផ្នែកទី១៖ សង្ខេបទូទៅ" },
  { key: "categoryBreakdown", label: "2.1 តារាងចំណាយតាមប្រភេទ", group: "ផ្នែកទី២៖ ព័ត៌មានលម្អិតតាមប្រភេទ" },
  { key: "incomeBySource", label: "2.2 តារាងចំណូលតាមប្រភព", group: "ផ្នែកទី២៖ ព័ត៌មានលម្អិតតាមប្រភេទ" },
  { key: "allTransactions", label: "3.1 បញ្ជីប្រតិបត្តិការទាំងអស់", group: "ផ្នែកទី៣៖ ប្រតិបត្តិការលម្អិត" },
  { key: "pendingInvoices", label: "3.2 បញ្ជីវិក្កយបត្រដែលមិនទាន់បង់", group: "ផ្នែកទី៣៖ ប្រតិបត្តិការលម្អិត" },
  { key: "expenseTrend", label: "4.1 ក្រាហ្វិកនិន្នាការចំណាយ ៦ខែ", group: "ផ្នែកទី៤៖ ក្រាហ្វិក" },
  { key: "incomeTrend", label: "4.2 ក្រាហ្វិកចំណូល ៦ខែ", group: "ផ្នែកទី៤៖ ក្រាហ្វិក" },
] as const;

const now = new Date().toISOString();

// Users are managed in Supabase `profiles` table
const sampleUsers: User[] = [];

const sampleTransactions: Transaction[] = [
  { id: "t1", type: "income", category: "service", amount: 15000000, currency: "KHR", description: "លក់សេវាកម្មប្រចាំខែ", date: "2026-06-01T00:00:00Z", paymentMethod: "bank_transfer", reference: "INV-2026-001", status: "completed", entityType: "district", entityId: "district_101", createdBy: "u_super", createdAt: now },
  { id: "t2", type: "expense", category: "salary", amount: 4000000, currency: "KHR", description: "ប្រាក់ខែបុគ្គលិកខែមិថុនា", date: "2026-06-05T00:00:00Z", paymentMethod: "bank_transfer", reference: "PAY-2026-002", status: "completed", entityType: "district", entityId: "district_101", createdBy: "u_dadmin", createdAt: now },
  { id: "t3", type: "expense", category: "utility", amount: 350000, currency: "KHR", description: "ថ្លៃភ្លើង និងទឹកប្រចាំខែ", date: "2026-06-10T00:00:00Z", paymentMethod: "cash", reference: "BILL-2026-003", status: "pending", entityType: "district", entityId: "district_101", createdBy: "u_dadmin", createdAt: now },
  { id: "t4", type: "expense", category: "operation", amount: 1250000, currency: "KHR", description: "ទិញកុំព្យូទ័រថ្មី", date: "2026-06-07T00:00:00Z", paymentMethod: "ABA_KHQR", reference: "INV-00123", status: "completed", entityType: "district", entityId: "district_101", createdBy: "u_dadmin", createdAt: now },
  { id: "t5", type: "expense", category: "marketing", amount: 500000, currency: "KHR", description: "ចំណាយផ្សព្វផ្សាយ Facebook", date: "2026-06-15T00:00:00Z", paymentMethod: "bank_transfer", reference: "ADS-2026-005", status: "completed", entityType: "district", entityId: "district_101", createdBy: "u_dadmin", createdAt: now },
  { id: "t6", type: "income", category: "service", amount: 8000000, currency: "KHR", description: "លក់សេវាកម្មបន្ថែម", date: "2026-06-20T00:00:00Z", paymentMethod: "ABA_KHQR", reference: "INV-2026-006", status: "completed", entityType: "district", entityId: "district_101", createdBy: "u_dadmin", createdAt: now },
];

const sampleBudgets: Budget[] = [
  { id: "b1", year: 2026, month: 6, category: "operation", allocatedAmount: 5000000, note: "ថវិកាប្រតិបត្តិការ", entityType: "district", entityId: "district_101" },
  { id: "b2", year: 2026, month: 6, category: "salary", allocatedAmount: 4500000, note: "ថវិកាប្រាក់ខែ", entityType: "district", entityId: "district_101" },
  { id: "b3", year: 2026, month: 6, category: "utility", allocatedAmount: 500000, note: "ថវិកាទឹកភ្លើង", entityType: "district", entityId: "district_101" },
  { id: "b4", year: 2026, month: 6, category: "marketing", allocatedAmount: 1000000, note: "ថវិកាទីផ្សារ", entityType: "district", entityId: "district_101" },
];

const sampleReports: Report[] = [{
  id: "r1",
  title: "របាយការណ៍ហិរញ្ញវត្ថុប្រចាំខែឧសភា ២០២៦",
  documentNumber: "២៥/០៥/២០២៦/គ.បក.ស្រុក",
  date: "2026-05-25",
  location: "រាជធានីភ្នំពេញ",
  selectedParts: ["summary", "categoryBreakdown", "pendingInvoices"],
  contentHtml: "<h3>Sample report content</h3><p>This is a sample finalized report.</p>",
  variables: { author: "District Admin", approvedBy: "Committee" },
  status: "finalized",
  level: "district",
  districtId: "district_101",
  communeId: null,
  createdBy: "u_dadmin",
  createdAt: now,
  updatedAt: now,
}];

const sampleAuditLogs: AuditLog[] = [
  { id: "l1", userId: "u_super", action: "create", collection: "transactions", documentId: "t1", districtId: "district_101", timestamp: now },
  { id: "l2", userId: "u_dadmin", action: "update", collection: "transactions", documentId: "t3", districtId: "district_101", timestamp: now },
  { id: "l3", userId: "u_super", action: "login", collection: "users", documentId: "u_super", districtId: "district_101", timestamp: now },
];

const sampleNotifications: Notification[] = [
  { id: "n1", userId: "u_dadmin", title: "របាយការណ៍ថ្មី", message: "Commune Chief submitted a new report.", type: "info", read: false, createdAt: now },
  { id: "n2", userId: "u_cchef", title: "របាយការណ៍ត្រូវបានអនុម័ត", message: "Your report has been approved by district.", type: "success", read: false, createdAt: now },
];

type District = { id: string; nameKh: string; nameEn: string; provinceId: string; provinceNameKh: string; chiefName: string; };
type CommuneData = { id: string; nameKh: string; nameEn: string; districtId: string; chiefName: string; villages: string[]; };

const sampleDistricts: District[] = [{ id: "district_101", nameKh: "ស្រុកពួក", nameEn: "Puok", provinceId: "province_14", provinceNameKh: "ខេត្តសៀមរាប", chiefName: "District Chief" }];
const sampleCommunes: CommuneData[] = [{ id: "commune_001", nameKh: "ឃុំសាស្ត្រា", nameEn: "Sastra", districtId: "district_101", chiefName: "Commune Chief", villages: ["ភូមិកណ្តាល", "ភូមិត្រពាំង"] }, { id: "commune_002", nameKh: "ឃុំកណ្តាល", nameEn: "Kandal", districtId: "district_101", chiefName: "Commune Chief 2", villages: ["ភូមិថ្មី", "ភូមិចាស់"] }];

type Store = {
  users: User[];
  profiles: Profile[];
  transactions: Transaction[];
  budgets: Budget[];
  reports: Report[];
  auditLogs: AuditLog[];
  communeReports: CommuneMonthlyReport[];
  districtReports: DistrictMonthlyReport[];
  notifications: Notification[];
  districts: District[];
  communes: CommuneData[];
  currentUserId: string | null;
};

const globalForStore = globalThis as unknown as { __financeStore?: Store };

function buildStore(): Store {
  return {
    users: [...sampleUsers],
    profiles: [],
    transactions: [...sampleTransactions],
    budgets: [...sampleBudgets],
    reports: [...sampleReports],
    auditLogs: [...sampleAuditLogs],
    communeReports: [],
    districtReports: [],
    notifications: [...sampleNotifications],
    districts: [...sampleDistricts],
    communes: [...sampleCommunes],
    currentUserId: null,
  };
}

export const store: Store =
  globalForStore.__financeStore ?? (globalForStore.__financeStore = buildStore());

// Helper to read the store synchronously from data.ts
export function getStore(): Store {
  return store;
}
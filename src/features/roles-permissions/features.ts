import type { PermissionFlag } from "@/lib/data";

export interface Feature {
  key: string;
  labelKh: string;
  labelEn: string;
  description: string;
  icon: string;
  route: string;
  permissionKey: PermissionFlag | "";
  sortOrder: number;
}

export const FEATURES: Feature[] = [
  { key: "dashboard", labelKh: "ផ្ទាំងគ្រប់គ្រង", labelEn: "Dashboard", description: "ទិន្នន័យសង្ខេប និងស្ថិតិ", icon: "LayoutDashboard", route: "/dashboard", permissionKey: "", sortOrder: 1 },
  { key: "transactions", labelKh: "ប្រតិបត្តិការ", labelEn: "Transactions", description: "គ្រប់គ្រងចំណូល-ចំណាយ", icon: "Receipt", route: "/dashboard/transactions", permissionKey: "canReadTransactions", sortOrder: 2 },
  { key: "budgets", labelKh: "ថវិកា", labelEn: "Budgets", description: "គ្រប់គ្រងថវិកាប្រចាំឆ្នាំ", icon: "Wallet", route: "/dashboard/budgets", permissionKey: "canWriteBudget", sortOrder: 3 },
  { key: "reports", labelKh: "របាយការណ៍", labelEn: "Reports", description: "បង្កើត និងនាំចេញរបាយការណ៍", icon: "FileText", route: "/dashboard/reports", permissionKey: "canExportPdf", sortOrder: 4 },
  { key: "commune-evaluation", labelKh: "វាយតម្លៃឃុំ/សង្កាត់", labelEn: "Commune Evaluation", description: "វាយតម្លៃប្រចាំខែ", icon: "ClipboardCheck", route: "/dashboard/commune-evaluation", permissionKey: "canViewEvaluation", sortOrder: 5 },
  { key: "users", labelKh: "អ្នកប្រើប្រាស់", labelEn: "Users", description: "គ្រប់គ្រងអ្នកប្រើប្រាស់", icon: "Users", route: "/dashboard/users", permissionKey: "canManageUsers", sortOrder: 6 },
  { key: "profiles", labelKh: "បញ្ជីសមាជិក", labelEn: "Profiles", description: "គ្រប់គ្រងទិន្នន័យសមាជិក", icon: "UserCheck", route: "/dashboard/profiles", permissionKey: "", sortOrder: 7 },
  { key: "audit", labelKh: "កំណត់ត្រាសកម្មភាព", labelEn: "Audit", description: "មើលប្រវត្តិសកម្មភាព", icon: "History", route: "/dashboard/audit", permissionKey: "", sortOrder: 8 },
  { key: "permissions", labelKh: "សិទ្ធិអំណាច", labelEn: "Permissions", description: "កំណត់សិទ្ធិតាមតួនាទី", icon: "Shield", route: "/dashboard/settings/permissions", permissionKey: "canManageSystem", sortOrder: 9 },
  { key: "settings", labelKh: "ការកំណត់", labelEn: "Settings", description: "ការកំណត់ប្រព័ន្ធ", icon: "Settings", route: "/dashboard/settings", permissionKey: "canManageSystem", sortOrder: 10 },
];

export function getFeature(key: string): Feature | undefined {
  return FEATURES.find((f) => f.key === key);
}

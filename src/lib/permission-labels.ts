import type { PermissionFlag } from "./data";

export const PERMISSION_LABELS: Record<PermissionFlag, string> = {
  canWriteTransaction: "សរសេរប្រតិបត្តិការ",
  canReadTransactions: "មើលប្រតិបត្តិការ",
  canWriteBudget: "សរសេរថវិកា",
  canExportPdf: "នាំចេញ PDF",
  canManageUsers: "គ្រប់គ្រងអ្នកប្រើ",
  canDownloadReceipt: "ទាញយកវិក័យប័ត្រ",
  canApproveTransaction: "អនុម័តប្រតិបត្តិការ",
  canSendToProvince: "ផ្ញើទៅខេត្ត",
  canManageSystem: "គ្រប់គ្រងប្រព័ន្ធ",
};

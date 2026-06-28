"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Pencil, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import { type PermissionFlag, PERMISSIONS } from "@/lib/data";
import type { UserRole } from "@/lib/types";

const PERMISSION_LABELS: Record<PermissionFlag, string> = {
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

const ALL_PERMISSIONS = Object.keys(PERMISSIONS["super_admin"]) as PermissionFlag[];

type PermissionsMap = Record<string, Record<string, boolean>>;

export default function PermissionDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [perms, setPerms] = useState<PermissionsMap | null>(null);
  const [loading, setLoading] = useState(true);

  const role = params.key as string;

  const loadPermissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/role-permissions");
      if (!res.ok) throw new Error("Failed to load");
      const data: { role: string; permissions: Record<string, boolean> }[] = await res.json();
      const map: PermissionsMap = {};
      for (const row of data) map[row.role] = row.permissions;
      setPerms(map);
    } catch {
      const map: PermissionsMap = {};
      map[role] = { ...PERMISSIONS[role as UserRole] };
      setPerms(map);
    }
    setLoading(false);
  }, [role]);

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  const permsForRole = perms?.[role];
  const canEdit = user?.role === "super_admin";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/settings/permissions" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              <Badge variant="info" className="text-sm">{roleLabel(role as UserRole)}</Badge>
            </h1>
            <p className="text-sm text-slate-500">សិទ្ធិអំណាចសម្រាប់តួនាទីនេះ</p>
          </div>
          {canEdit && (
            <Link href={`/dashboard/settings/permissions/${role}/edit`} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
              <Pencil size={14} /> កែប្រែ
            </Link>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 font-medium text-slate-500">សិទ្ធិ</th>
                <th className="text-center py-3 px-3 font-medium text-slate-500 w-24">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map((perm) => {
                const enabled = permsForRole?.[perm] ?? false;
                return (
                  <tr key={perm} className="border-b border-slate-100">
                    <td className="py-2.5 px-4 text-slate-700">{PERMISSION_LABELS[perm]}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                        enabled ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-300"
                      }`}>
                        {enabled ? "✓" : "✗"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

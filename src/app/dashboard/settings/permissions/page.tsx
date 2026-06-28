"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/features/auth/supabase-auth";
import { type PermissionFlag, PERMISSIONS } from "@/lib/data";
import { PERMISSION_LABELS } from "@/features/roles-permissions/permission-labels";
import type { UserRole } from "@/lib/types";

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

const ALL_PERMISSIONS = Object.keys(PERMISSIONS[ALL_ROLES[0]]) as PermissionFlag[];

type PermissionsMap = Record<string, Record<string, boolean>>;

export default function PermissionsListPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "super_admin";
  const [perms, setPerms] = useState<PermissionsMap | null>(null);
  const [loading, setLoading] = useState(true);

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
      for (const role of ALL_ROLES) map[role] = { ...PERMISSIONS[role] };
      setPerms(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/settings" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">សិទ្ធិអំណាច</h1>
        <p className="text-sm text-slate-500">សិទ្ធិតាមតួនាទីនីមួយៗ — ចុចលើតួនាទីដើម្បីកែប្រែ</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 font-medium text-slate-500 min-w-[140px]">តួនាទី</th>
                  {ALL_PERMISSIONS.map((p) => (
                    <th key={p} className="text-center py-3 px-2 font-medium text-slate-500 text-xs min-w-[90px]">
                      {PERMISSION_LABELS[p]}
                    </th>
                  ))}
                  {canEdit && <th className="text-center py-3 px-3 font-medium text-slate-500 text-xs w-20"></th>}
                </tr>
              </thead>
              <tbody>
                {ALL_ROLES.map((role) => {
                  const permsForRole = perms?.[role];
                  return (
                    <tr key={role} className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                      <td className="py-2.5 px-4">
                        <Link href={`/dashboard/settings/permissions/${role}`} className="flex items-center gap-2 hover:text-blue-600">
                          <Badge variant={role === user?.role ? "info" : "default"} className="text-xs">
                            {roleLabel(role)}
                          </Badge>
                        </Link>
                      </td>
                      {ALL_PERMISSIONS.map((perm) => {
                        const enabled = permsForRole?.[perm] ?? false;
                        return (
                          <td key={perm} className="text-center py-2.5 px-2">
                            <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                              enabled ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-300"
                            }`}>
                              {enabled ? "✓" : "✗"}
                            </span>
                          </td>
                        );
                      })}
                      {canEdit && (
                        <td className="text-center py-2.5 px-3">
                          <Link
                            href={`/dashboard/settings/permissions/${role}/edit`}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                            title="កែប្រែ"
                          >
                            <Pencil size={12} /> កែ
                          </Link>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

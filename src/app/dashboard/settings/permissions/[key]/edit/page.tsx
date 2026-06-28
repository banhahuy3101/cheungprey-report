"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/features/auth/supabase-auth";
import { type PermissionFlag, PERMISSIONS } from "@/lib/data";
import type { UserRole } from "@/lib/types";

// Import labels from canonical source
import { PERMISSION_LABELS } from "@/features/roles-permissions/permission-labels";

const ALL_PERMISSIONS = Object.keys(PERMISSIONS["super_admin"]) as PermissionFlag[];

export default function PermissionEditPage() {
  const params = useParams();
  const router = useRouter();
  const { user, refreshPermissions } = useAuth();
  const [perms, setPerms] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const role = params.key as string;

  const loadPermissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/role-permissions");
      if (!res.ok) throw new Error("Failed to load");
      const data: { role: string; permissions: Record<string, boolean> }[] = await res.json();
      const found = data.find((r) => r.role === role);
      if (found) setPerms(found.permissions);
      else setPerms({ ...PERMISSIONS[role as UserRole] });
    } catch {
      setPerms({ ...PERMISSIONS[role as UserRole] });
    }
    setLoading(false);
  }, [role]);

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  const toggle = (perm: string) => {
    setPerms((prev) => ({ ...prev, [perm]: !prev[perm] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/role-permissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, permissions: perms }),
      });
      if (res.ok) {
        await refreshPermissions();
        router.push(`/dashboard/settings/permissions/${role}`);
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (user?.role !== "super_admin") {
    return <div className="text-center py-12 text-slate-500">អ្នកមិនមានសិទ្ធិកែប្រែសិទ្ធិអំណាចទេ។</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <a href={`/dashboard/settings/permissions/${role}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </a>
        <h1 className="text-2xl font-semibold text-slate-900">
          កែប្រែសិទ្ធិ: <Badge variant="info" className="text-sm ml-1">{roleLabel(role as UserRole)}</Badge>
        </h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 font-medium text-slate-500">សិទ្ធិ</th>
                <th className="text-center py-3 px-3 font-medium text-slate-500 w-24">បើក/បិទ</th>
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map((perm) => {
                const enabled = perms[perm] ?? false;
                return (
                  <tr key={perm} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-slate-700">{PERMISSION_LABELS[perm]}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggle(perm)}
                        className={`inline-flex items-center justify-center h-7 w-7 rounded-md transition cursor-pointer ${
                          enabled ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        {enabled ? <Check size={14} /> : <X size={14} />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          រក្សាទុក
        </button>
        <a href={`/dashboard/settings/permissions/${role}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 px-4 py-2 rounded-md hover:bg-slate-100">
          <X size={14} /> បោះបង់
        </a>
      </div>
    </div>
  );
}

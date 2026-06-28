"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/features/auth/supabase-auth";

interface RoleRow {
  key: string;
  label_kh: string;
  label_en: string;
  level: number;
  description: string;
}

export default function RolesListPage() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/roles");
      if (res.ok) setRoles(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const canEdit = user?.role === "super_admin";

  return (
    <div className="space-y-6">
      <div>
        {canEdit && (
          <Link href="/dashboard/settings" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
            <ArrowLeft size={14} /> ត្រឡប់
          </Link>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">តួនាទី</h1>
            <p className="text-sm text-slate-500">បញ្ជីតួនាទីទាំងអស់ក្នុងប្រព័ន្ធ</p>
          </div>
          {canEdit && (
            <Link href="/dashboard/settings/roles/new" className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
              <Plus size={14} /> បន្ថែមតួនាទី
            </Link>
          )}
        </div>
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
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Key</th>
                  <th className="text-left py-3 px-3 font-medium text-slate-500">ឈ្មោះខ្មែរ</th>
                  <th className="text-left py-3 px-3 font-medium text-slate-500">ឈ្មោះអង់គ្លេស</th>
                  <th className="text-center py-3 px-3 font-medium text-slate-500">កម្រិត</th>
                  <th className="text-left py-3 px-3 font-medium text-slate-500 hidden lg:table-cell">បរិយាយ</th>
                </tr>
              </thead>
              <tbody>
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400">គ្មានទិន្នន័យ</td>
                  </tr>
                ) : (
                  roles.map((role) => (
                    <tr key={role.key} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-2.5 px-4">
                        <Link href={`/dashboard/settings/roles/${role.key}`} className="hover:text-blue-600">
                          <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{role.key}</code>
                        </Link>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        <Link href={`/dashboard/settings/roles/${role.key}`} className="hover:text-blue-600">
                          {role.label_kh || "—"}
                        </Link>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{role.label_en || "—"}</td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge variant="outline" className="text-xs font-mono">{role.level}</Badge>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 hidden lg:table-cell">{role.description || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

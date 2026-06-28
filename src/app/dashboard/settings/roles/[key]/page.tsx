"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/lib/supabase-auth";

interface RoleRow {
  key: string;
  label_kh: string;
  label_en: string;
  level: number;
  description: string;
}

export default function RoleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [role, setRole] = useState<RoleRow | null>(null);
  const [loading, setLoading] = useState(true);

  const key = params.key as string;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/roles");
      if (res.ok) {
        const data: RoleRow[] = await res.json();
        const found = data.find((r) => r.key === key);
        if (found) setRole(found);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [key]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    if (!confirm(`លុបតួនាទី "${key}"?`)) return;
    try {
      const res = await fetch(`/api/roles?key=${key}`, { method: "DELETE" });
      if (res.ok) router.push("/dashboard/settings/roles");
    } catch (e) {
      console.error(e);
    }
  };

  const canEdit = user?.role === "super_admin";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
      </div>
    );
  }

  if (!role) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>រកមិនឃើញតួនាទី</p>
        <Link href="/dashboard/settings/roles" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/settings/roles" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{role.label_kh || role.key}</h1>
            <p className="text-sm text-slate-500">ព័ត៌មានលម្អិតនៃតួនាទី</p>
          </div>
          {canEdit && (
            <div className="flex gap-2">
              <Link href={`/dashboard/settings/roles/${key}/edit`} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                <Pencil size={14} /> កែប្រែ
              </Link>
              <button onClick={handleDelete} className="inline-flex items-center gap-1 text-sm border border-red-200 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50">
                <Trash2 size={14} /> លុប
              </button>
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">ព័ត៌មានតួនាទី</CardTitle></CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-medium text-slate-500">Key</dt>
              <dd><code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded">{role.key}</code></dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">កម្រិត</dt>
              <dd className="text-sm"><Badge variant="outline" className="font-mono">{role.level}</Badge></dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">ឈ្មោះខ្មែរ</dt>
              <dd className="text-sm">{role.label_kh || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">ឈ្មោះអង់គ្លេស</dt>
              <dd className="text-sm">{role.label_en || "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-slate-500">បរិយាយ</dt>
              <dd className="text-sm">{role.description || "—"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

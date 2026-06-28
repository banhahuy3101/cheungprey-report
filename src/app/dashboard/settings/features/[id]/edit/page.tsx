"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/lib/supabase-auth";
import { PERMISSION_LABELS } from "@/lib/permission-labels";
import { type PermissionFlag, PERMISSIONS } from "@/lib/data";
import type { UserRole } from "@/lib/types";

interface FeatureRow {
  key: string;
  label_kh: string;
  label_en: string;
  description: string;
  route: string;
  permission_key: string;
  sort_order: number;
}

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

const ALL_PERMISSIONS = Object.keys(PERMISSIONS[ALL_ROLES[0]]) as PermissionFlag[];

export default function FeatureEditPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [feature, setFeature] = useState<FeatureRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedPerm, setSelectedPerm] = useState("");

  const id = params.id as string;

  const loadFeature = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/features");
      if (res.ok) {
        const data: FeatureRow[] = await res.json();
        const found = data.find((f) => f.key === id);
        if (found) {
          setFeature(found);
          setSelectedPerm(found.permission_key);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadFeature();
  }, [loadFeature]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/features", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: id, permission_key: selectedPerm }),
      });
      if (res.ok) router.push("/dashboard/settings/features");
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (user?.role !== "super_admin") {
    return <div className="text-center py-12 text-slate-500">អ្នកមិនមានសិទ្ធិកែប្រែទេ។</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
      </div>
    );
  }

  if (!feature) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>រកមិនឃើញមុខងារ</p>
        <a href="/dashboard/settings/features" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <a href="/dashboard/settings/features" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </a>
        <h1 className="text-2xl font-semibold text-slate-900">កែប្រែមុខងារ</h1>
        <p className="text-sm text-slate-500">{feature.label_kh} ({feature.label_en})</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">ព័ត៌មានមុខងារ</CardTitle></CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <dt className="text-xs font-medium text-slate-500">ឈ្មោះខ្មែរ</dt>
              <dd className="text-sm">{feature.label_kh}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">ឈ្មោះអង់គ្លេស</dt>
              <dd className="text-sm">{feature.label_en}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">ផ្លូវ</dt>
              <dd><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{feature.route}</code></dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">បរិយាយ</dt>
              <dd className="text-sm">{feature.description}</dd>
            </div>
          </dl>

          <div className="border-t border-slate-200 pt-4">
            <label className="text-sm font-medium text-slate-700 mb-2 block">សិទ្ធិត្រូវការ</label>
            <p className="text-xs text-slate-500 mb-3">ជ្រើសរើសសិទ្ធិដែលអ្នកប្រើត្រូវការដើម្បីចូលប្រើមុខងារនេះ</p>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm py-1.5 cursor-pointer hover:bg-slate-50 rounded px-2">
                <input
                  type="radio"
                  name="permission"
                  value=""
                  checked={selectedPerm === ""}
                  onChange={() => setSelectedPerm("")}
                  className="cursor-pointer"
                />
                <span className="text-slate-600">គ្មាន (សាធារណៈ)</span>
              </label>
              {ALL_PERMISSIONS.map((perm) => (
                <label key={perm} className="flex items-center gap-2 text-sm py-1.5 cursor-pointer hover:bg-slate-50 rounded px-2">
                  <input
                    type="radio"
                    name="permission"
                    value={perm}
                    checked={selectedPerm === perm}
                    onChange={() => setSelectedPerm(perm)}
                    className="cursor-pointer"
                  />
                  <span className="text-slate-700">{PERMISSION_LABELS[perm]}</span>
                  <code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded text-slate-500">{perm}</code>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          រក្សាទុក
        </button>
        <a href="/dashboard/settings/features" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 px-4 py-2 rounded-md hover:bg-slate-100">
          <X size={14} /> បោះបង់
        </a>
      </div>
    </div>
  );
}

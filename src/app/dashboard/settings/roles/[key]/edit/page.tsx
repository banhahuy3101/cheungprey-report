"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/lib/supabase-auth";

interface RoleForm {
  key: string;
  label_kh: string;
  label_en: string;
  level: number;
  description: string;
}

export default function RoleEditPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState<RoleForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const key = params.key as string;
  const isNew = key === "new";

  const load = useCallback(async () => {
    if (isNew) {
      setForm({ key: "", label_kh: "", label_en: "", level: 0, description: "" });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/roles");
      if (res.ok) {
        const data: RoleForm[] = await res.json();
        const found = data.find((r) => r.key === key);
        if (found) setForm(found);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [key, isNew]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!form || !form.key.trim()) return;
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PATCH";
      const body = isNew
        ? JSON.stringify(form)
        : JSON.stringify({ key, label_kh: form.label_kh, label_en: form.label_en, level: form.level, description: form.description });
      const res = await fetch("/api/roles", { method, headers: { "Content-Type": "application/json" }, body });
      if (res.ok) router.push(`/dashboard/settings/roles/${form.key}`);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (user?.role !== "super_admin") {
    return <div className="text-center py-12 text-slate-500">អ្នកមិនមានសិទ្ធិកែប្រែតួនាទីទេ។</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
      </div>
    );
  }

  if (!form) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>រកមិនឃើញតួនាទី</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <a href={`/dashboard/settings/roles/${isNew ? "" : key}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </a>
        <h1 className="text-2xl font-semibold text-slate-900">{isNew ? "បន្ថែមតួនាទីថ្មី" : "កែប្រែតួនាទី"}</h1>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Key</label>
              <input
                type="text"
                value={form.key}
                onChange={(e) => setForm({ ...form, key: e.target.value })}
                disabled={!isNew}
                className="w-full text-sm border border-slate-300 rounded px-3 py-1.5 disabled:bg-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">កម្រិត</label>
              <input
                type="number"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: parseInt(e.target.value) || 0 })}
                className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">ឈ្មោះខ្មែរ</label>
              <input
                type="text"
                value={form.label_kh}
                onChange={(e) => setForm({ ...form, label_kh: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">ឈ្មោះអង់គ្លេស</label>
              <input
                type="text"
                value={form.label_en}
                onChange={(e) => setForm({ ...form, label_en: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">បរិយាយ</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              រក្សាទុក
            </button>
            <a href={`/dashboard/settings/roles/${isNew ? "" : key}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100">
              <X size={12} /> បោះបង់
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

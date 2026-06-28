"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import type { UserRole } from "@/lib/types";

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

export default function UserEditPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  const id = params.id as string;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data: any[] = await res.json();
        const found = data.find((p) => p.id === id);
        if (found) {
          setProfile(found);
          setRoles(found.roles && found.roles.length > 0 ? found.roles : [found.role]);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user-roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, roles }),
      });
      if (res.ok) router.push(`/dashboard/settings/users/${id}`);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (user?.role !== "super_admin") {
    return <div className="text-center py-12 text-slate-500">អ្នកមិនមានសិទ្ធិកែប្រែអ្នកប្រើប្រាស់ទេ។</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>រកមិនឃើញអ្នកប្រើប្រាស់</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <a href={`/dashboard/settings/users/${id}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </a>
        <h1 className="text-2xl font-semibold text-slate-900">កែប្រែអ្នកប្រើប្រាស់</h1>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">ឈ្មោះ</label>
              <input
                type="text"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">អ៊ីមែល</label>
              <input
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">តួនាទី (អាចជ្រើសច្រើន)</label>
            <div className="space-y-1">
              {ALL_ROLES.map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm py-1.5 cursor-pointer hover:bg-slate-50 rounded px-2">
                  <input
                    type="checkbox"
                    checked={roles.includes(r)}
                    onChange={() => toggleRole(r)}
                    className="cursor-pointer"
                  />
                  <span className="text-slate-700">{roleLabel(r)}</span>
                </label>
              ))}
            </div>
            {roles.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {roles.map((r) => (
                  <Badge key={r} variant="info" className="text-xs">{roleLabel(r as UserRole)}</Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              រក្សាទុក
            </button>
            <a href={`/dashboard/settings/users/${id}`} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100">
              <X size={12} /> បោះបង់
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

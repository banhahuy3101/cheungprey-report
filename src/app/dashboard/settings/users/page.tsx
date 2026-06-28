"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Users, ArrowLeft, Check, Loader2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import type { UserRole } from "@/lib/types";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  roles: string[];
  district_id?: string;
  commune_id?: string | null;
}

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

export default function SettingsUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkRoles, setBulkRoles] = useState<string[]>(["commune_staff"]);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const loadProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setProfiles(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const toggleBulkRole = (role: string) => {
    setBulkRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const assignRoles = async () => {
    if (selected.size === 0) return;
    setSaving(true);
    try {
      await Promise.all(
        Array.from(selected).map((id) =>
          fetch("/api/user-roles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: id, roles: bulkRoles }),
          }),
        ),
      );
      await loadProfiles();
      setSelected(new Set());
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const filtered = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/settings")} className="mb-2">
          <ArrowLeft size={14} className="mr-1" /> ត្រឡប់
        </Button>
        <h1 className="text-2xl font-semibold text-slate-900">គ្រប់គ្រងអ្នកប្រើប្រាស់</h1>
        <p className="text-sm text-slate-500">កំណត់តួនាទីច្រើននាក់ក្នុងពេលតែមួយ (អ្នកប្រើម្នាក់អាចមានច្រើនតួនាទី)</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Users size={16} />
              អ្នកប្រើប្រាស់ ({profiles.length})
            </CardTitle>
            {selected.size > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">{selected.size} នាក់ត្រូវបានជ្រើស</span>
                <div className="flex flex-wrap gap-1">
                  {ALL_ROLES.map((r) => (
                    <label key={r} className="flex items-center gap-1 text-xs cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={bulkRoles.includes(r)}
                        onChange={() => toggleBulkRole(r)}
                        className="cursor-pointer"
                      />
                      <span>{roleLabel(r)}</span>
                    </label>
                  ))}
                </div>
                <Button size="sm" onClick={assignRoles} disabled={saving}>
                  {saving ? <Loader2 size={12} className="animate-spin mr-1" /> : <Check size={12} className="mr-1" />}
                  កំណត់តួនាទី
                </Button>
              </div>
            )}
          </div>
          <div className="mt-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ស្វែងរកតាមឈ្មោះ ឬអ៊ីមែល..."
              className="w-full text-sm border border-slate-300 rounded px-3 py-1.5"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-10 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={selected.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500">ឈ្មោះ</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500">អ៊ីមែល</th>
                  <th className="text-left py-2.5 px-3 font-medium text-slate-500">តួនាទី</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-400">គ្មានទិន្នន័យ</td>
                  </tr>
                ) : (
                  filtered.map((profile) => (
                    <tr key={profile.id} className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer" onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName !== 'INPUT') {
                        router.push(`/dashboard/settings/users/${profile.id}/edit`);
                      }
                    }}>
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selected.has(profile.id)}
                          onChange={() => toggleSelect(profile.id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{profile.name || "—"}</td>
                      <td className="py-2.5 px-3 text-slate-500">{profile.email}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap gap-1">
                          {(profile.roles && profile.roles.length > 0 ? profile.roles : [profile.role]).map((r) => (
                            <Badge key={r} variant={r === user?.role ? "info" : "default"} className="text-xs">
                              {roleLabel(r as UserRole)}
                            </Badge>
                          ))}
                        </div>
                      </td>
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

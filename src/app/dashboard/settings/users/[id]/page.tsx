"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Pencil, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import type { UserRole } from "@/lib/types";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  district_id?: string;
  commune_id?: string | null;
}

export default function UserDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params.id as string;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data: Profile[] = await res.json();
        const found = data.find((p) => p.id === id);
        if (found) setProfile(found);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const canEdit = user?.role === "super_admin" || user?.id === id;

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
        <Link href="/dashboard/settings/users" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/settings/users" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{profile.name || "គ្មានឈ្មោះ"}</h1>
            <p className="text-sm text-slate-500">ព័ត៌មានលម្អិតអ្នកប្រើប្រាស់</p>
          </div>
          {canEdit && (
            <Link href={`/dashboard/settings/users/${id}/edit`} className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
              <Pencil size={14} /> កែប្រែ
            </Link>
          )}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">ព័ត៌មានអ្នកប្រើប្រាស់</CardTitle></CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-medium text-slate-500">ឈ្មោះ</dt>
              <dd className="text-sm">{profile.name || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">អ៊ីមែល</dt>
              <dd className="text-sm">{profile.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">តួនាទី</dt>
              <dd className="text-sm">
                <Badge variant={profile.role === user?.role ? "info" : "default"} className="text-xs">
                  {roleLabel(profile.role as UserRole)}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">ID</dt>
              <dd><code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{profile.id}</code></dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

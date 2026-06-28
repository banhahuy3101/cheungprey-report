"use client";

import Link from "next/link";
import { Shield, Users, KeyRound, LayoutList, Server, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import { ROLE_LEVEL } from "@/lib/types";
import type { UserRole } from "@/lib/types";

const ALL_ROLES: UserRole[] = [
  "super_admin", "district_chief", "district_admin",
  "commune_chief", "commune_staff", "finance_viewer",
];

export default function SettingsHubPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">ការកំណត់ប្រព័ន្ធ</h1>
        <p className="text-sm text-slate-500">គ្រប់គ្រងតួនាទី អ្នកប្រើប្រាស់ និងសិទ្ធិអំណាច</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/settings/roles">
          <Card className="hover:border-blue-300 hover:shadow-sm transition cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield size={20} className="text-blue-600" />
                តួនាទី
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">គ្រប់គ្រងតួនាទីទាំង {ALL_ROLES.length}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {ALL_ROLES.map((r) => (
                  <span key={r} className={`text-xs px-1.5 py-0.5 rounded ${r === user?.role ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                    {roleLabel(r)}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/users">
          <Card className="hover:border-blue-300 hover:shadow-sm transition cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users size={20} className="text-green-600" />
                អ្នកប្រើប្រាស់
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">គ្រប់គ្រងអ្នកប្រើប្រាស់ និងកំណត់តួនាទី</p>
              <p className="text-xs text-slate-400 mt-2">បន្ថែម កែប្រែ និងកំណត់តួនាទីច្រើននាក់ក្នុងពេលតែមួយ</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/permissions">
          <Card className="hover:border-blue-300 hover:shadow-sm transition cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound size={20} className="text-purple-600" />
                សិទ្ធិអំណាច
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">កំណត់សិទ្ធិតាមតួនាទី</p>
              <p className="text-xs text-slate-400 mt-2">បើក/បិទសិទ្ធិនីមួយៗតាមតួនាទី</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/features">
          <Card className="hover:border-blue-300 hover:shadow-sm transition cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <LayoutList size={20} className="text-orange-600" />
                មុខងារ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">បញ្ជីមុខងារក្នុងប្រព័ន្ធ</p>
              <p className="text-xs text-slate-400 mt-2">មើល និងកំណត់សិទ្ធិតាមមុខងារ</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Server size={16} /> Supabase</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">ស្ថានភាពការតភ្ជាប់ទៅកាន់មូលដ្ឋានទិន្នន័យ</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <Server size={14} />
              <span>{process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^https?:\/\//, "").split(".")[0] ?? "..."}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><BadgeCheck size={16} /> កម្រិតតួនាទី</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">កម្រិតរបស់អ្នក: {user ? ROLE_LEVEL[user.role] : "-"}</p>
            <div className="mt-2 space-y-1">
              {[...ALL_ROLES].sort((a, b) => ROLE_LEVEL[b] - ROLE_LEVEL[a]).map((role) => (
                <div key={role} className="flex items-center gap-2 text-xs">
                  <span className="w-5 text-right text-slate-400">{ROLE_LEVEL[role]}</span>
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className={role === user?.role ? "text-blue-700 font-medium" : "text-slate-500"}>{roleLabel(role)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

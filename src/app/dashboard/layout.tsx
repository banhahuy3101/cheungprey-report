"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  FileText,
  Users,
  History,
  LogOut,
  ClipboardCheck,
  UserCheck,
  Settings,
  KeyRound,
} from "lucide-react";
import { formatDateObj } from "@/lib/data";
import { useAuth, roleLabel } from "@/lib/supabase-auth";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PermissionKey =
  | "canWriteTransaction"
  | "canReadTransactions"
  | "canWriteBudget"
  | "canExportPdf"
  | "canManageUsers"
  | "canDownloadReceipt"
  | "canManageSystem";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  requirePermission?: PermissionKey;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout, can, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500">កំពុងផ្ទុក...</div>;
  if (!user) {
    router.replace("/login");
    return null;
  }

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "ផ្ទាំងគ្រប់គ្រង", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/transactions", label: "ប្រតិបត្តិការ", icon: <Receipt size={18} /> },
    { href: "/dashboard/budgets", label: "ថវិកា", icon: <Wallet size={18} /> },
    { href: "/dashboard/reports", label: "របាយការណ៍", icon: <FileText size={18} /> },
    { href: "/dashboard/commune-evaluation", label: "វាយតម្លៃឃុំ/សង្កាត់", icon: <ClipboardCheck size={18} /> },
    {
      href: "/dashboard/users",
      label: "អ្នកប្រើប្រាស់",
      icon: <Users size={18} />,
      requirePermission: "canManageUsers",
    },
    { href: "/dashboard/profiles", label: "បញ្ជីសមាជិក", icon: <UserCheck size={18} /> },
    { href: "/dashboard/audit", label: "កំណត់ត្រាសកម្មភាព", icon: <History size={18} /> },
    {
      href: "/dashboard/settings",
      label: "ការកំណត់",
      icon: <Settings size={18} />,
      requirePermission: "canManageSystem",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Light sidebar (white background) */}
      <aside className="fixed top-0 left-0 w-64 h-screen overflow-y-auto bg-white border-r border-slate-200 text-slate-700 flex flex-col z-30">
        <div className="px-5 py-5 border-b border-slate-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="text-blue-600" size={22} />
            <div>
              <div className="font-bold text-sm text-slate-900">Cheung Prey</div>
              <div className="text-[11px] text-slate-500">Management System</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems
            .filter((item) => !item.requirePermission || can(item.requirePermission))
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                    active
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span className={active ? "text-blue-600" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </nav>

        <div className="border-t border-slate-200 px-3 py-3">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">{user.name}</div>
              <div className="text-[11px] text-slate-500">{roleLabel(user.role)}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <LogOut size={16} />
            <span>ចាកចេញ</span>
          </button>
        </div>
      </aside>

      <div className="ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-800">
            {navItems.find((n) => n.href === pathname)?.label ?? "ផ្ទាំងគ្រប់គ្រង"}
          </h1>
          <div className="text-sm text-slate-500">
            ថ្ងៃទី {formatDateObj(new Date())}
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
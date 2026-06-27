"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Plus,
} from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { formatKHR, formatDate } from "@/lib/data";
import {
  getFinanceSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
  listTransactions,
  listBudgets,
  getBudgetActualSpent,
} from "@/lib/data";
import type { Transaction, Budget, FinanceSummary, Category } from "@/lib/types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

const CATEGORY_LABELS: Record<Category, string> = {
  operation: "ប្រតិបត្តិការ",
  salary: "ប្រាក់ខែ",
  marketing: "ទីផ្សារ",
  utility: "ទឹកភ្លើង",
  service: "សេវាកម្ម",
  other: "ផ្សេងៗ",
};

const CATEGORY_COLORS: Record<Category, string> = {
  operation: "#3b82f6",
  salary: "#8b5cf6",
  marketing: "#ec4899",
  utility: "#f59e0b",
  service: "#10b981",
  other: "#6b7280",
};

function SummaryCard({
  title,
  amount,
  hint,
  icon,
  positive,
}: {
  title: string;
  amount: number;
  hint?: string;
  icon: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{title}</span>
          <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
            {icon}
          </div>
        </div>
        <div
          className={`mt-2 text-2xl font-bold ${
            positive === undefined
              ? "text-slate-900"
              : positive
                ? "text-emerald-700"
                : "text-red-700"
          }`}
        >
          {formatKHR(amount)}
        </div>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      </CardContent>
    </Card>
  );
}

const khrFormatter = (v: unknown): string => {
  if (typeof v === "number") return formatKHR(v);
  return String(v ?? "");
};

export default function DashboardPage() {
  const isComing = process.env.NEXT_PUBLIC_IS_COMING === "true";
  if (isComing) return <ComingSoon />;

  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [breakdown, setBreakdown] = useState<Array<{ category: Category; amount: number; percentage: number }>>([]);
  const [trend, setTrend] = useState<Array<{ monthLabel: string; income: number; expense: number }>>([]);
  const [recent, setRecent] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Array<Budget & { spent: number; remaining: number; utilization: number }>>([]);

  useEffect(() => {
    // Schedule the state updates after commit to avoid the cascading-render warning
    queueMicrotask(() => {
      setSummary(getFinanceSummary());
      setBreakdown(getCategoryBreakdown());
      setTrend(getMonthlyTrend(6));
      setRecent(listTransactions().slice(0, 10));
      setBudgets(
        listBudgets().map((b) => {
          const spent = getBudgetActualSpent(b);
          return {
            ...b,
            spent,
            remaining: b.allocatedAmount - spent,
            utilization: b.allocatedAmount > 0 ? (spent / b.allocatedAmount) * 100 : 0,
          };
        })
      );
    });
  }, []);

  if (!summary) {
    return <div className="text-slate-500">កំពុងផ្ទុក...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="ចំណូលសរុប"
          amount={summary.totalIncome}
          icon={<TrendingUp size={16} />}
          positive
        />
        <SummaryCard
          title="ចំណាយសរុប"
          amount={summary.totalExpense}
          icon={<TrendingDown size={16} />}
        />
        <SummaryCard
          title="សល់ក្នុងដៃ"
          amount={summary.netBalance}
          icon={<Wallet size={16} />}
          positive={summary.netBalance >= 0}
        />
        <SummaryCard
          title="ថវិកានៅសល់"
          amount={summary.totalBudgetRemaining}
          hint={`ចំណាយបាន ${formatKHR(summary.totalBudgetSpent)} / ${formatKHR(summary.totalBudgetAllocated)}`}
          icon={<PiggyBank size={16} />}
          positive={summary.totalBudgetRemaining >= 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>តារាងចំណាយតាមប្រភេទ</CardTitle>
            <CardDescription>សមាមាត្រចំណាយសរុបតាមប្រភេទ</CardDescription>
          </CardHeader>
          <CardContent>
            {breakdown.length === 0 ? (
              <p className="text-sm text-slate-500">មិនទាន់មានទិន្នន័យ</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdown.map((b) => ({
                        name: CATEGORY_LABELS[b.category],
                        value: b.amount,
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      dataKey="value"
                    >
                      {breakdown.map((entry) => (
                        <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={khrFormatter}
                      contentStyle={{ fontSize: 12 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>និន្នាការចំណូល និងចំណាយ ៦ ខែ</CardTitle>
            <CardDescription>ប្រៀបធៀបចំណូល និងចំណាយប្រចាំខែ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="monthLabel" tick={{ fontSize: 11 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={khrFormatter}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="income" name="ចំណូល" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="ចំណាយ" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>ការប្រើប្រាស់ថវិកា</CardTitle>
              <CardDescription>ថវិកា និងចំណាយជាក់ស្តែង</CardDescription>
            </div>
            <Link href="/dashboard/budgets">
              <Button variant="outline" size="sm">
                គ្រប់គ្រងថវិកា
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {budgets.length === 0 ? (
            <p className="text-sm text-slate-500">មិនទាន់មានថវិកា</p>
          ) : (
            <div className="space-y-3">
              {budgets.map((b) => (
                <div key={b.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">
                      {CATEGORY_LABELS[b.category]}{" "}
                      {b.month ? `(ខែ ${b.month}/${b.year})` : `(ប្រចាំឆ្នាំ ${b.year})`}
                    </span>
                    <span className="text-slate-600">
                      {formatKHR(b.spent)} / {formatKHR(b.allocatedAmount)}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded overflow-hidden">
                    <div
                      className={`h-full rounded ${
                        b.utilization > 100
                          ? "bg-red-500"
                          : b.utilization > 80
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(100, b.utilization)}%` }}
                    />
                  </div>
                  {b.utilization > 80 && (
                    <p className="mt-1 text-xs text-amber-700">
                      ⚠ ការព្រមាន៖ ការប្រើប្រាស់លើសពី ៨០%
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>ប្រតិបត្តិការចុងក្រោយ</CardTitle>
              <CardDescription>១០ ប្រតិបត្តិការថ្មីៗ</CardDescription>
            </div>
            <Link href="/dashboard/transactions">
              <Button variant="outline" size="sm">
                <Plus size={14} /> បន្ថែមប្រតិបត្តិការ
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>កាលបរិច្ឆេទ</TH>
                <TH>ប្រភេទ</TH>
                <TH>ប្រភេទចំណាយ</TH>
                <TH>ការពិពណ៌នា</TH>
                <TH className="text-right">ចំនួនទឹកប្រាក់</TH>
                <TH>ស្ថានភាព</TH>
              </TR>
            </THead>
            <TBody>
              {recent.map((tx) => (
                <TR key={tx.id}>
                  <TD>{formatDate(tx.date)}</TD>
                  <TD>
                    <Badge variant={tx.type === "income" ? "success" : "danger"}>
                      {tx.type === "income" ? "ចំណូល" : "ចំណាយ"}
                    </Badge>
                  </TD>
                  <TD>{CATEGORY_LABELS[tx.category]}</TD>
                  <TD className="max-w-xs truncate">{tx.description}</TD>
                  <TD className="text-right font-medium">
                    <span className={tx.type === "income" ? "text-emerald-700" : "text-red-700"}>
                      {tx.type === "income" ? "+" : "-"}
                      {formatKHR(tx.amount)}
                    </span>
                  </TD>
                  <TD>
                    <Badge
                      variant={
                        tx.status === "completed"
                          ? "success"
                          : tx.status === "pending"
                            ? "warning"
                            : "default"
                      }
                    >
                      {tx.status === "completed"
                        ? "បានបញ្ចប់"
                        : tx.status === "pending"
                          ? "កំពុងរង់ចាំ"
                          : "បានលុបចោល"}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

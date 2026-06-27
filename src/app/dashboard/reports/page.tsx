"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { listReports } from "@/lib/data";

export default function DashboardReportsPage() {
  const reports = listReports();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">របាយការណ៍ប្រចាំខែ</p>
          <h1 className="text-2xl font-semibold text-slate-900">District Reports</h1>
        </div>
        <Link href="/dashboard/reports/builder">
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition">
            <FileText size={16} /> បង្កើតរបាយការណ៍ថ្មី
          </button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>របាយការណ៍ចុងក្រោយ</CardTitle>
          <CardDescription>មើល និងកែប្រែរបាយការណ៍កម្រិតស្រុក</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              មិនទាន់មានរបាយការណ៍នៅឡើយទេ។
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">ឈ្មោះរបាយការណ៍</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">លេខឯកសារ</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">កាលបរិច្ឆេទ</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">ស្ថានភាព</th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-4 text-sm text-slate-700">{report.title}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{report.documentNumber}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{report.date}</td>
                      <td className="px-4 py-4 text-sm text-slate-700 capitalize">{report.status}</td>
                      <td className="px-4 py-4 text-right text-sm">
                        <Link href={`/dashboard/reports/${report.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
                          View <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

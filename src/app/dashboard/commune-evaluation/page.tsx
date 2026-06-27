"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { listEvaluations, deleteEvaluation } from "@/lib/evaluation-service";
import type { CommuneEvaluationListItem } from "@/lib/evaluation-service";

export default function CommuneEvaluationPage() {
  const [items, setItems] = useState<CommuneEvaluationListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEvaluations().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    await deleteEvaluation(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
          <h1 className="text-2xl font-semibold text-slate-900">បញ្ជីវាយតម្លៃ</h1>
        </div>
        <Link href="/dashboard/commune-evaluation/new">
          <Button className="inline-flex items-center gap-2">
            <Plus size={16} />
            បង្កើតថ្មី
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>បញ្ជីវាយតម្លៃ</CardTitle>
          <CardDescription>របៀបរៀបរយ សណ្តាប់ធ្នាប់សាធារណៈ និងសុវត្ថិភាពសង្គម</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              កំពុងផ្ទុក...
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              <p className="mb-4">មិនទាន់មានព័ត៌មានវាយតម្លៃទេ។</p>
              <Link href="/dashboard/commune-evaluation/new">
                <Button className="inline-flex items-center gap-2">
                  <Plus size={16} />
                  បង្កើតថ្មី
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">ល.រ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">ខេត្ត / ក្រុង / ស្រុក / ខណ្ឌ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">ឃុំ / សង្កាត់</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">កាលបរិច្ឆេទ</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500">ការវិភាគ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-700">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {item.province || ".........."} / {item.district || ".........."}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{item.commune || ".........."}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {new Date(item.created_at).toLocaleDateString("km-KH")}
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/dashboard/commune-evaluation/${item.id}`}
                            className="inline-flex items-center gap-1 rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/commune-evaluation/${item.id}/edit`}
                            className="inline-flex items-center gap-1 rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="inline-flex items-center gap-1 rounded-lg p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
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
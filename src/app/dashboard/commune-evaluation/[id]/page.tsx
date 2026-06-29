"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/data";
import { getEvaluation, type CommuneEvaluationRecord } from "@/features/commune-evaluation/service";
import { buildEvaluationDisplayRows } from "@/features/commune-evaluation/schema";
import { usePermissions } from "@/hooks/usePermissions";

export default function CommuneEvaluationDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { can } = usePermissions();
  const [data, setData] = useState<CommuneEvaluationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canView = can("read", "commune_evaluation", {});
  const canEdit = can("update", "commune_evaluation", {});

  useEffect(() => {
    if (!canView) return;

    getEvaluation(params.id)
      .then((record) => {
        setData(record);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "មិនអាចទាញយកទិន្នន័យបានទេ។");
        setLoading(false);
      });
  }, [canView, params.id]);

  if (!canView) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-slate-500">
          អ្នកមិនមានសិទ្ធិមើលទិន្នន័យនេះទេ។
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">កំពុងផ្ទុក...</div>;
  }

  if (error || !data) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-slate-500">
          {error || "រកមិនឃើញទិន្នន័យវាយតម្លៃនេះទេ។"}
        </CardContent>
      </Card>
    );
  }

  const displayItems = buildEvaluationDisplayRows(data as unknown as Record<string, unknown>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">{data.commune || "លម្អិតវាយតម្លៃ"}</h1>
            <p className="text-sm text-slate-500">
              {data.province} / {data.district} / {data.commune} • {formatDate(data.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/dashboard/commune-evaluation/${data.id}/pdf`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            <FileDown size={16} />
            Export PDF
          </a>
          {canEdit && (
            <Button
              type="button"
              variant="outline"
              className="inline-flex items-center gap-2"
              onClick={() => router.push(`/dashboard/commune-evaluation/${data.id}/edit`)}
            >
              <Pencil size={16} />
              កែប្រែ
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ទិន្នន័យវាយតម្លៃ</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <tbody>
                {displayItems.map((item, index) => {
                  if (item.type === "section") {
                    return (
                      <tr key={index}>
                        <td
                          colSpan={2}
                          className="bg-blue-900 p-3 font-siemreap text-sm font-bold text-white"
                        >
                          {item.label}
                        </td>
                      </tr>
                    );
                  }
                  if (item.type === "subsection") {
                    return (
                      <tr key={index}>
                        <td
                          colSpan={2}
                          className="bg-blue-50 p-2 pl-6 font-siemreap text-sm font-semibold text-blue-900"
                        >
                          {item.label}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index} className="border-b border-slate-200 last:border-b-0">
                      <th className="w-1/2 bg-slate-50 p-3 text-left align-top font-siemreap text-sm font-medium text-slate-700">
                        {item.label}
                      </th>
                      <td className="whitespace-pre-line p-3 align-top font-siemreap text-sm text-slate-900">
                        {item.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

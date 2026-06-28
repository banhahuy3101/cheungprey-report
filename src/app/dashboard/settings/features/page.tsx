"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/lib/supabase-auth";
import { PERMISSION_LABELS } from "@/lib/permission-labels";

interface FeatureRow {
  key: string;
  label_kh: string;
  label_en: string;
  description: string;
  route: string;
  permission_key: string;
  sort_order: number;
}

export default function FeaturesListPage() {
  const { user } = useAuth();
  const [features, setFeatures] = useState<FeatureRow[]>([]);
  const [loading, setLoading] = useState(true);
  const canEdit = user?.role === "super_admin";

  const loadFeatures = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/features");
      if (res.ok) setFeatures(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFeatures();
  }, [loadFeatures]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/settings" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-2">
          <ArrowLeft size={14} /> ត្រឡប់
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900">មុខងារក្នុងប្រព័ន្ធ</h1>
        <p className="text-sm text-slate-500">បញ្ជីមុខងារ និងសិទ្ធិដែលត្រូវការ</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <Loader2 size={20} className="animate-spin mr-2" /> កំពុងផ្ទុក...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 font-medium text-slate-500">មុខងារ</th>
                  <th className="text-left py-3 px-3 font-medium text-slate-500">ផ្លូវ</th>
                  <th className="text-left py-3 px-3 font-medium text-slate-500">សិទ្ធិត្រូវការ</th>
                  <th className="text-center py-3 px-3 font-medium text-slate-500 w-20">លំដាប់</th>
                  {canEdit && <th className="text-center py-3 px-3 font-medium text-slate-500 w-20"></th>}
                </tr>
              </thead>
              <tbody>
                {features.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-400">គ្មានទិន្នន័យ</td></tr>
                ) : (
                  features.map((feature) => (
                    <tr key={feature.key} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-2.5 px-4">
                        <div>
                          <span className="font-medium text-slate-800">{feature.label_kh}</span>
                          <span className="text-xs text-slate-400 ml-1">({feature.label_en})</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{feature.description}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{feature.route}</code>
                      </td>
                      <td className="py-2.5 px-3">
                        {feature.permission_key ? (
                          <Badge variant="outline" className="text-xs">
                            {PERMISSION_LABELS[feature.permission_key as keyof typeof PERMISSION_LABELS] || feature.permission_key}
                          </Badge>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center text-xs text-slate-500">{feature.sort_order}</td>
                      {canEdit && (
                        <td className="py-2.5 px-3 text-center">
                          <Link
                            href={`/dashboard/settings/features/${feature.key}/edit`}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={12} /> កែ
                          </Link>
                        </td>
                      )}
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

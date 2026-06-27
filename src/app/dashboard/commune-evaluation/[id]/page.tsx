"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { defaultEvaluationData, type EvaluationData } from "@/lib/evaluation-schema";
import { getEvaluation } from "@/lib/evaluation-service";
import type { CommuneEvaluationRecord } from "@/lib/evaluation-service";
import Header from "../components/Header";
import Section1Democracy from "../components/Section1Democracy";
import Section2Security from "../components/Section2Security";
import Section3Services from "../components/Section3Services";
import Section4Economy from "../components/Section4Economy";
import Section5SocialProtection from "../components/Section5SocialProtection";
import Section6Democracy from "../components/Section6Democracy";
import Section7Governance from "../components/Section7Governance";

export default function EvaluationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [record, setRecord] = useState<CommuneEvaluationRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvaluation(id).then((data) => {
      setRecord(data);
      setLoading(false);
    });
  }, [id]);

  const data: Partial<EvaluationData> = record ?? defaultEvaluationData;

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-slate-50 pb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/commune-evaluation">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">មើលព័ត៌មានវាយតម្លៃ</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="inline-flex items-center gap-2" onClick={() => window.print()}>
            <Printer size={16} />
            បោះពុម្ព
          </Button>
          <Link href={`/dashboard/commune-evaluation/${id}/edit`}>
            <Button className="inline-flex items-center gap-2">
              <Pencil size={16} />
              កែប្រែ
            </Button>
          </Link>
        </div>
      </div>

      <Card className="print:hidden">
        <CardHeader>
          <CardTitle>ព័ត៌មានទូទៅ</CardTitle>
          <CardDescription>ខេត្ត / ក្រុង / ស្រុក / ខណ្ឌ និងឃុំ / សង្កាត់</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              កំពុងផ្ទុក...
            </div>
          ) : !record ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              រកមិនឃើញព័ត៌មានវាយតម្លៃទេ។
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">រាជធានី / ខេត្ត</p>
                <p className="font-medium text-slate-900">{record.province}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">ក្រុង / ស្រុក / ខណ្ឌ</p>
                <p className="font-medium text-slate-900">{record.district}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">ឃុំ / សង្កាត់</p>
                <p className="font-medium text-slate-900">{record.commune}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">កាលបរិច្ឆេទបង្កើត</p>
                <p className="font-medium text-slate-900">{new Date(record.created_at).toLocaleDateString("km-KH")}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="print:shadow-none">
        <CardHeader className="print:hidden">
          <CardTitle>តារាងវាយតម្លៃ</CardTitle>
          <CardDescription>របៀបរៀបរយ សណ្តាប់ធ្នាប់សាធារណៈ និងសុវត្ថិភាពសង្គម</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <Header province={data.province} district={data.district} commune={data.commune} />
          <Section1Democracy data={data} />
          <Section2Security data={data} />
          <Section3Services data={data} />
          <Section4Economy data={data} />
          <Section5SocialProtection data={data} />
          <Section6Democracy data={data} />
          <Section7Governance data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

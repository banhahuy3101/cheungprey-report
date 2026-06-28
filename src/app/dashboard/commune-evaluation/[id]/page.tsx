"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { formatDate } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  defaultEvaluationData,
  type EvaluationData,
} from "@/features/commune-evaluation/schema";
import { getEvaluation } from "@/features/commune-evaluation/service";
import type { CommuneEvaluationRecord } from "@/features/commune-evaluation/service";
import DownloadPdfButton from "@/features/commune-evaluation/DownloadPdfButton";
import Header from "../components/Header";
import Section1Democracy from "../components/Section1Democracy";
import Section2Security from "../components/Section2Security";
import Section3Services from "../components/Section3Services";
import Section4Economy from "../components/Section4Economy";
import Section5SocialProtection from "../components/Section5SocialProtection";
import Section6Democracy from "../components/Section6Democracy";
import Section7Governance from "../components/Section7Governance";
import { useAuth } from "@/features/auth/supabase-auth";
import { usePermissions } from "@/hooks/usePermissions";
import { loadGeoData } from "@/features/geo/geo-data";

export default function EvaluationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [record, setRecord] = useState<CommuneEvaluationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const { user } = useAuth();
  const { can } = usePermissions();

  useEffect(() => {
    (async () => {
      const data = await getEvaluation(id);
      setRecord(data);
      setLoading(false);

      if (!data || !user) return;

      const canView = can("read", "commune_evaluation", {
        districtId: user.districtId,
        communeId: user.communeId ?? undefined,
      });

      if (!canView) {
        setAccessDenied(true);
        return;
      }

      // Additional location-based check: ensure user can access this evaluation's location
      if (user.role !== "super_admin" && user.districtId) {
        const geo = await loadGeoData();
        const userDistrict = geo.districts.find((d) => d.code === user.districtId);
        if (userDistrict && data.district !== userDistrict.kh) {
          setAccessDenied(true);
        }
        if (user.communeId && (user.role === "commune_chief" || user.role === "commune_staff" || user.role === "finance_viewer")) {
          const userCommune = geo.communes.find((c) => c.code === user.communeId);
          if (userCommune && data.commune !== userCommune.kh) {
            setAccessDenied(true);
          }
        }
      }
    })();
  }, [id, user]);

  const canEdit = can("update", "commune_evaluation", {
    districtId: user?.districtId,
    communeId: user?.communeId ?? undefined,
  });

  const data: Partial<EvaluationData> = record ?? defaultEvaluationData;

  if (accessDenied) {
    return (
      <div className="space-y-6">
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
        <Card>
          <CardContent className="p-8 text-center text-slate-500">
            អ្នកមិនមានសិទ្ធិមើលទិន្នន័យនេះទេ។
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-2xl font-semibold text-slate-900">
              មើលព័ត៌មានវាយតម្លៃ
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DownloadPdfButton id={id} />
          {canEdit && (
            <Link href={`/dashboard/commune-evaluation/${id}/edit`}>
              <Button className="inline-flex items-center gap-2">
                <Pencil size={16} />
                កែប្រែ
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Card className="print:hidden">
        <CardHeader>
          <CardTitle>ព័ត៌មានទូទៅ</CardTitle>
          <CardDescription>
            ខេត្ត / ក្រុង / ស្រុក / ខណ្ឌ និងឃុំ / សង្កាត់
          </CardDescription>
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
                <p className="font-medium text-slate-900">
                  {formatDate(record.created_at)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="print:shadow-none">
        <CardHeader className="print:hidden">
          <CardTitle>តារាងវាយតម្លៃ</CardTitle>
          <CardDescription>
            របៀបរៀបរយ សណ្តាប់ធ្នាប់សាធារណៈ និងសុវត្ថិភាពសង្គម
          </CardDescription>
        </CardHeader>
        {/* Preview: split into A4 landscape pages — used for both screen and PDF export */}
        <div
          id="evaluation-content"
          className="bg-white shadow-lg mx-auto"
          style={{
            width: "297mm",
            padding: "10mm",
            boxSizing: "border-box",
          }}
        >
          <Header
            province={data.province}
            district={data.district}
            commune={data.commune}
            mandateNumber={data.mandateNumber}
            mandateYearStart={data.mandateYearStart}
            mandateYearEnd={data.mandateYearEnd}
          />
          <Section1Democracy data={data} />
          <Section2Security data={data} />
          <Section3Services data={data} />
          <Section4Economy data={data} />
          <Section5SocialProtection data={data} />
          <Section6Democracy data={data} />
          <Section7Governance data={data} />
        </div>
      </Card>
    </div>
  );
}

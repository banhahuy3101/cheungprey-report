"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import EvaluationForm, { type EvaluationFormHandle } from "../components/EvaluationForm";
import type { EvaluationData } from "@/features/commune-evaluation/schema";
import { defaultEvaluationData } from "@/features/commune-evaluation/schema";
import { createEvaluation } from "@/features/commune-evaluation/service";
import { useAuth } from "@/features/auth/supabase-auth";
import { usePermissions } from "@/hooks/usePermissions";
import { loadGeoData } from "@/features/geo/geo-data";

export default function NewEvaluationPage() {
  const [seed, setSeed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<EvaluationFormHandle>(null);
  const { user } = useAuth();
  const { can } = usePermissions();
  const [initialData, setInitialData] = useState<EvaluationData>(defaultEvaluationData);

  useEffect(() => {
    if (!user) return;

    if (user.districtId) {
      loadGeoData().then((geo) => {
        const userDistrict = geo.districts.find((d) => d.code === user.districtId);
        const userCommune = user.communeId
          ? geo.communes.find((c) => c.code === user.communeId)
          : null;
        const userProvince = userDistrict
          ? geo.provinces.find((p) => p.code === userDistrict.provinceCode)
          : null;

        setInitialData((prev) => ({
          ...prev,
          province: userProvince?.kh ?? "",
          district: userDistrict?.kh ?? "",
          commune: userCommune?.kh ?? "",
        }));
      });
    }
  }, [user]);

  const canCreate = can("create", "commune_evaluation", {
    districtId: user?.districtId,
    communeId: user?.communeId ?? undefined,
  });

  if (!canCreate) {
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
            <h1 className="text-2xl font-semibold text-slate-900">បង្កើតថ្មី</h1>
          </div>
        </div>
        <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
          អ្នកមិនមានសិទ្ធិបង្កើតវាយតម្លៃទេ។
        </div>
      </div>
    );
  }

  const handleSubmit = async (form: EvaluationData) => {
    setSubmitting(true);
    try {
      await createEvaluation(form);
      window.location.href = "/dashboard/commune-evaluation";
    } catch (err) {
      console.error("Failed to create evaluation", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-slate-50 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/commune-evaluation">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">បង្កើតថ្មី</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button type="button" variant="outline" onClick={() => setSeed((s) => s + 1)}>
            បំពេញស្វ័យប្រវត្តិ
          </Button>
          <Button className="inline-flex items-center gap-2" disabled={submitting} onClick={() => formRef.current?.submitForm()}>
            <Save size={16} />
            {submitting ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
          </Button>
        </div>
      </div>

      <EvaluationForm
        key={seed}
        ref={formRef}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

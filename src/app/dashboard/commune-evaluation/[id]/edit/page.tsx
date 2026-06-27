"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import EvaluationForm, { type EvaluationFormHandle } from "../../components/EvaluationForm";
import type { EvaluationData } from "@/lib/evaluation-schema";
import { getEvaluation, updateEvaluation } from "@/lib/evaluation-service";

export default function EditEvaluationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<Partial<EvaluationData> | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<EvaluationFormHandle>(null);

  useEffect(() => {
    getEvaluation(id).then((record) => {
      if (record) {
        const { id: _id, created_at, updated_at, created_by, ...rest } = record;
        setInitialData(rest);
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (form: EvaluationData) => {
    setSubmitting(true);
    try {
      await updateEvaluation(id, form);
      window.location.href = `/dashboard/commune-evaluation/${id}`;
    } catch (err) {
      console.error("Failed to update evaluation", err);
      setError("បរាជ័យក្នុងការកែប្រែទិន្នន័យ");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-slate-50 pb-4 flex items-center gap-4">
          <Link href={`/dashboard/commune-evaluation/${id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">កំពុងផ្ទុក...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-slate-50 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/commune-evaluation/${id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">កែប្រែព័ត៌មាន</h1>
          </div>
        </div>
        <Button className="inline-flex items-center gap-2 flex-shrink-0" disabled={submitting} onClick={() => formRef.current?.submitForm()}>
          <Save size={16} />
          {submitting ? "កំពុងរក្សាទុក..." : "រក្សាទុកការកែប្រែ"}
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {initialData && (
        <EvaluationForm
          ref={formRef}
          initialData={initialData}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

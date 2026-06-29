"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bug, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import EvaluationForm, { type EvaluationFormHandle } from "../components/EvaluationForm";
import { createEvaluation } from "@/features/commune-evaluation/service";
import type { EvaluationData } from "@/features/commune-evaluation/schema";
import { usePermissions } from "@/hooks/usePermissions";

export default function NewCommuneEvaluationPage() {
  const router = useRouter();
  const { can } = usePermissions();
  const formRef = useRef<EvaluationFormHandle>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCreate = can("create", "commune_evaluation", {});
  const showDebugAutoFill = process.env.NODE_ENV !== "production";

  const handleSubmit = async (form: EvaluationData) => {
    setSaving(true);
    setError(null);

    try {
      await createEvaluation(form);
      router.push("/dashboard/commune-evaluation");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "មិនអាចរក្សាទុកទិន្នន័យបានទេ។");
      setSaving(false);
    }
  };

  if (!canCreate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">បង្កើតថ្មី</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8 text-center text-slate-500">
            អ្នកមិនមានសិទ្ធិបង្កើតទិន្នន័យនេះទេ។
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} disabled={saving}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">បង្កើតថ្មី</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showDebugAutoFill && (
            <Button
              type="button"
              variant="outline"
              className="inline-flex items-center gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              onClick={() => formRef.current?.autoFill()}
              disabled={saving}
            >
              <Bug size={16} />
              Auto Fill
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={saving}>
            បោះបង់
          </Button>
          <Button
            type="button"
            className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => formRef.current?.submitForm()}
            disabled={saving}
          >
            <Save size={16} />
            {saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-5">
          <EvaluationForm ref={formRef} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}

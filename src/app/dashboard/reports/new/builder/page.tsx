"use client";

import { Suspense, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ReportEditor from "@/components/ReportEditor";
import { getReport, updateReport } from "@/lib/data";

function BuilderInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const report = id ? getReport(id) : undefined;
  const [content, setContent] = useState(report?.contentHtml ?? "");
  const [saved, setSaved] = useState(false);

  const onChange = useCallback((html: string) => {
    setContent(html);
    setSaved(false);
  }, []);

  const onSave = () => {
    if (!id) return;
    updateReport(id, { contentHtml: content });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500">
        របាយការណ៍មិនមានទេ។
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/reports")}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{report.title}</h1>
            <p className="text-sm text-slate-500">កែសម្រួលរបាយការណ៍</p>
          </div>
        </div>
        <Button onClick={onSave} className="bg-blue-600 text-white hover:bg-blue-700">
          <Save size={16} />
          {saved ? "បានរក្សាទុក" : "រក្សាទុក"}
        </Button>
      </div>
      <ReportEditor content={content} onChange={onChange} />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-500">កំពុងផ្ទុក...</div>}>
      <BuilderInner />
    </Suspense>
  );
}

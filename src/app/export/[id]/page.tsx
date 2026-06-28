import { createServiceClient } from "@/utils/supabase/service-client";
import { generateEvaluationHtml } from "@/features/commune-evaluation/generate-html";

const KNOWN_KEYS = new Set([
  "id", "province", "district", "commune",
  "created_at", "updated_at", "created_by",
]);

const CAMEL_OVERRIDE: Record<string, string> = {
  minority_council_members_2022to2026: "minorityCouncilMembers2022to2026",
  disabled_council_members_2022to2026: "disabledCouncilMembers2022to2026",
};

function snakeToCamelKey(str: string): string {
  if (CAMEL_OVERRIDE[str]) return CAMEL_OVERRIDE[str];
  return str.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export default async function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("commune_evaluations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-slate-500">
        រកមិនឃើញព័ត៌មានវាយតម្លៃទេ។
      </div>
    );
  }

  const record: Record<string, unknown> = {};
  for (const key of Object.keys(data)) {
    record[KNOWN_KEYS.has(key) ? key : snakeToCamelKey(key)] = (data as Record<string, unknown>)[key];
  }

  const html = generateEvaluationHtml(record);

  return (
    <div
      id="print-root"
      className="p-4"
      style={{ background: "#fff", minHeight: "100vh" }}
    >
      <div
        id="export-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

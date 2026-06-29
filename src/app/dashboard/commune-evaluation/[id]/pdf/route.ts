import { NextResponse } from "next/server";
import { renderToBuffer, Font } from "@react-pdf/renderer";
import { createElement } from "react";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/service-client";
import { buildEvaluationDisplayRows } from "@/features/commune-evaluation/schema";
import { EvaluationPdfDocument } from "@/features/commune-evaluation/pdf-document";
import fs from "node:fs";
import path from "node:path";

const khmerFontData = fs.readFileSync(
  path.join(process.cwd(), "public", "fonts", "Siemreap-Regular.ttf"),
);

Font.register({
  family: "Siemreap",
  src: `data:font/ttf;base64,${khmerFontData.toString("base64")}`,
});

const KNOWN_KEYS = new Set([
  "id",
  "province",
  "district",
  "commune",
  "created_at",
  "updated_at",
  "created_by",
]);

const CAMEL_OVERRIDE: Record<string, string> = {
  minority_council_members_2022to2026: "minorityCouncilMembers2022to2026",
  disabled_council_members_2022to2026: "disabledCouncilMembers2022to2026",
};

function snakeToCamelKey(str: string): string {
  if (CAMEL_OVERRIDE[str]) return CAMEL_OVERRIDE[str];
  return str.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

function toCamelRecord(record: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(record)) {
    result[KNOWN_KEYS.has(key) ? key : snakeToCamelKey(key)] = record[key];
  }
  return result;
}

function safeFilename(value: unknown): string {
  return String(value || "commune-evaluation")
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-");
}

function contentDisposition(fileName: string): string {
  const asciiFileName = fileName.replace(/[^\x20-\x7E]/g, "-");
  return `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const serviceClient = createServiceClient();
  const { data, error } = await serviceClient
    .from("commune_evaluations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const record = toCamelRecord(data as Record<string, unknown>);
  const rows = buildEvaluationDisplayRows(record);
  const title = "ទិន្នន័យវាយតម្លៃឃុំ / សង្កាត់";
  const subtitle = `${record.province || ""} / ${record.district || ""} / ${record.commune || ""}`;
  const pdfBuffer = await renderToBuffer(
    createElement(EvaluationPdfDocument, {
      title,
      subtitle,
      rows,
    }),
  );
  const fileName = `${safeFilename(record.commune)}-${id}.pdf`;

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition(fileName),
      "Cache-Control": "no-store",
    },
  });
}

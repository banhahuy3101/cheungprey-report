import { createClient } from "@/utils/supabase/client";
import type { EvaluationData } from "@/features/commune-evaluation/schema";

export type CommuneEvaluationRecord = {
  id: string;
  province: string;
  district: string;
  commune: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
} & EvaluationData;

export type CommuneEvaluationListItem = {
  id: string;
  province: string;
  district: string;
  commune: string;
  created_at: string;
  updated_at: string;
};

export interface EvaluationFilter {
  province?: string;
  district?: string;
  commune?: string;
}

const TABLE = "commune_evaluations";

const KNOWN_KEYS = new Set([
  "id", "province", "district", "commune",
  "created_at", "updated_at", "created_by",
]);

const SNAKE_OVERRIDE: Record<string, string> = {
  minorityCouncilMembers2022to2026: "minority_council_members_2022to2026",
  disabledCouncilMembers2022to2026: "disabled_council_members_2022to2026",
};

function camelToSnake(str: string): string {
  if (SNAKE_OVERRIDE[str]) return SNAKE_OVERRIDE[str];
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/(\d+)/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

const CAMEL_OVERRIDE: Record<string, string> = {
  minority_council_members_2022to2026: "minorityCouncilMembers2022to2026",
  disabled_council_members_2022to2026: "disabledCouncilMembers2022to2026",
};

function snakeToCamel(str: string): string {
  if (CAMEL_OVERRIDE[str]) return CAMEL_OVERRIDE[str];
  return str.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function mapKeys<T>(obj: T, fn: (key: string) => string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj as object)) {
    result[fn(key)] = (obj as Record<string, unknown>)[key];
  }
  return result;
}

function recordToCamelCase(record: Record<string, unknown>): CommuneEvaluationRecord {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(record)) {
    result[KNOWN_KEYS.has(key) ? key : snakeToCamel(key)] = record[key];
  }
  return result as CommuneEvaluationRecord;
}

export async function listEvaluations(filter?: EvaluationFilter): Promise<CommuneEvaluationListItem[]> {
  const supabase = createClient();
  let query = supabase
    .from(TABLE)
    .select("id, province, district, commune, created_at, updated_at");

  if (filter?.province) {
    query = query.eq("province", filter.province);
  }
  if (filter?.district) {
    query = query.eq("district", filter.district);
  }
  if (filter?.commune) {
    query = query.eq("commune", filter.commune);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getEvaluation(id: string): Promise<CommuneEvaluationRecord | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return recordToCamelCase(data as Record<string, unknown>);
}

export async function createEvaluation(
  payload: { province: string; district: string; commune: string } & EvaluationData,
): Promise<CommuneEvaluationRecord> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const snakePayload = mapKeys(payload, camelToSnake);
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ...snakePayload,
      created_by: user?.id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error("Failed to create evaluation");
  return recordToCamelCase(data as Record<string, unknown>);
}

export async function updateEvaluation(
  id: string,
  payload: Partial<{ province: string; district: string; commune: string } & EvaluationData>,
): Promise<CommuneEvaluationRecord> {
  const supabase = createClient();
  const snakePayload = mapKeys(payload, camelToSnake);
  const { data, error } = await supabase
    .from(TABLE)
    .update(snakePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error("Failed to update evaluation");
  return recordToCamelCase(data as Record<string, unknown>);
}

export async function deleteEvaluation(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

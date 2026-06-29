"use client";

import { Input, Select, Textarea } from "@/components/ui/Input";
import type { EvaluationData } from "@/features/commune-evaluation/schema";

export interface DataRowEditMeta {
  inputType?: "number" | "text" | "select" | "textarea";
  inputOptions?: { value: string; label: string }[];
  inputLabels?: string[];
}

export function renderEditCell(
  fields: (keyof EvaluationData)[],
  meta: DataRowEditMeta,
  data: Partial<EvaluationData>,
  onUpdate: (field: keyof EvaluationData, value: string) => void,
) {
  const type = meta.inputType;

  if (type === "select" && meta.inputOptions) {
    return (
      <Select
        value={data[fields[0]] as string ?? ""}
        onChange={(e) => onUpdate(fields[0], e.target.value)}
      >
        <option value="">ជ្រើសរើស</option>
        {meta.inputOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    );
  }

  if (type === "textarea") {
    return (
      <Textarea
        className="min-h-[60px] text-xs"
        value={data[fields[0]] as string ?? ""}
        onChange={(e) => onUpdate(fields[0], e.target.value)}
      />
    );
  }

  const inputTypeAttr = type === "number" ? "number" : "text";

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {fields.map((field, i) => (
        <div key={String(field)} className="flex items-center gap-1">
          {meta.inputLabels?.[i] && (
            <span className="text-[10px] text-slate-500 whitespace-nowrap">
              {meta.inputLabels[i]}
            </span>
          )}
          <Input
            type={inputTypeAttr}
            className="w-24 h-7 text-xs"
            value={data[field] as string ?? ""}
            onChange={(e) => onUpdate(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

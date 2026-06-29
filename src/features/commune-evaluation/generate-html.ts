import { evaluationSections } from "@/features/commune-evaluation/schema";

function toLabel(v: unknown, khmerTrue?: string, khmerFalse?: string): string {
  if (v === "yes" || v === "មាន" || v === "បាន") return khmerTrue ?? "មាន";
  if (v === "no" || v === "មិនមាន" || v === "មិនបាន") return khmerFalse ?? "មិនមាន";
  if (v === "sufficient") return "គ្រប់គ្រាន់";
  if (v === "insufficient") return "មិនគ្រប់គ្រាន់";
  if (v === "none") return "មិនមាន";
  if (v === "ល្អ") return "ល្អ";
  if (v === "មធ្យម") return "មធ្យម";
  if (v === "មិនទាន់បានល្អ") return "មិនទាន់បានល្អ";
  return String(v ?? "-");
}

function khmerNum(s: string): string {
  const map: Record<string, string> = { "0": "០","1": "១","2": "២","3": "៣","4": "៤","5": "៥","6": "៦","7": "៧","8": "៨","9": "៩" };
  return String(s).replace(/[0-9]/g, (d) => map[d] ?? d);
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 10px;border:1px solid #d1d5db;font-size:13px;background:#f9fafb">${label}</td><td style="padding:6px 10px;border:1px solid #d1d5db;font-size:13px">${value}</td></tr>`;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generateEvaluationHtml(record: Record<string, unknown>): string {
  const v = (key: string): string => {
    const val = record[key];
    if (val === undefined || val === null || val === "") return "-";
    return khmerNum(String(val));
  };

  const c = (key: string, t?: string, f?: string): string => {
    const val = record[key];
    if (val === undefined || val === null || val === "") return "-";
    return toLabel(val, t, f);
  };

  const province = v("province");
  const district = v("district");
  const commune = v("commune");
  const mandateNumber = v("mandateNumber");
  const mandateYearStart = v("mandateYearStart");
  const mandateYearEnd = v("mandateYearEnd");

  let bodyHtml = "";
  for (const section of evaluationSections) {
    let sectionHtml = "";
    for (const subsection of section.subsections) {
      let subsectionHtml = "";
      for (const field of subsection.fields) {
        const raw = record[field.key];
        const val = raw === undefined || raw === null || raw === "" ? "-" : khmerNum(String(raw));
        subsectionHtml += row(escapeHtml(field.label), val);
      }
      if (subsectionHtml) {
        sectionHtml += `<h4 style="font-size:13px;font-weight:600;color:#1e3a5f;margin:8px 0 4px;padding:4px 8px;background:#e8f0fe;border-radius:3px">${subsection.subsectionNum}. ${escapeHtml(subsection.subsectionTitle)}</h4>`;
        sectionHtml += `<table style="width:100%;border-collapse:collapse;margin-bottom:8px">${subsectionHtml}</table>`;
      }
    }
    if (sectionHtml) {
      bodyHtml += `<div class="section-title">ផ្នែកទី ${section.sectionNum}: ${escapeHtml(section.sectionTitle)}</div>`;
      bodyHtml += sectionHtml;
    }
  }

  return `<!DOCTYPE html>
<html lang="km">
<head>
<meta charset="utf-8">
<style>
  body { font-family: "Moul", "Siemreap", "Khmer OS", "Leelawadee UI", sans-serif; margin:0; padding:20px; color:#1e293b; background:#fff; }
  h1 { font-size:18px; text-align:center; margin:0 0 4px; }
  h2 { font-size:14px; text-align:center; font-weight:400; margin:0 0 16px; color:#475569; }
  table { width:100%; border-collapse:collapse; margin-bottom:8px; }
  th, td { padding:6px 10px; border:1px solid #d1d5db; font-size:13px; text-align:left; }
  th { background:#1e40af; color:#fff; font-weight:600; }
  .section-title { font-size:15px; font-weight:600; color:#1e3a5f; margin:16px 0 8px; padding:8px 12px; background:#e8f0fe; border-radius:4px; }
</style>
</head>
<body>
<h1>សម្រាប់រដ្ឋបាលឃុំ/សង្កាត់នីមួយៗ</h1>
<h2>ខេត្ត: ${province} &nbsp;&nbsp; ស្រុក: ${district} &nbsp;&nbsp; ឃុំ: ${commune} &nbsp;&nbsp; អាណត្តិទី${mandateNumber} (${mandateYearStart}-${mandateYearEnd})</h2>
${bodyHtml}
</body>
</html>`;
}

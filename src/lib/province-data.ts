export type ProvinceItem = {
  province_code: string;
  province_kh: string;
  province_en: string;
};

export type DistrictItem = {
  province_code: string;
  district_code: string;
  district_kh: string;
  district_en: string;
};

export type CommuneItem = {
  province_code: string;
  district_code: string;
  commune_code: string;
  commune_kh: string;
  commune_en: string;
};

function parseCSV<T>(text: string): T[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const vals = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h.trim()] = (vals[i] ?? "").trim();
    });
    return row as unknown as T;
  });
}

export async function fetchProvinces(): Promise<ProvinceItem[]> {
  const res = await fetch("/assets/Cambodia Province List 2025.csv");
  const text = await res.text();
  return parseCSV<ProvinceItem>(text);
}

export async function fetchDistricts(): Promise<DistrictItem[]> {
  const res = await fetch("/assets/Cambodia District List 2025.csv");
  const text = await res.text();
  return parseCSV<DistrictItem>(text);
}

export async function fetchCommunes(): Promise<CommuneItem[]> {
  const res = await fetch("/assets/Cambodia Commune List 2025.csv");
  const text = await res.text();
  return parseCSV<CommuneItem>(text);
}

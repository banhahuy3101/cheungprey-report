import staticProvinces from "@/lib/geo-data.json";

export interface Province {
  code: string;
  kh: string;
  en: string;
}

export interface District {
  code: string;
  kh: string;
  en: string;
  provinceCode: string;
}

export interface Commune {
  code: string;
  kh: string;
  en: string;
  districtCode: string;
}

export interface GeoCache {
  provinces: Province[];
  districts: District[];
  communes: Commune[];
  loading: boolean;
  error: string | null;
}

const DISTRICT_API =
  "https://data.mef.gov.kh/api/v1/public-datasets/pd_66a8603800604c000123e145/json";
const COMMUNE_API =
  "https://data.mef.gov.kh/api/v1/public-datasets/pd_66a8603900604c000123e146/json";

let cache: GeoCache | null = null;
let fetchPromise: Promise<GeoCache> | null = null;

async function fetchAllPages(baseUrl: string): Promise<any[]> {
  const firstRes = await fetch(`${baseUrl}?page=1&page_size=100`);
  const first = await firstRes.json();
  const all = [...first.items];

  for (let p = 2; p <= first.total_pages; p++) {
    try {
      const res = await fetch(`${baseUrl}?page=${p}&page_size=100`);
      const data = await res.json();
      all.push(...data.items);
    } catch {
      continue;
    }
  }
  return all;
}

async function loadDistrictAndCommuneData() {
  const [districtItems, communeItems] = await Promise.all([
    fetchAllPages(DISTRICT_API),
    fetchAllPages(COMMUNE_API),
  ]);

  const districts: District[] = [];
  const communes: Commune[] = [];

  for (const item of districtItems) {
    districts.push({
      code: item.district_code,
      kh: item.district_kh,
      en: item.district_en,
      provinceCode: item.province_code,
    });
  }

  for (const item of communeItems) {
    communes.push({
      code: item.commune_code,
      kh: item.commune_kh,
      en: item.commune_en,
      districtCode: item.district_code,
    });
  }

  return { districts, communes };
}

export async function loadGeoData(): Promise<GeoCache> {
  if (cache) return cache;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const { districts, communes } = await loadDistrictAndCommuneData();
      cache = {
        provinces: staticProvinces.provinces,
        districts,
        communes,
        loading: false,
        error: null,
      };
    } catch (err: any) {
      cache = {
        provinces: staticProvinces.provinces,
        districts: [],
        communes: [],
        loading: false,
        error: err.message,
      };
    }
    return cache;
  })();

  return fetchPromise;
}

export function getDistricts(data: GeoCache, provinceCode: string): District[] {
  return data.districts.filter((d) => d.provinceCode === provinceCode);
}

export function getCommunes(data: GeoCache, districtCode: string): Commune[] {
  return data.communes.filter((c) => c.districtCode === districtCode);
}

export function toSearchSelectOptions(
  items: { code: string; kh: string; en: string }[]
) {
  return items.map((item) => ({
    value: `${item.code}|${item.kh}|${item.en}`,
    label: item.kh || item.en,
  }));
}

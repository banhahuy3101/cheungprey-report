"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { createReport } from "@/lib/data";
import { listUserProfiles } from "@/lib/user-profile-service";
import { useAuth } from "@/lib/supabase-auth";

interface CsvDistrict {
  provinceCode: string;
  districtCode: string;
  kh: string;
  en: string;
}

interface CsvProvince {
  code: string;
  kh: string;
  en: string;
}

function parseCsv<T>(text: string, mapper: (cols: string[]) => T): T[] {
  return text.trim().split("\n").slice(1).map((line) => mapper(line.split(",")));
}

export default function NewReportPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [districts, setDistricts] = useState<CsvDistrict[]>([]);
  const [provinces, setProvinces] = useState<CsvProvince[]>([]);
  const [profiles, setProfiles] = useState<Awaited<ReturnType<typeof listUserProfiles>>>([]);

  useEffect(() => {
    listUserProfiles().then(setProfiles);
  }, []);
  const [form, setForm] = useState({
    title: "",
    documentNumber: "",
    date: new Date().toISOString().slice(0, 10),
    provinceCode: "",
    districtCode: "",
    location: "",
    author: user?.name ?? "",
    approvedById: "",
  });

  useEffect(() => {
    Promise.all([
      fetch("/assets/Cambodia Province List 2025.csv").then((r) => r.text()),
      fetch("/assets/Cambodia District List 2025.csv").then((r) => r.text()),
    ]).then(([provinceText, districtText]) => {
      const pList = parseCsv(provinceText, ([code, kh, en]) => ({ code, kh, en }));
      const dList = parseCsv(districtText, ([provinceCode, districtCode, kh, en]) => ({
        provinceCode, districtCode, kh, en,
      }));
      setProvinces(pList);
      setDistricts(dList);
      if (pList.length > 0 && dList.length > 0) {
        const firstProvince = pList[0].code;
        const firstDistrict = dList.find((d) => d.provinceCode === firstProvince);
        setForm((prev) => ({
          ...prev,
          provinceCode: firstProvince,
          districtCode: firstDistrict?.districtCode ?? "",
          location: firstDistrict?.kh ?? "",
        }));
      }
    });
  }, []);

  const filteredDistricts = form.provinceCode
    ? districts.filter((d) => d.provinceCode === form.provinceCode)
    : [];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">របាយការណ៍ថ្មី</h1>
          <p className="text-sm text-slate-500">បង្កើតរបាយការណ៍ថ្មី</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ព័ត៌មានរបាយការណ៍</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const approver = profiles.find((p) => p.id === form.approvedById);
            const approvedByName = approver ? `${approver.first_name_kh} ${approver.last_name_kh}` : "";
            const report = createReport({
              title: form.title,
              documentNumber: form.documentNumber,
              date: form.date,
              location: form.location,
              selectedParts: [],
              variables: { author: form.author, approvedBy: approvedByName },
              status: "draft",
              level: "district",
              districtId: form.districtCode,
              communeId: null,
              createdBy: user?.id ?? "",
            });
            router.push(`/dashboard/reports/new/builder?id=${report.id}`);
          }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label required>ចំណងជើង</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ចំណងជើងរបាយការណ៍" required />
              </div>
              <div className="space-y-1.5">
                <Label required>លេខឯកសារ</Label>
                <Input value={form.documentNumber} onChange={(e) => setForm({ ...form, documentNumber: e.target.value })} placeholder="លេខឯកសារ" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label required>កាលបរិច្ឆេទ</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label required>ខេត្ត</Label>
                <SearchSelect
                  options={provinces.map((p) => ({ value: p.code, label: `${p.kh} (${p.en})` }))}
                  value={form.provinceCode}
                  onChange={(val) => {
                    const first = districts.find((d) => d.provinceCode === val);
                    setForm({ ...form, provinceCode: val, districtCode: first?.districtCode ?? "", location: first?.kh ?? "" });
                  }}
                  placeholder="ជ្រើសរើសខេត្ត..."
                />
              </div>
              <div className="space-y-1.5">
                <Label required>ស្រុក</Label>
                <SearchSelect
                  options={filteredDistricts.map((d) => ({ value: d.districtCode, label: `${d.kh} (${d.en})` }))}
                  value={form.districtCode}
                  onChange={(val) => {
                    const d = districts.find((x) => x.districtCode === val);
                    setForm({ ...form, districtCode: val, location: d?.kh ?? "" });
                  }}
                  placeholder="ស្វែងរកស្រុក..."
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>ទីតាំង</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label required>អ្នករាយការណ៍</Label>
                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label>បញ្ជីសមាជិក</Label>
                <SearchSelect
                  options={profiles.map((p) => ({ value: p.id, label: `${p.first_name_kh} ${p.last_name_kh} (${p.party_position || p.position || "—"})` }))}
                  value={form.approvedById}
                  onChange={(val) => setForm({ ...form, approvedById: val })}
                  placeholder="ជ្រើសរើសសមាជិក..."
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">បង្កើត</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>បោះបង់</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

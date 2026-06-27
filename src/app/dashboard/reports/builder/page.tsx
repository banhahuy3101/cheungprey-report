"use client";

import { useEffect, useState } from "react";
import ReportEditor from "@/components/ReportEditor";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { FileText, CheckSquare, Eye } from "lucide-react";

const SECTION_OPTIONS = [
  { key: "header", label: "ក្បាលឯកសារ" },
  { key: "title", label: "ចំណងជើង" },
  { key: "generalSituation", label: "I. ស្ថានភាពទូទៅ" },
  { key: "partyActivities", label: "II. សកម្មភាពបក្ស" },
  { key: "development", label: "III. ការអភិវឌ្ឍន៍" },
  { key: "challenges", label: "IV. បញ្ហាប្រឈម" },
  { key: "nextMonthPlan", label: "V. ទិសដៅខែបន្ទាប់" },
  { key: "footer", label: "ហត្ថលេខា/ត្រា" },
] as const;

const sections: Record<string, string> = {
  header: `
    <div style="text-align: center;">
      <h2 style="margin-bottom: 0;">គណបក្សប្រជាជនកម្ពុជា</h2>
      <h3 style="margin-top: 5px;">គណៈកម្មាធិការគណបក្សស្រុក............</h3>
      <p style="text-align: left;">លេខៈ ...... /២០២៦/គ.បក.ស្រុក</p>
      <p style="text-align: right;">ថ្ងៃទី ២៥ ខែ មិថុនា ឆ្នាំ ២០២៦</p>
    </div>
    <hr />
  `,
  title: `
    <div style="text-align: center; margin-top: 20px;">
      <h2 style="text-decoration: underline;">របាយការណ៍</h2>
      <h3>ស្តីពី សកម្មភាពការងារបក្សប្រចាំខែ</h3>
      <h4>ខែឧសភា ឆ្នាំ២០២៦</h4>
    </div>
    <p>ជូន ៖ គណៈកម្មាធិការគណបក្សខេត្ត............</p>
  `,
  generalSituation: `
    <h3>I. ស្ថានភាពទូទៅ (General Situation)</h3>
    <p><strong>១. សន្តិសុខ សណ្តាប់ធ្នាប់សង្គម ៖</strong></p>
    <ul>
      <li>ករណីល្មើសច្បាប់សរុប៖ ... ករណី</li>
      <li>ករណីគ្រឿងញៀន៖ ... ករណី</li>
      <li>គ្រោះថ្នាក់ចរាចរណ៍៖ ... ករណី</li>
    </ul>
    <p><strong>២. ស្ថានភាពសេដ្ឋកិច្ច និងជីវភាពប្រជាពលរដ្ឋ ៖</strong></p>
    <ul>
      <li>តម្លៃទំនិញសំខាន់ៗ ៖ ...</li>
      <li>ការងារ និងការធ្វើចំណាកស្រុក ៖ ...</li>
    </ul>
  `,
  partyActivities: `
    <h3>II. សកម្មភាពការងារបក្ស (Party Activities)</h3>
    <p><strong>១. ការងារចាត់តាំង និងសមាជិកបក្ស ៖</strong></p>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 5px;">សាខាបក្សភូមិ</th>
          <th style="border: 1px solid black; padding: 5px;">សមាជិកសរុប</th>
          <th style="border: 1px solid black; padding: 5px;">ស្រី</th>
          <th style="border: 1px solid black; padding: 5px;">បញ្ចូលថ្មី</th>
          <th style="border: 1px solid black; padding: 5px;">ស្លាប់/ចាកចេញ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; padding: 5px;">ភូមិកណ្តាល</td>
          <td style="border: 1px solid black; padding: 5px;">១៥០</td>
          <td style="border: 1px solid black; padding: 5px;">៧០</td>
          <td style="border: 1px solid black; padding: 5px;">៥</td>
          <td style="border: 1px solid black; padding: 5px;">២</td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 5px;">ភូមិត្រពាំង</td>
          <td style="border: 1px solid black; padding: 5px;">១២០</td>
          <td style="border: 1px solid black; padding: 5px;">៥៥</td>
          <td style="border: 1px solid black; padding: 5px;">៣</td>
          <td style="border: 1px solid black; padding: 5px;">១</td>
        </tr>
      </tbody>
    </table>
    <p><strong>២. ការប្រជុំ និងការផ្សព្វផ្សាយ ៖</strong></p>
    <ul>
      <li>ចំនួនប្រជុំជីវភាពបក្ស៖ ... លើក</li>
      <li>ចំនួនវគ្គបណ្តុះបណ្តាល៖ ... លើក (មានសមាជិកចូលរួម ... នាក់)</li>
      <li>ការផ្សព្វផ្សាយគោលនយោបាយរដ្ឋាភិបាល ៖ ... លើក</li>
    </ul>
  `,
  development: `
    <h3>III. ការងារអភិវឌ្ឍន៍មូលដ្ឋាន (Local Development)</h3>
    <p><strong>១. ហេដ្ឋារចនាសម្ព័ន្ធដែលបានកសាង/ជួសជុល ៖</strong></p>
    <ul>
      <li>ផ្លូវថ្នល់៖ ... គីឡូម៉ែត្រ</li>
      <li>ប្រឡាយ ស្រះទឹក៖ ... កន្លែង</li>
      <li>សាលារៀន មន្ទីរពេទ្យ៖ ... អគារ</li>
    </ul>
  `,
  challenges: `
    <h3>IV. បញ្ហាប្រឈម និងចំណុចខ្វះខាត (Challenges)</h3>
    <p>១. ...</p>
    <p>២. ...</p>
  `,
  nextMonthPlan: `
    <h3>V. ទិសដៅការងារខែបន្ទាប់ (Next Month Direction)</h3>
    <p>១. ...</p>
    <p>២. ...</p>
  `,
  footer: `
    <div style="margin-top: 50px; text-align: right;">
      <p>គណៈកម្មាធិការគណបក្សស្រុក</p>
      <p>ប្រធាន</p>
      <br /><br /><br />
      <p>ឈ្មោះ ............</p>
    </div>
  `,
};

const ReportBuilder = () => {
  const [selectedParts, setSelectedParts] = useState({
    header: true,
    title: true,
    generalSituation: true,
    partyActivities: true,
    development: true,
    challenges: true,
    nextMonthPlan: true,
    footer: true,
  });

  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    const newContent = SECTION_OPTIONS.filter((item) => selectedParts[item.key])
      .map((item) => sections[item.key])
      .join("<br />");
    setEditorContent(newContent);
  }, [selectedParts]);

  const togglePart = (key: (typeof SECTION_OPTIONS)[number]["key"]) => {
    setSelectedParts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Report Builder</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Build Your District Report</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              ជ្រើសផ្នែកដែលត្រូវបង្ហាញក្នុងរបាយការណ៍ និងកែសម្រួលខ្លឹមសារជនិច្ចមុននឹងបញ្ចប់។
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="inline-flex items-center gap-2">
              <Eye size={16} /> ពិនិត្យមើល
            </Button>
            <Button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
              <CheckSquare size={16} /> រក្សាទុកព្រាង
            </Button>
            <Button className="inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
              <FileText size={16} /> ទាញយក PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>ជ្រើសផ្នែករបាយការណ៍</CardTitle>
            <CardDescription>បញ្ចូលឬដកចេញផ្នែកដែលអ្នកចង់បង្ហាញក្នុងរបាយការណ៍។</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {SECTION_OPTIONS.map((item) => (
              <label
                key={item.key}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-blue-300 hover:bg-white"
              >
                <input
                  type="checkbox"
                  checked={selectedParts[item.key]}
                  onChange={() => togglePart(item.key)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  aria-label={item.label}
                />
                <span className="font-medium">{item.label}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>ពិនិត្យខ្លឹមសារ</CardTitle>
              <CardDescription>របាយការណ៍ដែលបានបង្កើតត្រូវបានបញ្ចូលនៅទីនេះ។</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportEditor content={editorContent} onChange={setEditorContent} />
            </CardContent>
          </Card>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Tips</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the preview button to verify Khmer rendering, then save the draft before exporting to PDF. The selected parts are merged into the editor automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;

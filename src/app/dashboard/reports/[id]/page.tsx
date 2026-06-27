import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getReport, listReports } from "@/lib/data";

export function generateStaticParams() {
  return listReports().map((r) => ({ id: r.id }));
}

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReport(id);

  if (!report) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">ព័ត៌មានប្រវត្តិរបាយការណ៍</p>
          <h1 className="text-2xl font-semibold text-slate-900">{report.title}</h1>
        </div>
        <Link href="/dashboard/reports" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
          <ArrowLeft size={16} /> ត្រឡប់ក្រោយ
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ព័ត៌មានសំខាន់</CardTitle>
          <CardDescription>ព័ត៌មានសង្ខេបនៃរបាយការណ៍នេះ</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">លេខឯកសារ</p>
            <p className="mt-1 font-medium text-slate-900">{report.documentNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">កាលបរិច្ឆេទ</p>
            <p className="mt-1 font-medium text-slate-900">{report.date}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">កម្រិត</p>
            <p className="mt-1 font-medium text-slate-900 capitalize">{report.level}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">ស្ថានភាព</p>
            <Badge variant={report.status === "finalized" ? "success" : "default"}>
              {report.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>មាតិកា</CardTitle>
          <CardDescription>ផ្នែកដែលបានរើសក្នុងរបាយការណ៍</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {report.selectedParts.map((part) => (
            <Badge key={part} variant="outline" className="capitalize">
              {part}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ខ្លឹមសារ</CardTitle>
          <CardDescription>អត្ថបទរបាយការណ៍ដែលបានរក្សាទុក</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: report.contentHtml ?? "<p>មិនមានខ្លឹមសារបានផ្ទុកនៅឡើយទេ។</p>" }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

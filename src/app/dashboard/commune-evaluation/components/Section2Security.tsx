import type { EvaluationData } from "@/features/commune-evaluation/schema";

const khmerDigits: Record<string, string> = {
  "0": "០", "1": "១", "2": "២", "3": "៣", "4": "៤",
  "5": "៥", "6": "៦", "7": "៧", "8": "៨", "9": "៩",
};

function toKhmerNum(value: string | undefined) {
  const text = (value || "").replace(/\d/g, (d) => khmerDigits[d]);
  return <span className="font-bold">{text}</span>;
}

function present(val: unknown): boolean {
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "string") return val !== "";
  return val !== undefined && val !== null;
}

interface Section2Props {
  data: Partial<EvaluationData>;
}

interface DataRow {
  id: string;
  indicator: string;
  render: (d: Partial<EvaluationData>) => React.ReactNode;
  fields: (keyof EvaluationData)[];
}

const rows_2_1: DataRow[] = [
  {
    id: "២.១.១",
    indicator: "ចំនួនប្រជាការពារនៅតាមឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.communeGuardCount)} នាក់</>,
    fields: ["communeGuardCount"],
  },
  {
    id: "២.១.២",
    indicator: "ចំនួនវគ្គបណ្តុះបណ្តាល និងពង្រឹងសមត្ថភាពប្រជាការពារ",
    render: (d) => <>ចំនួន {toKhmerNum(d.communeGuardTrainingCount)} វគ្គ</>,
    fields: ["communeGuardTrainingCount"],
  },
  {
    id: "២.១.៣",
    indicator: "ការគាំទ្រផ្សេងៗដល់ប្រជាការពារ",
    render: (d) => <>{d.communeGuardSupport}</>,
    fields: ["communeGuardSupport"],
  },
  {
    id: "២.១.៤",
    indicator: "ចំនួនមន្ត្រីនគរបាលរដ្ឋបាលនៅឃុំ សង្កាត់នីមួយៗ",
    render: (d) => <>ចំនួន {toKhmerNum(d.administrativePoliceCount)} នាក់</>,
    fields: ["administrativePoliceCount"],
  },
  {
    id: "២.១.៥",
    indicator: "ចំនួនវគ្គបណ្តុះបណ្តាលដែលផ្តល់ឱ្យប៉ុស្តិ៍នគរបាលរដ្ឋបាលឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.policeTrainingCount)} វគ្គ</>,
    fields: ["policeTrainingCount"],
  },
  {
    id: "២.១.៦",
    indicator: "ការគាំទ្រផ្សេងៗដល់ប៉ុស្តិ៍នគរបាល",
    render: (d) => <>{d.policeSupport}</>,
    fields: ["policeSupport"],
  },
  {
    id: "២.១.៧",
    indicator: "អត្រាបទល្មើសដែលបង្ក្រាបបានធៀបនឹងបទល្មើសដែលកើតឡើង",
    render: (d) => <>ចំនួន {toKhmerNum(d.crimeSuppressionRate)} %</>,
    fields: ["crimeSuppressionRate"],
  },
  {
    id: "២.១.៨",
    indicator: "ចំនួនកម្មវិធីអប់រំ និងផ្សព្វផ្សាយអំពីបញ្ហាបទល្មើស និងគ្រឿងញៀនដែលបានរៀបចំនៅតាមមូលដ្ឋាន តាមសាលារៀន និងទីតាំងនានា",
    render: (d) => <>ចំនួន {toKhmerNum(d.crimeEducationPrograms)} កម្មវិធី</>,
    fields: ["crimeEducationPrograms"],
  },
  {
    id: "២.១.៩",
    indicator: "ចំនួនប្រជាពលរដ្ឋចូលរួមកម្មវិធីអប់រំ និងផ្សព្វផ្សាយអំពីបញ្ហាបទល្មើស និងគ្រឿងញៀនដែលបានរៀបចំនៅតាមមូលដ្ឋាន តាមសាលារៀន និងទីតាំងនានា",
    render: (d) => <>ចំនួន {toKhmerNum(d.crimeEducationParticipants)} នាក់</>,
    fields: ["crimeEducationParticipants"],
  },
];

const rows_2_2: DataRow[] = [
  {
    id: "២.២.១",
    indicator: "ឃុំ សង្កាត់ដែលរៀបចំមានការសម្រួលចរាចរណ៍ឆ្លងកាត់ផ្លូវសាធារណៈរបស់ប្រជាពលរដ្ឋជាពិសេសសិស្សានុសិស្ស",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4">
          {d.hasTrafficManagement === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1">
          {d.hasTrafficManagement === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasTrafficManagement"],
  },
  {
    id: "២.២.២",
    indicator: "ចំនួនស្លាកសញ្ញាចរាចរណ៍នៅក្នុងឃុំ សង្កាត់ (គ្រប់គ្រាន់ ឬមិនទាន់គ្រប់គ្រាន់ ឬគ្មាន)",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4">
          {d.trafficSignsStatus === "គ្រប់គ្រាន់" ? "☑" : "☐"} គ្រប់គ្រាន់
        </label>
        <label className="inline-flex items-center gap-1 mr-4">
          {d.trafficSignsStatus === "មិនគ្រប់គ្រាន់" ? "☑" : "☐"} មិនគ្រប់គ្រាន់
        </label>
        <label className="inline-flex items-center gap-1">
          {d.trafficSignsStatus === "គ្មាន" ? "☑" : "☐"} គ្មាន
        </label>
      </>
    ),
    fields: ["trafficSignsStatus"],
  },
  {
    id: "២.២.៣",
    indicator: "ចំនួនគ្រោះថ្នាក់ចរាចរណ៍",
    render: (d) => <>ចំនួន {toKhmerNum(d.trafficAccidentCases)} ករណី</>,
    fields: ["trafficAccidentCases"],
  },
  {
    id: "២.២.៤",
    indicator: "ចំនួនទីប្រជុំជន សាលារៀន តំបន់ជុំវិញផ្សារ និងតំបន់ស្មុគស្មាញនានាដែលមានសណ្តាប់ធ្នាប់ល្អ",
    render: (d) => <>ចំនួន {toKhmerNum(d.orderlyPlaces)} កន្លែង</>,
    fields: ["orderlyPlaces"],
  },
  {
    id: "២.២.៥",
    indicator: "ចំនួនទីប្រជុំជន សាលារៀន តំបន់ជុំវិញផ្សារ និងតំបន់ស្មុគស្មាញនានាដែលមិនទាន់មានសណ្តាប់ធ្នាប់ល្អ",
    render: (d) => <>ចំនួន {toKhmerNum(d.disorderlyPlaces)} កន្លែង</>,
    fields: ["disorderlyPlaces"],
  },
  {
    id: "២.២.៦",
    indicator: "ឃុំ សង្កាត់ដែលមានចំណតសាធារណៈ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4">
          {d.hasPublicParking === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1">
          {d.hasPublicParking === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasPublicParking"],
  },
  {
    id: "២.២.៧",
    indicator: "ចំនួនកម្មវិធីផ្សព្វផ្សាយ និងអប់រំច្បាប់ចរាចរណ៍",
    render: (d) => <>ចំនួន {toKhmerNum(d.trafficLawEducationSessions)} កម្មវិធី</>,
    fields: ["trafficLawEducationSessions"],
  },
  {
    id: "២.២.៨",
    indicator: "ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមអប់រំផ្សព្វផ្សាយច្បាប់ចរាចរណ៍",
    render: (d) => <>ចំនួន {toKhmerNum(d.trafficLawEducationParticipants)} នាក់</>,
    fields: ["trafficLawEducationParticipants"],
  },
];

function filterRows(rows: DataRow[], data: Partial<EvaluationData>): DataRow[] {
  return rows.filter((r) => r.fields.some((f) => present(data[f])));
}

export default function Section2Security({ data }: Section2Props) {
  const activeRows_2_1 = filterRows(rows_2_1, data);
  const activeRows_2_2 = filterRows(rows_2_2, data);

  return (
    <table className="w-full border-collapse border border-black border-t-0">
      <thead>
        <tr>
          <th className="border border-black w-20 p-1 text-center font-moul text-xs">ល.រ</th>
          <th className="border border-black p-1 font-moul text-xs">សូចនាករ</th>
          <th className="border border-black w-[45%] p-1 font-moul">
            <div className="text-wrap font-moul text-xs">
              ទិន្នន័យ ឬព័ត៌មាន លទ្ធផលនៃការអនុវត្ត
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black text-center p-1 font-siemreap text-xs">២</td>
          <td className="border border-black p-1 font-siemreap text-xs bg-[#B4C6E7]" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលមានសន្តិសុខ របៀបរៀបរយ សណ្តាប់ធ្នាប់សាធារណៈ និងសុវត្ថិភាពសង្គមល្អប្រសើរ
          </td>
        </tr>

        {activeRows_2_1.length > 0 && (
          <>
            <tr>
              <td className="border border-black text-center p-1 font-siemreap text-xs bg-[#E8EDF8]">២.១</td>
              <td className="border border-black p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
                គ្មានបទល្មើសលួច ឆក់ ប្លន់ គ្រឿងញៀន ល្បែងស៊ីសងខុសច្បាប់ និងបទល្មើសផ្សេងៗទៀតក្នុងភូមិ ឃុំ សង្កាត់
              </td>
            </tr>
            {activeRows_2_1.map((r) => (
              <tr key={r.id}>
                <td className="border border-black text-center p-1 font-siemreap text-xs align-top">{r.id}</td>
                <td className="border border-black p-1 font-siemreap text-xs">{r.indicator}</td>
                <td className="border border-black p-1 font-siemreap text-xs text-justify align-top">{r.render(data)}</td>
              </tr>
            ))}
          </>
        )}

        {activeRows_2_2.length > 0 && (
          <>
            <tr data-pb="true">
              <td className="border border-black text-center p-1 font-siemreap text-xs bg-[#E8EDF8]">២.២</td>
              <td className="border border-black p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
                មានសណ្តាប់ធ្នាប់សាធារណៈល្អ ជាពិសេសគ្មានគ្រោះថ្នាក់ចរាចរណ៍
              </td>
            </tr>
            {activeRows_2_2.map((r) => (
              <tr key={r.id}>
                <td className="border border-black text-center p-1 font-siemreap text-xs align-top">{r.id}</td>
                <td className="border border-black p-1 font-siemreap text-xs">{r.indicator}</td>
                <td className="border border-black p-1 font-siemreap text-xs text-justify align-top">{r.render(data)}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

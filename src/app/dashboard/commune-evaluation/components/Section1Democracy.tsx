import type { EvaluationData } from "@/lib/evaluation-schema";
import { CheckSquare, Square, SquareCheck } from "lucide-react";

const khmerDigits: Record<string, string> = {
  "0": "០", "1": "១", "2": "២", "3": "៣", "4": "៤",
  "5": "៥", "6": "៦", "7": "៧", "8": "៨", "9": "៩",
};

function toKhmerNum(value: string | undefined) {
  const text = (value || "").replace(/\d/g, (d) => khmerDigits[d]);
  return <span className="font-bold">{text}</span>;
}

function khmerIndex(i: number) {
  return String(i + 1).replace(/\d/g, (d) => khmerDigits[d]);
}

function present(val: unknown): boolean {
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "string") return val !== "";
  return val !== undefined && val !== null;
}

interface Section1Props {
  data: Partial<EvaluationData>;
}

// ── Item definitions for each sub-section ──

interface DataRow {
  indicator: string;
  render: (d: Partial<EvaluationData>) => React.ReactNode;
  fields: (keyof EvaluationData)[];
  flat?: boolean; // if true, render content directly without wrapping in <li>
}

const LEGACY_VOTER_FIELDS: (keyof EvaluationData)[] = [
  "registeredVotersNational2023",
  "registeredVotersCommune2022",
  "voterTurnoutNational2023",
  "voterTurnoutCommune2022",
  "violenceCasesNational2023",
  "violenceCasesCommune2022",
];

function getVoterRows(data: Partial<EvaluationData>): DataRow[] {
  const records = data.voterRecords ?? [];
  const hasNewData = records.length > 0 && records.some((r) => r.registeredVoters || r.voterTurnout || r.violenceCases);
  const hasLegacy = LEGACY_VOTER_FIELDS.some((f) => present(data[f] as string));

  if (hasNewData) {
    const flatRows: DataRow[] = [];
    for (const rec of records) {
      const electionLabel = rec.electionType === "national" ? "តំណាងរាស្ត្រ" : "ឃុំ សង្កាត់";
      if (present(rec.registeredVoters)) {
        flatRows.push({
          indicator: `ភាគរយចុះឈ្មោះបោះឆ្នោត${electionLabel} ${rec.year}`,
          render: () => <>ចំនួន {toKhmerNum(rec.registeredVoters)}% ប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោត{electionLabel} {toKhmerNum(rec.year)}</>,
          fields: ["voterRecords"],
        });
      }
      if (present(rec.voterTurnout)) {
        flatRows.push({
          indicator: `ភាគរយទៅបោះឆ្នោត${electionLabel} ${rec.year}`,
          render: () => <>ចំនួន {toKhmerNum(rec.voterTurnout)}% ប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោត{electionLabel} {toKhmerNum(rec.year)}</>,
          fields: ["voterRecords"],
        });
      }
      if (present(rec.violenceCases)) {
        flatRows.push({
          indicator: `ករណីហិង្សាបោះឆ្នោត${electionLabel} ${rec.year}`,
          render: () => <>ចំនួន {toKhmerNum(rec.violenceCases)} ករណីពាក់ព័ន្ធនឹងការបោះឆ្នោត{electionLabel} {toKhmerNum(rec.year)}</>,
          fields: ["voterRecords"],
        });
      }
    }
    return flatRows;
  }

  if (hasLegacy) {
    return [
      {
        indicator: "១. ភាគរយចំនួនប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតតំណាងរាស្ត្រ",
        render: (d) => <>ចំនួន {toKhmerNum(d.registeredVotersNational2023)}% ប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតតំណាងរាស្ត្រ២០២៣</>,
        fields: ["registeredVotersNational2023"],
      },
      {
        indicator: "២. ភាគរយចំនួនប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតឃុំ សង្កាត់",
        render: (d) => <>ចំនួន {toKhmerNum(d.registeredVotersCommune2022)}% ប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតឃុំ សង្កាត់២០២២</>,
        fields: ["registeredVotersCommune2022"],
      },
      {
        indicator: "៣. ភាគរយនៃចំនួនប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោតតំណាងរាស្ត្រ",
        render: (d) => <>ចំនួន {toKhmerNum(d.voterTurnoutNational2023)}% ប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោតតំណាងរាស្ត្រ២០២៣</>,
        fields: ["voterTurnoutNational2023"],
      },
      {
        indicator: "៤. ភាគរយនៃចំនួនប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោតឃុំ សង្កាត់",
        render: (d) => <>ចំនួន {toKhmerNum(d.voterTurnoutCommune2022)} ប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោតឃុំ សង្កាត់២០២២</>,
        fields: ["voterTurnoutCommune2022"],
      },
      {
        indicator: "៥. ករណីអំពើហិង្សាពាក់ព័ន្ធនឹងការបោះឆ្នោតតំណាងរាស្ត្រឆ្នាំ២០២៣",
        render: (d) => <>ចំនួន {toKhmerNum(d.violenceCasesNational2023)} ករណីពាក់ព័ន្ធនឹងការបោះឆ្នោតតំណាងរាស្ត្រ២០២៣</>,
        fields: ["violenceCasesNational2023"],
      },
      {
        indicator: "៦. ករណីអំពើហិង្សាពាក់ព័ន្ធនឹងការបោះឆ្នោតឃុំ សង្កាត់២០២២",
        render: (d) => <>ចំនួន {toKhmerNum(d.violenceCasesCommune2022)} ករណីពាក់ព័ន្ធនឹងការបោះឆ្នោតបោះឆ្នោតឃុំ សង្កាត់២០២២</>,
        fields: ["violenceCasesCommune2022"],
      },
    ];
  }

  return [];
}

const rows_1_1_3: DataRow[] = [
  {
    indicator: "១. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ",
    render: (d) => <>១.១. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ {toKhmerNum(d.highSchoolDiploma)} នាក់</>,
    fields: ["highSchoolDiploma"],
  },
  {
    indicator: "២. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មាន បរិញ្ញាបត្ររង",
    render: (d) => <>១.២. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្ររង {toKhmerNum(d.associateDegree)} នាក់</>,
    fields: ["associateDegree"],
  },
  {
    indicator: "៣. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្រ",
    render: (d) => <>១.៣. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្រ {toKhmerNum(d.bachelorDegree)} នាក់</>,
    fields: ["bachelorDegree"],
  },
  {
    indicator: "៤. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្រជាន់ខ្ពស់ឡើង",
    render: (d) => <>១.៤. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្រជាន់ខ្ពស់ឡើង {toKhmerNum(d.masterDegree)} នាក់</>,
    fields: ["masterDegree"],
  },
  {
    indicator: "៥. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ដែលត្រូវដកចេញពីមុខតំណែងដោយសារ ឬ ទទួលទណ្ឌកម្មវិន័យពាក់ព័ន្ធអាប្បកិរិយា មិនស្អាតស្អំ ការមិនគោរពច្បាប់ ការរើសអើង",
    render: (d) => <>២. ចំនួន {toKhmerNum(d.removedCouncilMembers)} នាក់</>,
    fields: ["removedCouncilMembers"],
  },
];

const rows_1_1_4: DataRow[] = [
  {
    indicator: "១. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ និងថ្នាក់ដឹកនាំភូមិ",
    flat: true,
    render: (d) => (
      <>
        <li>១.១. ចំនួនសរុបនៃសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ {toKhmerNum(d.totalCouncilMembers)}</li>
        {present(d.femaleCouncilMembers) && <li>១.២. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាស្រ្តី {toKhmerNum(d.femaleCouncilMembers)}</li>}
        {present(d.youthCouncilMembers) && <li>១.៣. ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាយុវជន (ក្រោម៣៥ឆ្នាំ) {toKhmerNum(d.youthCouncilMembers)}</li>}
        {present(d.totalClerks) && <li>១.៤. ចំនួនសរុបស្មៀនឃុំ សង្កាត់ {toKhmerNum(d.totalClerks)} នាក់</li>}
        {present(d.femaleClerks) && <li>១.៥. ចំនួនសរុបស្មៀនឃុំ សង្កាត់ជាស្រ្តី {toKhmerNum(d.femaleClerks)} នាក់</li>}
        {present(d.youthClerks) && <li>១.៦. ចំនួនសរុបស្មៀនឃុំ សង្កាត់ជាយុវជន (ក្រោម៣៥ឆ្នាំ) {toKhmerNum(d.youthClerks)} នាក់</li>}
        {present(d.totalVillageLeaders) && <li>១.៧. ចំនួនសរុបថ្នាក់ដឹកនាំភូមិ {toKhmerNum(d.totalVillageLeaders)} នាក់</li>}
        {present(d.femaleVillageLeaders) && <li>១.៨. ចំនួនថ្នាក់ដឹកនាំភូមិជាស្រ្តី {toKhmerNum(d.femaleVillageLeaders)} នាក់</li>}
        {present(d.youthVillageLeaders) && <li>១.៩. ចំនួនថ្នាក់ដឹកនាំភូមិជាយុវជន (ក្រោម៣៥ឆ្នាំ) {toKhmerNum(d.youthVillageLeaders)} នាក់</li>}
      </>
    ),
    fields: ["totalCouncilMembers", "femaleCouncilMembers", "youthCouncilMembers", "totalClerks", "femaleClerks", "youthClerks", "totalVillageLeaders", "femaleVillageLeaders", "youthVillageLeaders"],
  },
];

const rows_1_2_1: DataRow[] = [
  {
    indicator: "ករណីរំលោភសិទ្ធិ ជំនឿសាសនា សិទ្ធិមនុស្សពាក់ព័ន្ធនឹងការប្រកាន់ពូជសាសន៍ ពណ៌សម្បុរ ភេទ ភាសា និន្នាការនយោបាយ អតីតកាល ដើមកំណើតជាតិ ឋានៈសង្គម ធនធាន ឬស្ថានភាពផ្សេងទៀត",
    render: (d) => <>ចំនួនករណីរំលោភសិទ្ធិមនុស្សពាក់ព័ន្ធនឹងការប្រកាន់ពូជសាសន៍ ពណ៌សម្បុរ ភេទ ភាសា ជំនឿ សាសនា និន្នាការនយោបាយ អតីតកាល ដើមកំណើតជាតិ ឋានៈសង្គម ធនធាន ឬ ស្ថានភាពផ្សេងទៀត {toKhmerNum(d.humanRightsViolations)}</>,
    fields: ["humanRightsViolations"],
  },
];

const rows_1_2_2: DataRow[] = [
  {
    indicator: "៣. ចំនួនប្រជាពលរដ្ឋ ដែលបានចូលរួមវេទិកាសាធារណៈរបស់ឃុំ សង្កាត់",
    render: (d) => <>ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមវេទិកាសាធារណៈរបស់ឃុំ សង្កាត់ {toKhmerNum(d.publicForumParticipants)} នាក់</>,
    fields: ["publicForumParticipants"],
  },
];

const rows_1_2_3: DataRow[] = [
  {
    indicator: "១. ចំនួនប្រជាពលរដ្ឋ ដែលបានចូលរួមកិច្ចប្រជុំក្រុមប្រឹក្សាឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.councilMeetingParticipants)} នាក់</>,
    fields: ["councilMeetingParticipants"],
  },
  {
    indicator: "២. ចំនួនប្រជាពលរដ្ឋចូលរួម ក្នុងដំណើរការរៀបចំផែនការអភិវឌ្ឍ និងកម្មវិធីវិនិយោគ ៣ឆ្នាំរំកិលរបស់ឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.planningProcessParticipants)} នាក់</>,
    fields: ["planningProcessParticipants"],
  },
  {
    indicator: "៣. ឃុំ សង្កាត់ដែលបានបង្កើតគណៈកម្មការគ្រប់គ្រងគម្រោងដែលមានការចូលរួមពីប្រជាពលរដ្ឋ (មាន ឬមិនមាន)",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4">
          {d.hasProjectManagementCommittee === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1">
          {d.hasProjectManagementCommittee === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasProjectManagementCommittee"],
  },
];

const rows_1_2_4: DataRow[] = [
  {
    indicator: "១. ចំនួនប្រជាពលរដ្ឋដែលបានទទួលសេវារដ្ឋបាល ឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.administrativeServiceRecipients)} នាក់</>,
    fields: ["administrativeServiceRecipients"],
  },
  {
    indicator: "២. ចំនួនគម្រោង (សេវាសង្គម និងហេដ្ឋារចនាសម្ព័ន្ធ) បានរៀបចំដោយឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.communityProjectsCount)} គម្រោង</>,
    fields: ["communityProjectsCount"],
  },
];

const rows_1_2_5: DataRow[] = [
  {
    indicator: "១. សំណើ សំណូមពរ ក្តីកង្វល់ និងបញ្ហាប្រឈមនានារបស់ប្រជាពលរដ្ឋពាក់ព័ន្ធនឹងការផ្តល់សេវា",
    render: (d) => <>ចំនួន {toKhmerNum(d.serviceRequestCases)} ករណី</>,
    fields: ["serviceRequestCases"],
  },
  {
    indicator: "២. ការសម្របសម្រួលដោះស្រាយសំណើ សំណូមពរ ក្តីកង្វល់ និងបញ្ហាប្រឈមនានា",
    render: (d) => <>ចំនួន {toKhmerNum(d.serviceResolvedCases)} ករណី</>,
    fields: ["serviceResolvedCases"],
  },
];

const rows_1_3_1: DataRow[] = [
  {
    indicator: "វិវាទពាក់ព័ន្ធនឹងជំនឿ ប្រពៃណី និងសាសនាផ្សេងៗគ្នានៅមូលដ្ឋាន",
    render: (d) => <>ចំនួន {toKhmerNum(d.religiousDisputeCases)} ករណី</>,
    fields: ["religiousDisputeCases"],
  },
];

const rows_1_3_2: DataRow[] = [
  {
    indicator: "១. ករណីវិវាទរវាងប្រជាពលរដ្ឋនិងប្រជាពលរដ្ឋពាក់ព័ន្ធនឹងនិន្នាការនយោបាយ",
    render: (d) => <>ចំនួន {toKhmerNum(d.politicalDisputeCases)} ករណី</>,
    fields: ["politicalDisputeCases"],
  },
];

const rows_1_3_3: DataRow[] = [
  {
    indicator: "ឃុំ សង្កាត់ដែលមានមណ្ឌល ទីធ្លាសាធារណៈ ឬអគារវប្បធម៌ក្នុងសហគមន៍ដែលសាធារណជនអាចមានការជួបជុំ ការសម្តែង និងការចែករំលែកនូវសិល្បៈ ប្រពៃណី ទំនៀមទម្លាប់ សាសនា និងចំណេះដឹងផ្សេងៗ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4">
          {d.hasCommunityCulturalSpace === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1">
          {d.hasCommunityCulturalSpace === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasCommunityCulturalSpace"],
  },
];

// ── Helper to filter and re-index rows ──

function filterRows(rows: DataRow[], data: Partial<EvaluationData>): DataRow[] {
  return rows.filter((r) => r.fields.some((f) => present(data[f])));
}

// ── Section builder ──

function SubSectionRow({ id, indicator, data, rows }: { id: string; indicator?: string; data: Partial<EvaluationData>; rows: DataRow[] }) {
  const active = filterRows(rows, data);
  if (active.length === 0) return null;
  return (
    <>
      {indicator && (
        <tr>
          <td className="border border-black text-center p-1 font-siemreap text-xs">{id}</td>
          <td className="border border-black p-1 font-siemreap text-xs" colSpan={2}>{indicator}</td>
        </tr>
      )}
      <tr>
        <td className="border border-black text-center p-1 font-siemreap text-xs">{id}</td>
        <td className="border border-black font-siemreap text-xs">
          <ol className="p-1 space-y-1 text-wrap">
            {active.map((r, i) => (
              <li key={i}>{r.flat ? r.indicator : `${khmerIndex(i)}. ${r.indicator.replace(/^[\d១២៣៤៥៦៧៨៩០]+\.\s*/, "")}`}</li>
            ))}
          </ol>
        </td>
        <td className="border border-black p-1 font-siemreap text-xs text-justify align-top">
          {active.length === 1 && active[0].flat ? (
            <ol className="p-1 space-y-1 text-wrap">{active[0].render(data)}</ol>
          ) : (
            <ol className="p-1 space-y-1 text-wrap">
              {active.map((r, i) => (
                r.flat ? <li key={i}>{r.render(data)}</li> : <li key={i}>{khmerIndex(i)}. {r.render(data)}</li>
              ))}
            </ol>
          )}
        </td>
      </tr>
    </>
  );
}

// ── Main component ──

export default function Section1Democracy({ data }: Section1Props) {
  const voterRows = getVoterRows(data);
  const hasSection_1_1 = voterRows.length > 0 || filterRows(rows_1_1_3, data).length > 0 || filterRows(rows_1_1_4, data).length > 0;
  const hasSection_1_2 = filterRows(rows_1_2_1, data).length > 0 || filterRows(rows_1_2_2, data).length > 0 || filterRows(rows_1_2_3, data).length > 0 || filterRows(rows_1_2_4, data).length > 0 || filterRows(rows_1_2_5, data).length > 0;
  const hasSection_1_3 = filterRows(rows_1_3_1, data).length > 0 || filterRows(rows_1_3_2, data).length > 0 || filterRows(rows_1_3_3, data).length > 0;

  return (
    <table className="w-full border-collapse border border-black">
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
          <td className="border border-black text-center p-1 font-siemreap text-xs">១</td>
          <td className="border border-black p-1 font-siemreap text-xs" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលលើកកម្ពស់លទ្ធិប្រជាធិបតេយ្យនៅមូលដ្ឋាន និងសិទ្ធិសេរីភាពរបស់ប្រជាជនគ្រប់រូប ប្រជាជនរស់នៅដោយសុខដុមរមនា
          </td>
        </tr>

        {hasSection_1_1 && (
          <>
            <tr>
              <td className="border border-black text-center p-1 font-siemreap text-xs">១.១</td>
              <td className="border border-black p-1 font-siemreap text-xs" colSpan={2}>
                ការលើកកម្ពស់លទ្ធិប្រជាធិបតេយ្យនៅមូលដ្ឋាន
              </td>
            </tr>
            <SubSectionRow id="១.១.២" data={data} rows={voterRows} />
            <SubSectionRow id="១.១.៣" indicator="កម្រិតសមត្ថភាពរបស់ក្រុមប្រឹក្សាឃុំ សង្កាត់" data={data} rows={rows_1_1_3} />
            <SubSectionRow id="១.១.៤" data={data} rows={rows_1_1_4} />
          </>
        )}

        {hasSection_1_2 && (
          <>
            <tr data-pb="true">
              <td className="border border-black text-center p-1 font-siemreap text-xs">១.២</td>
              <td className="border border-black p-1 font-siemreap text-xs" colSpan={2}>
                ការលើកកម្ពស់សិទ្ធិសេរីភាពរបស់ប្រជាពលរដ្ឋ
              </td>
            </tr>
            <SubSectionRow id="១.២.១" data={data} rows={rows_1_2_1} />
            <SubSectionRow id="១.២.២" data={data} rows={rows_1_2_2} />
            <SubSectionRow id="១.២.៣" data={data} rows={rows_1_2_3} />
            <SubSectionRow id="១.២.៤" data={data} rows={rows_1_2_4} />
            <SubSectionRow id="១.២.៥" data={data} rows={rows_1_2_5} />
          </>
        )}

        {hasSection_1_3 && (
          <>
            <tr data-pb="true">
              <td className="border border-black text-center p-1 font-siemreap text-xs">១.៣</td>
              <td colSpan={2} className="border border-black p-1 font-siemreap text-xs">
                ភាពសុខដុមរមនាក្នុងសង្គម
              </td>
            </tr>
            <SubSectionRow id="១.៣.១" data={data} rows={rows_1_3_1} />
            <SubSectionRow id="១.៣.២" data={data} rows={rows_1_3_2} />
            <SubSectionRow id="១.៣.៣" data={data} rows={rows_1_3_3} />
          </>
        )}
      </tbody>
    </table>
  );
}

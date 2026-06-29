import type { EvaluationData } from "@/features/commune-evaluation/schema";
import { renderEditCell, type DataRowEditMeta } from "./EditableCell";

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
  editable?: boolean;
  onUpdate?: (field: keyof EvaluationData, value: string) => void;
}

interface DataRow extends DataRowEditMeta {
  id: string;
  indicator: string;
  render: (d: Partial<EvaluationData>) => React.ReactNode;
  fields: (keyof EvaluationData)[];
}

const sub_1_1_rows: DataRow[] = [
  {
    id: "១.១.១",
    indicator: "ភាគរយចំនួនប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតត្រឹមឆ្នាំ២០២២",
    render: (d) => <>ចំនួន {toKhmerNum(d.voterRegistration2022Number)} ភាគរយ {toKhmerNum(d.voterRegistration2022Pct)}%</>,
    fields: ["voterRegistration2022Number", "voterRegistration2022Pct"],
    inputType: "number",
    inputLabels: ["ចំនួន", "ភាគរយ"],
  },
  {
    id: "១.១.២",
    indicator: "ភាគរយចំនួនប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតឆ្នាំត្រឹម២០២៥",
    render: (d) => <>ចំនួន {toKhmerNum(d.voterRegistration2025Number)} ភាគរយ {toKhmerNum(d.voterRegistration2025Pct)}%</>,
    fields: ["voterRegistration2025Number", "voterRegistration2025Pct"],
    inputType: "number",
    inputLabels: ["ចំនួន", "ភាគរយ"],
  },
  {
    id: "១.១.៣",
    indicator: "ភាគរយនៃចំនួនប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោត បានទៅបោះឆ្នោតឃុំ សង្កាត់ឆ្នាំ២០១៧",
    render: (d) => <>ចំនួន {toKhmerNum(d.voterTurnout2017Number)} ភាគរយ {toKhmerNum(d.voterTurnout2017Pct)}%</>,
    fields: ["voterTurnout2017Number", "voterTurnout2017Pct"],
    inputType: "number",
    inputLabels: ["ចំនួន", "ភាគរយ"],
  },
  {
    id: "១.១.៤",
    indicator: "ភាគរយនៃចំនួនប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោត បានទៅបោះឆ្នោតឃុំ សង្កាត់ឆ្នាំ២០២២",
    render: (d) => <>ចំនួន {toKhmerNum(d.voterTurnout2022Number)} ភាគរយ {toKhmerNum(d.voterTurnout2022Pct)}%</>,
    fields: ["voterTurnout2022Number", "voterTurnout2022Pct"],
    inputType: "number",
    inputLabels: ["ចំនួន", "ភាគរយ"],
  },
  {
    id: "១.១.៥",
    indicator: "ករណីអំពើហិង្សាពាក់ព័ន្ធនឹងការបោះឆ្នោតតំណាងរាស្រ្តឆ្នាំ២០២៣",
    render: (d) => <>ចំនួន {toKhmerNum(d.voteViolenceNational2023)} ករណី</>,
    fields: ["voteViolenceNational2023"],
    inputType: "number",
  },
  {
    id: "១.១.៦",
    indicator: "ករណីអំពើហិង្សាពាក់ព័ន្ធនឹងការបោះឆ្នោតឃុំ សង្កាត់២០២២",
    render: (d) => <>ចំនួន {toKhmerNum(d.voteViolenceCommune2022)} ករណី</>,
    fields: ["voteViolenceCommune2022"],
    inputType: "number",
  },
  {
    id: "១.១.៧",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (រាប់តែមាជិកមកពីគណបក្សប្រជាជនកម្ពុជា)",
    render: (d) => <>ចំនួន {toKhmerNum(d.cpdHighSchoolDiploma)} នាក់</>,
    fields: ["cpdHighSchoolDiploma"],
    inputType: "number",
  },
  {
    id: "១.១.៨",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញបត្ររង (រាប់តែមាជិកមកពីគណបក្សប្រជាជនកម្ពុជា)",
    render: (d) => <>ចំនួន {toKhmerNum(d.cpdAssociateDegree)} នាក់</>,
    fields: ["cpdAssociateDegree"],
    inputType: "number",
  },
  {
    id: "១.១.៩",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញបត្រ (រាប់តែមាជិកមកពីគណបក្សប្រជាជនកម្ពុជា)",
    render: (d) => <>ចំនួន {toKhmerNum(d.cpdBachelorDegree)} នាក់</>,
    fields: ["cpdBachelorDegree"],
    inputType: "number",
  },
  {
    id: "១.១.១០",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញបត្រជាន់ខ្ពស់ឡើង(រាប់តែមាជិកមកពីគណបក្សប្រជាជនកម្ពុជា)",
    render: (d) => <>ចំនួន {toKhmerNum(d.cpdMasterDegree)} នាក់</>,
    fields: ["cpdMasterDegree"],
    inputType: "number",
  },
  {
    id: "១.១.១១",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ដែលត្រូវដកចេញពីមុខតំណែងដោយសារ ឬទទួលទណ្ឌកម្មវិន័យពាក់ព័ន្ធអាកប្បកិរិយា មិនស្អាតស្អំ ការមិនគោរពច្បាប់ ការរើសអើង",
    render: (d) => <>ចំនួន {toKhmerNum(d.removedCouncilMembers)} នាក់</>,
    fields: ["removedCouncilMembers"],
    inputType: "number",
  },
  {
    id: "១.១.១២",
    indicator: "ចំនួនសរុបនៃសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់(រាប់តែមាជិកមកពីគណបក្សប្រជាជនកម្ពុជា)",
    render: (d) => <>ចំនួន {toKhmerNum(d.cpdTotalCouncilMembers)} នាក់</>,
    fields: ["cpdTotalCouncilMembers"],
    inputType: "number",
  },
  {
    id: "១.១.១៣",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាស្រ្តី (រាប់តែមាជិកមកពីគណបក្សប្រជាជនកម្ពុជា)",
    render: (d) => <>ចំនួន {toKhmerNum(d.cpdFemaleCouncilMembers)} នាក់</>,
    fields: ["cpdFemaleCouncilMembers"],
    inputType: "number",
  },
  {
    id: "១.១.១៤",
    indicator: "ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាយុវជន (ក្រោម៤៥ឆ្នាំ)",
    render: (d) => <>ចំនួន {toKhmerNum(d.youthCouncilMembers)} នាក់</>,
    fields: ["youthCouncilMembers"],
    inputType: "number",
  },
  {
    id: "១.១.១៥",
    indicator: "ចំនួនសរុបស្មៀនឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.totalClerks)} នាក់</>,
    fields: ["totalClerks"],
    inputType: "number",
  },
  {
    id: "១.១.១៦",
    indicator: "ចំនួនសរុបស្មៀនឃុំ សង្កាត់ជាស្ត្រី",
    render: (d) => <>ចំនួន {toKhmerNum(d.femaleClerks)} នាក់</>,
    fields: ["femaleClerks"],
    inputType: "number",
  },
  {
    id: "១.១.១៧",
    indicator: "ចំនួនសរុបស្មៀនឃុំ សង្កាត់ជាជាយុវជន (ក្រោម៤៥ឆ្នាំ)",
    render: (d) => <>ចំនួន {toKhmerNum(d.youthClerks)} នាក់</>,
    fields: ["youthClerks"],
    inputType: "number",
  },
  {
    id: "១.១.១៨",
    indicator: "ចំនួនសរុបថ្នាក់ដឹកនាំភូមិ",
    render: (d) => <>ចំនួន {toKhmerNum(d.totalVillageLeaders)} នាក់</>,
    fields: ["totalVillageLeaders"],
    inputType: "number",
  },
  {
    id: "១.១.១៩",
    indicator: "ចំនួនថ្នាក់ដឹកនាំភូមិជាស្រ្តី",
    render: (d) => <>ចំនួន {toKhmerNum(d.femaleVillageLeaders)} នាក់</>,
    fields: ["femaleVillageLeaders"],
    inputType: "number",
  },
  {
    id: "១.១.២០",
    indicator: "ចំនួនថ្នាក់ដឹកនាំភូមិជាជាយុវជន (ក្រោម៤៥ឆ្នាំ)",
    render: (d) => <>ចំនួន {toKhmerNum(d.youthVillageLeaders)} នាក់</>,
    fields: ["youthVillageLeaders"],
    inputType: "number",
  },
];

const sub_1_2_rows: DataRow[] = [
  {
    id: "១.២.១",
    indicator: "ចំនួនករណីរំលោភសិទ្ធិមនុស្សពាក់ព័ន្ធនឹងការប្រកាន់ពូជសាសន៍ ពណ៌សម្បុរ ភេទ ភាសា ជំនឿសាសនា និន្នាការនយោបាយ អតីតកាល ដើមកំណើតជាតិ ឋានៈសង្គម ធនធាន ឬស្ថានភាពឯទៀត",
    render: (d) => <>ចំនួន {toKhmerNum(d.humanRightsViolations)} ករណី</>,
    fields: ["humanRightsViolations"],
    inputType: "number",
  },
  {
    id: "១.២.២",
    indicator: "ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមវេទិកាសាធារណៈរបស់ឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.publicForumParticipants)} នាក់</>,
    fields: ["publicForumParticipants"],
    inputType: "number",
  },
  {
    id: "១.២.៣",
    indicator: "ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមកិច្ចប្រជុំក្រុមប្រឹក្សាឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.councilMeetingParticipants)} នាក់</>,
    fields: ["councilMeetingParticipants"],
    inputType: "number",
  },
  {
    id: "១.២.៤",
    indicator: "ចំនួនប្រជាពលរដ្ឋចូលរួមក្នុងដំណើរការរៀបចំផែនការអភិវឌ្ឍ និងកម្មវិធីវិនិយោគ៣ឆ្នាំរំកិលរបស់ឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.planningProcessParticipants)} នាក់</>,
    fields: ["planningProcessParticipants"],
    inputType: "number",
  },
  {
    id: "១.២.៥",
    indicator: "ឃុំ សង្កាត់ដែលបានបង្កើតគណកម្មការគ្រប់គ្រងគម្រោងដែលមានការចូលរួមពីប្រជាពលរដ្ឋ",
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
    inputType: "select",
    inputOptions: [
      { value: "មាន", label: "មាន" },
      { value: "មិនមាន", label: "មិនមាន" },
    ],
  },
  {
    id: "១.២.៦",
    indicator: "ចំនួនប្រជាពលរដ្ឋដែលបានទទួលសេវារដ្ឋបាលឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.administrativeServiceRecipients)} នាក់</>,
    fields: ["administrativeServiceRecipients"],
    inputType: "number",
  },
  {
    id: "១.២.៧",
    indicator: "ចំនួនគម្រោង (សេវាសង្គម និងហេដ្ឋារចនាសម្ព័ន្ធ) ដែលបានរៀបចំ និងអនុវត្តដោយឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.communityProjectsCount)} គម្រោង</>,
    fields: ["communityProjectsCount"],
    inputType: "number",
  },
  {
    id: "១.២.៨",
    indicator: "សំណើ សំណូមពរ ក្តីកង្វល់ និងបញ្ហាប្រឈមនានារបស់ប្រជាពលរដ្ឋពាក់ព័ន្ធនឹងការផ្តល់សេវា",
    render: (d) => <>ចំនួន {toKhmerNum(d.serviceRequestCases)} ករណី</>,
    fields: ["serviceRequestCases"],
    inputType: "number",
  },
  {
    id: "១.២.៩",
    indicator: "ការសម្រុះសម្រួលដោះស្រាយសំណើ សំណូមពរ ក្តីកង្វល់ និងបញ្ហាប្រឈមនានា",
    render: (d) => <>ចំនួន {toKhmerNum(d.serviceResolvedCases)} ករណី</>,
    fields: ["serviceResolvedCases"],
    inputType: "number",
  },
];

const sub_1_3_rows: DataRow[] = [
  {
    id: "១.៣.១",
    indicator: "វិវាទពាក់ព័ន្ធនឹងជំនឿ ប្រពៃណី និងសាសនាផ្សេងៗគ្នានៅមូលដ្ឋាន",
    render: (d) => <>ចំនួន {toKhmerNum(d.religiousDisputeCases)} ករណី</>,
    fields: ["religiousDisputeCases"],
  },
  {
    id: "១.៣.២",
    indicator: "ករីណវិវាទរវាងប្រជាពលរដ្ឋនិងប្រជាពលរដ្ឋពាក់ព័ន្ធនឹងនិន្នាការ នយោបាយ",
    render: (d) => <>ចំនួន {toKhmerNum(d.politicalDisputeCases)} ករណី</>,
    fields: ["politicalDisputeCases"],
  },
  {
    id: "១.៣.៣",
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

function filterRows(rows: DataRow[], data: Partial<EvaluationData>): DataRow[] {
  return rows.filter((r) => r.fields.some((f) => present(data[f])));
}

function IndicatorRow({ row, data }: { row: DataRow; data: Partial<EvaluationData> }) {
  return (
    <tr>
      <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">{row.id}</td>
      <td className="border border-black p-1 font-siemreap text-xs">{row.indicator}</td>
      <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">{row.render(data)}</td>
    </tr>
  );
}

function SubSection({ id, label, rows, data, pageBreak }: { id: string; label: string; rows: DataRow[]; data: Partial<EvaluationData>; pageBreak?: boolean }) {
  const active = filterRows(rows, data);
  if (active.length === 0) return null;
  return (
    <>
      <tr data-pb={pageBreak ? "true" : undefined}>
        <td className="border border-black text-center p-1 font-siemreap text-xs bg-[#E8EDF8]">{id}</td>
        <td className="border border-black p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>{label}</td>
      </tr>
      {active.map((row) => (
        <IndicatorRow key={row.id} row={row} data={data} />
      ))}
    </>
  );
}

export default function Section1Democracy({ data }: Section1Props) {
  const hasSection_1_1 = filterRows(sub_1_1_rows, data).length > 0;
  const hasSection_1_2 = filterRows(sub_1_2_rows, data).length > 0;
  const hasSection_1_3 = filterRows(sub_1_3_rows, data).length > 0;

  return (
    <table className="w-full border-collapse border border-black border-t-0">
      <thead>
        <tr>
          <th className="border border-black w-20 p-1 text-center font-moul text-xs">ល.រ</th>
          <th className="border border-black p-1 font-moul text-xs">សូចនាករ</th>
          <th className="border border-black w-[45%] p-1 font-moul text-xs">ទិន្នន័យ ឬព័ត៌មានលទ្ធផលនៃការអនុវត្ត (គិតចាប់ពីដើមឆ្នាំ២០២២ ដល់ខែមិថុនា ឆ្នាំ២០២៦)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black text-center p-1 font-siemreap text-xs bg-[#B4C6E7]">១</td>
          <td className="border border-black p-1 font-siemreap text-xs bg-[#B4C6E7]" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលលើកកម្ពស់លទ្ធិប្រជាធិបតេយ្យនៅមូលដ្ឋាន និងសិទ្ធិសេរីភាពរបស់ប្រជាជនគ្រប់ៗរូប ប្រជាជនបានរស់នៅដោយសុខដុមរមនា
          </td>
        </tr>
        {hasSection_1_1 && (
          <SubSection id="១.១" label="ការលើកកម្ពស់លទ្ធិប្រជាធិបតេយ្យនៅមូលដ្ឋាន" rows={sub_1_1_rows} data={data} />
        )}
        {hasSection_1_2 && (
          <SubSection id="១.២" label="ការលើកកម្ពស់សិទ្ធិសេរីភាពរបស់ប្រជាពលរដ្ឋ" rows={sub_1_2_rows} data={data} pageBreak />
        )}
        {hasSection_1_3 && (
          <SubSection id="១.៣" label="ភាពសុខដុមរមនាក្នុងសង្គម" rows={sub_1_3_rows} data={data} pageBreak />
        )}
      </tbody>
    </table>
  );
}

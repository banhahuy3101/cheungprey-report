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

function present(val: unknown): boolean {
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "string") return val !== "";
  return val !== undefined && val !== null;
}

interface Section7Props {
  data: Partial<EvaluationData>;
  editable?: boolean;
  onUpdate?: (field: keyof EvaluationData, value: string) => void;
}

interface DataRow extends DataRowEditMeta {
  id: string;
  indicator: string;
  render: (d: Partial<EvaluationData>) =>   React.ReactNode;
  fields: (keyof EvaluationData)[];
}

function filterRows(rows: DataRow[], data: Partial<EvaluationData>, editable?: boolean): DataRow[] {
  if (editable) return rows;
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

const rows_7_1: DataRow[] = [
  {
    id: "៧.១.១",
    indicator: "ចំនួនសំណើសំណូមពរ និងក្តីកង្វល់នានារបស់ប្រជាពលរដ្ឋដែលក្រុមប្រឹក្សាឃុំ សង្កាត់ពុំអាចដោះស្រាយបានជូនមករដ្ឋបាលក្រុង ស្រុក ខណ្ឌ រដ្ឋបាលរាជធានី ខេត្ត និងក្រសួង ស្ថាប័នថ្នាក់ជាតិ ដើម្បីដោះស្រាយ",
    render: (d) => <>ចំនួន {toKhmerNum(d.citizenRequestsEscalated)} ករណី</>,
    fields: ["citizenRequestsEscalated"],
  },
];

const rows_7_2: DataRow[] = [
  {
    id: "៧.២.១",
    indicator: "ក្រុមប្រឹក្សាឃុំ សង្កាត់បានចូលរួមក្នុងគណៈគ្រប់គ្រងសាលារៀន",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasCouncilInSchoolManagement === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasCouncilInSchoolManagement === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasCouncilInSchoolManagement"],
  },
  {
    id: "៧.២.២",
    indicator: "ចំនួនមត្តេយ្យសហគមន៍ក្នុងឃុំ សង្កាត់នីមួយៗ",
    render: (d) => <>ចំនួន {toKhmerNum(d.communityPreschoolsCount)} សាលាមត្តេយ្យសហគមន៍</>,
    fields: ["communityPreschoolsCount"],
  },
  {
    id: "៧.២.៣",
    indicator: "ឃុំ សង្កាត់ដែលបានគ្រប់គ្រងសហគមន៍តំបន់ការពារធម្មជាតិ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasManagedProtectedArea === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasManagedProtectedArea === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasManagedProtectedArea"],
  },
  {
    id: "៧.២.៤",
    indicator: "ចំនួនគម្រោងរបស់ឃុំ សង្កាត់ដែលបានបញ្ជ្រាបភាពធន់នឹងការប្រែប្រួលអាកាសធាតុទៅក្នុងប្រព័ន្ធគ្រប់គ្រងការងារ ការផ្ដល់សេវាសាធារណៈ និងការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធមូលដ្ឋាន",
    render: (d) => <>ចំនួន {toKhmerNum(d.climateResilienceProjects)} គម្រោង</>,
    fields: ["climateResilienceProjects"],
  },
  {
    id: "៧.២.៥",
    indicator: "ឃុំ សង្កាត់បានជំរុញការផ្សព្វផ្សាយ ដើម្បីបង្កើនការយល់ដឹងដល់ប្រជាពលរដ្ឋអំពីមូលហេតុនិងផលប៉ះពាល់នៃការប្រែប្រួលអាកាសធាតុ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasClimateChangeAwareness === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasClimateChangeAwareness === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasClimateChangeAwareness"],
  },
  {
    id: "៧.២.៦",
    indicator: "ឃុំ សង្កាត់បានចូលរួមក្នុងគណៈកម្មការគ្រប់គ្រងមណ្ឌលសុខភាព",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasCouncilInHealthManagement === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasCouncilInHealthManagement === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasCouncilInHealthManagement"],
  },
  {
    id: "៧.២.៧",
    indicator: "ឃុំ សង្កាត់បានអនុវត្តមុខងារ និងការទទួលខុសត្រូវលើការងារកិច្ចការពារកុមារ និងគ្រប់គ្រងសេវាថែទាំកុមារដែលមានពិការភាព គ្មានទីពឹង និងក្រុមកុមាររងគ្រោះ និងងាយរងគ្រោះផ្សេងៗទៀតនៅក្នុងសហគមន៍",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasChildProtectionServices === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasChildProtectionServices === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasChildProtectionServices"],
  },
  {
    id: "៧.២.៨",
    indicator: "ឃុំ សង្កាត់ដែលបានចូលរួមគ្រប់គ្រងសំរាម សំណង់រឹង និងបញ្ហាបរិស្ថានផ្សេងទៀតក្នុងមូលដ្ឋានរបស់ខ្លួន",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasWasteManagement === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasWasteManagement === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasWasteManagement"],
  },
  {
    id: "៧.២.៩",
    indicator: "ឃុំ សង្កាត់ដែលបានចូលរួមគ្រប់គ្រងសំរាម សំណង់រឹង និងបញ្ហាបរិស្ថានផ្សេងទៀតក្នុងមូលដ្ឋានរបស់ខ្លួនបានដូចជា",
    render: (d) => (
      <div className="whitespace-pre-line min-h-[3rem]">
        {toKhmerNum(d.wasteManagementDetails)}
      </div>
    ),
    fields: ["wasteManagementDetails"],
  },
  {
    id: "៧.២.១០",
    indicator: "ឃុំ សង្កាត់បានបង្កើត និងគ្រប់គ្រងផ្សារសហគមន៍នានា ដើម្បីបង្កលក្ខណៈងាយស្រួលក្នុងការទិញលក់ទំនិញ និងផលិតផលនៅតាមមូលដ្ឋាន",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasManagedCommunityMarket === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasManagedCommunityMarket === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasManagedCommunityMarket"],
  },
  {
    id: "៧.២.១១",
    indicator: "ចំនួនប្រជាពលរដ្ឋដែលជួបប្រទះនឹងបញ្ហាប្រឈមនានាពាក់ព័ន្ធនឹងគ្រោះមហន្តរាយ និងជំងឺឆ្លងរាតត្បាតនានាដែលជួយដោះស្រាយដោយឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.disasterAffectedCitizens)} នាក់</>,
    fields: ["disasterAffectedCitizens"],
  },
  {
    id: "៧.២.១២",
    indicator: "ឃុំ សង្កាត់ដែលបានរៀបចំ និងអនុវត្តគម្រោង/សកម្មភាពផ្គត់ផ្គង់ទឹកស្អាត និងអនាម័យនៅក្នុងឃុំ សង្កាត់",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasCleanWaterSanitation === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasCleanWaterSanitation === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasCleanWaterSanitation"],
  },
  {
    id: "៧.២.១៣",
    indicator: "ចំនួនគម្រោងផ្គត់ផ្គង់ទឹកស្អាតក្នុងឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.cleanWaterProjects)} គម្រោង</>,
    fields: ["cleanWaterProjects"],
  },
  {
    id: "៧.២.១៤",
    indicator: "ចំនួនគម្រោងកសាងបង្គន់អនាម័យក្នុងឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.toiletConstructionProjects)} គម្រោង</>,
    fields: ["toiletConstructionProjects"],
  },
  {
    id: "៧.២.១៥",
    indicator: "ឃុំ សង្កាត់ដែលបានរៀបចំ និងអនុវត្តគម្រោង/សកម្មភាព លើកកម្ពស់សមភាពយេនឌ័រ និងការទប់ស្កាត់អំពើហិង្សាក្នុងគ្រួសារ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasGenderEqualityProjects === "បាន" ? "☑" : "☐"} បាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasGenderEqualityProjects === "មិនបាន" ? "☑" : "☐"} មិនបាន
        </label>
      </>
    ),
    fields: ["hasGenderEqualityProjects"],
  },
  {
    id: "៧.២.១៦",
    indicator: "ឃុំ សង្កាត់ដែលបានរៀបចំ និងអនុវត្តគម្រោង/សកម្មភាព លើកកម្ពស់សមភាពយេនឌ័រ និងការទប់ស្កាត់អំពើហិង្សាក្នុងគ្រួសារបាន ចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.genderEqualityProjectsCount)} គម្រោង</>,
    fields: ["genderEqualityProjectsCount"],
  },
  {
    id: "៧.២.១៧",
    indicator: "មុខងារចាំបាច់ផ្សេងៗទៀត ដែលឃុំ សង្កាត់បានអនុវត្ដដើម្បីឆ្លើយតបទៅនឹងតម្រូវការចាំបាច់របស់ប្រជាពលរដ្ឋនៅមូលដ្ឋានរួមមាន",
    render: (d) => (
      <div className="whitespace-pre-line min-h-[3rem]">
        {toKhmerNum(d.otherEssentialFunctions)}
      </div>
    ),
    fields: ["otherEssentialFunctions"],
  },
];

const rows_7_3: DataRow[] = [
  {
    id: "៧.៣.១",
    indicator: "ឃុំ សង្កាត់បានកៀរគរជំនួយឧបត្ថម្ភពីដៃគូអភិវឌ្ឍន៍នានាទាំងក្នុងប្រទេស ទាំងក្រៅប្រទេស និងពីសប្បុរសជន ដើម្បីអភិវឌ្ឍឃុំ សង្កាត់",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasMobilizedDevelopmentSupport === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasMobilizedDevelopmentSupport === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasMobilizedDevelopmentSupport"],
  },
  {
    id: "៧.៣.២",
    indicator: "ចំនួនថវិកាឃុំ សង្កាត់គៀរគរបាន",
    render: (d) => <>ចំនួន {toKhmerNum(d.mobilizedBudgetAmount)} រៀល</>,
    fields: ["mobilizedBudgetAmount"],
  },
];

const rows_7_4: DataRow[] = [
  {
    id: "៧.៤.១",
    indicator: "ថ្នាក់ដឹកនាំភូមិដែលមានបរិញ្ញាបត្រឡើង",
    render: (d) => <>ចំនួន {toKhmerNum(d.villageLeadersWithBachelor)} នាក់</>,
    fields: ["villageLeadersWithBachelor"],
  },
  {
    id: "៧.៤.២",
    indicator: "ថ្នាក់ដឹកនាំភូមិដែលមានបរិញ្ញាបត្ររង",
    render: (d) => <>ចំនួន {toKhmerNum(d.villageLeadersWithAssociate)} នាក់</>,
    fields: ["villageLeadersWithAssociate"],
  },
  {
    id: "៧.៤.៣",
    indicator: "ថ្នាក់ដឹកនាំភូមិដែលមានមធ្យមសិក្សាទុតិយភូមិ",
    render: (d) => <>ចំនួន {toKhmerNum(d.villageLeadersWithHighSchool)} នាក់</>,
    fields: ["villageLeadersWithHighSchool"],
  },
  {
    id: "៧.៤.៤",
    indicator: "ចំនួនថ្នាក់ដឹកនាំភូមិដែលរងការបណ្ដឹង និងទទួលទណ្ឌកម្មវិន័យផ្នែករដ្ឋបាល និងច្បាប់",
    render: (d) => <>ចំនួន {toKhmerNum(d.villageLeadersDisciplined)} នាក់</>,
    fields: ["villageLeadersDisciplined"],
  },
];

export default function Section7Governance({ data }: Section7Props) {
  const has_7_1 = filterRows(rows_7_1, data).length > 0;
  const has_7_2 = filterRows(rows_7_2, data).length > 0;
  const has_7_3 = filterRows(rows_7_3, data).length > 0;
  const has_7_4 = filterRows(rows_7_4, data).length > 0;

  return (
    <table className="w-full border-collapse border border-black border-t-0">
      <tbody>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#B4C6E7]">
            ៧
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#B4C6E7]"
            colSpan={2}
          >
            ជាឃុំ សង្កាត់ដែលមានស្វ័យភាព សិទ្ធិអំណាច មុខងារ ធនធាន
            និងការទទួលខុសត្រូវច្បាស់លាស់
          </td>
        </tr>
        {has_7_1 && (
          <SubSection id="៧.១" label="ស្វ័យភាព និងសិទ្ធិអំណាចរបស់ក្រុមប្រឹក្សាឃុំ សង្កាត់" rows={rows_7_1} data={data} />
        )}
        {has_7_2 && (
          <SubSection id="៧.២" label="មុខងារ និងការទទួលខុសត្រូវ" rows={rows_7_2} data={data} pageBreak />
        )}
        {has_7_3 && (
          <SubSection id="៧.៣" label="ធនធានហិរញ្ញវត្ថុ" rows={rows_7_3} data={data} pageBreak />
        )}
        {has_7_4 && (
          <SubSection id="៧.៤" label="ធនធានមនុស្ស" rows={rows_7_4} data={data} />
        )}
      </tbody>
    </table>
  );
}

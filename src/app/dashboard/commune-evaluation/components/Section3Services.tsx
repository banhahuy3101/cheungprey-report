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

interface Section3Props {
  data: Partial<EvaluationData>;
}

interface DataRow {
  id: string;
  indicator: string;
  render: (d: Partial<EvaluationData>) => React.ReactNode;
  fields: (keyof EvaluationData)[];
}

const sub_3_1_rows: DataRow[] = [
  {
    id: "៣.១.១",
    indicator: "ចំនួនប្រជាពលរដ្ឋដែលបានទទួលសេវារដ្ឋបាលនៅឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.serviceRecipientsCount)} នាក់</>,
    fields: ["serviceRecipientsCount"],
  },
  {
    id: "៣.១.២",
    indicator: "ចំនួនបញ្ជីកំណើតដែលបានផ្តល់ជូនប្រជាពលរដ្ឋ",
    render: (d) => <>ចំនួន {toKhmerNum(d.birthRegistrations)} សេវា</>,
    fields: ["birthRegistrations"],
  },
  {
    id: "៣.១.៣",
    indicator: "ចំនួនបញ្ជីអាពាហ៍ពិពាហ៍ដែលបានផ្តល់ជូនប្រជាពលរដ្ឋ",
    render: (d) => <>ចំនួន {toKhmerNum(d.marriageRegistrations)} សេវា</>,
    fields: ["marriageRegistrations"],
  },
  {
    id: "៣.១.៤",
    indicator: "ចំនួនបញ្ជីបញ្ជីមរណភាពដែលបានផ្តល់ជូនប្រជាពលរដ្ឋ",
    render: (d) => <>ចំនួន {toKhmerNum(d.deathRegistrations)} សេវា</>,
    fields: ["deathRegistrations"],
  },
  {
    id: "៣.១.៥",
    indicator: "ចំនួនការផ្តល់សៀវភៅស្នាក់នៅ សៀវភៅគ្រួសារ ដែលបានផ្តល់ជូនប្រជាពលរដ្ឋ",
    render: (d) => <>ចំនួន {toKhmerNum(d.residenceBookIssued)} សេវា</>,
    fields: ["residenceBookIssued"],
  },
  {
    id: "៣.១.៦",
    indicator: "ចំនួនអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ ដែលបានផ្តល់ជូនប្រជាពលរដ្ឋ",
    render: (d) => <>ចំនួន {toKhmerNum(d.identityCardsIssued)} សេវា</>,
    fields: ["identityCardsIssued"],
  },
  {
    id: "៣.១.៧",
    indicator: "មធ្យោបាយទទួលមតិត្រឡប់ជូនប្រជាពលរដ្ឋដែលឃុំ សង្កាត់កំពុងអនុវត្ត រួមមាន (ប្រអប់សំបុត្រ តេឡេក្រាម បណ្តាញទំនាក់ទំនងសង្គម ។ល។)",
    render: (d) => <>{toKhmerNum(d.feedbackMethods)}</>,
    fields: ["feedbackMethods"],
  },
];

const sub_3_2_rows: DataRow[] = [
  {
    id: "៣.២.១",
    indicator: "សមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាសមាជិកគណៈកម្មាធិការគ្រប់គ្រងសាលារៀន",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasCouncilMemberSchoolCommittee === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasCouncilMemberSchoolCommittee === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasCouncilMemberSchoolCommittee"],
  },
  {
    id: "៣.២.២",
    indicator: "សមាជិកក្រុមប្រឹក្សាក្រុង ស្រុក ខណ្ឌជាសមាជិកគណៈកម្មាធិការគ្រប់គ្រងសាលារៀន",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasDistrictMemberSchoolCommittee === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasDistrictMemberSchoolCommittee === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasDistrictMemberSchoolCommittee"],
  },
  {
    id: "៣.២.៣",
    indicator: "ចំនួនកិច្ចប្រជុំប្រចាំខែរបស់គណៈកម្មការគ្រប់គ្រងសាលារៀន",
    render: (d) => <>ចំនួន {toKhmerNum(d.schoolMeetingCount)} ដង</>,
    fields: ["schoolMeetingCount"],
  },
  {
    id: "៣.២.៤",
    indicator: "គ្រូបង្រៀននៅតាមតំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាក ត្រូវបានគាំទ្រ និងលើកទឹកចិត្ត (មាន ឬគ្មាន)",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasTeacherSupport === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasTeacherSupport === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasTeacherSupport"],
  },
  {
    id: "៣.២.៥",
    indicator: "បើមានសូមរៀបរាប់ការគាំទ្រគ្រូបង្រៀននៅតាមតំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាកទាំងនោះ",
    render: (d) => <>{toKhmerNum(d.teacherSupportDetails)}</>,
    fields: ["teacherSupportDetails"],
  },
  {
    id: "៣.២.៦",
    indicator: "ចំនួនភាគរយសិស្សក្រីក្រ សិស្សស្ថិតក្នុងតំបន់ជួបការលំបាក និងសិស្សមានពិការភាពទទួលបានអាហារូបករណ៍",
    render: (d) => <>ចំនួន {toKhmerNum(d.scholarshipPercentage)} %</>,
    fields: ["scholarshipPercentage"],
  },
];

const sub_3_3_rows: DataRow[] = [
  {
    id: "៣.៣.១",
    indicator: "ចំនួនប្រជាពលរដ្ឋទទួលបានសេវាថែទាំសុខភាពបឋមនៅមណ្ឌលសុខភាព",
    render: (d) => <>ចំនួន {toKhmerNum(d.primaryHealthcareRecipients)} នាក់</>,
    fields: ["primaryHealthcareRecipients"],
  },
  {
    id: "៣.៣.២",
    indicator: "មណ្ឌលសុខភាពនៅឃុំ សង្កាត់",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasHealthCenter === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasHealthCenter === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasHealthCenter"],
  },
  {
    id: "៣.៣.៣",
    indicator: "មន្ទីរពេទ្យបង្អែកនៅក្នុងក្រុង ស្រុក ខណ្ឌ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasReferralHospital === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasReferralHospital === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasReferralHospital"],
  },
  {
    id: "៣.៣.៤",
    indicator: "ការលើកទឹកចិត្តដល់គ្រូពេទ្យដែលទៅបំពេញការងារនៅតំបន់ជនបទ តំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាក",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasDoctorIncentives === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasDoctorIncentives === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasDoctorIncentives"],
  },
  {
    id: "៣.៣.៥",
    indicator: "មានប្រជាពលរដ្ឋចូលរួមក្នុងគណៈកម្មការគ្រប់គ្រងមណ្ឌលសុខភាព និងក្រុមទ្រទ្រង់សុខភាពភូមិ អ្នកស្ម័គ្រចិត្តបម្រើការងារសុខភាពតាមសហគមន៍",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasCommunityHealthParticipation === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasCommunityHealthParticipation === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasCommunityHealthParticipation"],
  },
  {
    id: "៣.៣.៦",
    indicator: "ឃុំ សង្កាត់មានទីកន្លែងហាត់ប្រាណ ឬហាត់កីឡាសាធារណៈ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasPublicExerciseSpace === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasPublicExerciseSpace === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasPublicExerciseSpace"],
  },
  {
    id: "៣.៣.៧",
    indicator: "ចំនួនកម្មវិធី កិច្ចប្រជុំ ឬព្រឹត្តការណ៍ផ្សព្វផ្សាយការយល់ដឹងរបស់ប្រជាពលរដ្ឋក្នុងការវិធានសុខាភិបាល ដើម្បីបង្ការ និងទប់ស្កាត់ការឆ្លងរាលដាលជំងឺកូវីដ១៩ និងកាត់បន្ថយការប្រឈមនឹងកត្តាហានិភ័យនៃជំងឺមិនឆ្លង",
    render: (d) => <>ចំនួន {toKhmerNum(d.healthAwarenessPrograms)} ដង</>,
    fields: ["healthAwarenessPrograms"],
  },
  {
    id: "៣.៣.៨",
    indicator: "ចំនួនប្រជាពលរដ្ឋចូលរួមកម្មវិធី កិច្ចប្រជុំ ឬព្រឹត្តការណ៍ផ្សព្វផ្សាយការយល់ដឹងរបស់ប្រជាពលរដ្ឋក្នុងការវិធានសុខាភិបាល",
    render: (d) => <>ចំនួន {toKhmerNum(d.healthAwarenessParticipants)} នាក់</>,
    fields: ["healthAwarenessParticipants"],
  },
];

const sub_3_4_rows: DataRow[] = [
  {
    id: "៣.៤.១",
    indicator: "ការកសាងផ្លូវថ្មី ផ្លូវបេតុងចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.newConcreteRoads)} ខ្សែ</>,
    fields: ["newConcreteRoads"],
  },
  {
    id: "៣.៤.២",
    indicator: "ការកសាងផ្លូវថ្មី ស្មើនឹងប្រវែង",
    render: (d) => <>ចំនួន {toKhmerNum(d.newConcreteRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["newConcreteRoadKm"],
  },
  {
    id: "៣.៤.៣",
    indicator: "ការកសាងផ្លូវក្រាលកៅស៊ូចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.newAsphaltRoads)} ខ្សែ</>,
    fields: ["newAsphaltRoads"],
  },
  {
    id: "៣.៤.៤",
    indicator: "ការកសាងផ្លូវក្រាលកៅស៊ូស្មើនឹងប្រវែង",
    render: (d) => <>ចំនួន {toKhmerNum(d.newAsphaltRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["newAsphaltRoadKm"],
  },
  {
    id: "៣.៤.៥",
    indicator: "ការកសាងផ្លូវដី ផ្លូវគ្រួសក្រហម និងផ្លូវគ្រួសធម្មជាតិមានចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.constructDirtRoads)} ខ្សែ</>,
    fields: ["constructDirtRoads"],
  },
  {
    id: "៣.៤.៦",
    indicator: "ការកសាងផ្លូវដី ផ្លូវគ្រួសក្រហម និងផ្លូវគ្រួសធម្មជាតិស្មើនឹងប្រវែង",
    render: (d) => <>ចំនួន {toKhmerNum(d.constructDirtRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["constructDirtRoadKm"],
  },
  {
    id: "៣.៤.៧",
    indicator: "ការជួសជុលផ្លូវបេតុងចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.repairConcreteRoads)} ខ្សែ</>,
    fields: ["repairConcreteRoads"],
  },
  {
    id: "៣.៤.៨",
    indicator: "ការជួសជុលផ្លូវបេតុងស្មើនឹងប្រវែង",
    render: (d) => <>ចំនួន {toKhmerNum(d.repairConcreteRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["repairConcreteRoadKm"],
  },
  {
    id: "៣.៤.៩",
    indicator: "ការជួសជុលផ្លូវក្រាលកៅស៊ូចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.repairAsphaltRoads)} ខ្សែ</>,
    fields: ["repairAsphaltRoads"],
  },
  {
    id: "៣.៤.១០",
    indicator: "ការជួសជុលផ្លូវក្រាលកៅស៊ូស្មើនឹងប្រវែង",
    render: (d) => <>ចំនួន {toKhmerNum(d.repairAsphaltRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["repairAsphaltRoadKm"],
  },
  {
    id: "៣.៤.១១",
    indicator: "ការជួសជុលផ្លូវដី និងគ្រួសក្រហមចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.repairedDirtRoads)} ខ្សែ</>,
    fields: ["repairedDirtRoads"],
  },
  {
    id: "៣.៤.១២",
    indicator: "ការជួសជុលផ្លូវដី និងគ្រួសក្រហមស្មើនឹងប្រវែង",
    render: (d) => <>ចំនួន {toKhmerNum(d.repairedDirtRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["repairedDirtRoadKm"],
  },
  {
    id: "៣.៤.១៣",
    indicator: "ផ្លូវក្រាលក្រួសក្រហម ត្រូវបានប្រែក្លាយទៅជាផ្លូវកៅស៊ូ ឬផ្លូវបេតុងមានចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.upgradedRoadLines)} ខ្សែ</>,
    fields: ["upgradedRoadLines"],
  },
  {
    id: "៣.៤.១៤",
    indicator: "ផ្លូវក្រាលក្រួសក្រហម ត្រូវបានប្រែក្លាយទៅជាផ្លូវកៅស៊ូ ឬផ្លូវបេតុងមានចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.upgradedRoadKm)} គីឡូម៉ែត្រ</>,
    fields: ["upgradedRoadKm"],
  },
  {
    id: "៣.៤.១៥",
    indicator: "ការកសាងថ្មីប្រព័ន្ធប្រឡាយរំដោះទឹក/លូបង្ហូរទឹកចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.drainageLines)} ខ្សែ</>,
    fields: ["drainageLines"],
  },
  {
    id: "៣.៤.១៦",
    indicator: "ការកសាងថ្មីប្រព័ន្ធប្រឡាយរំដោះទឹក/លូបង្ហូរទឹកចំនួន",
    render: (d) => <>ចំនួន {toKhmerNum(d.drainageMeters)} ម៉ែត្រ</>,
    fields: ["drainageMeters"],
  },
  {
    id: "៣.៤.១៧",
    indicator: "ការកសាងថ្មីស្ថានីយបូមទឹក",
    render: (d) => <>ចំនួន {toKhmerNum(d.pumpingStations)} កន្លែង</>,
    fields: ["pumpingStations"],
  },
  {
    id: "៣.៤.១៨",
    indicator: "ការកសាងថ្មីប្រព័ន្ធច្រោះទឹកកខ្វក់",
    render: (d) => <>ចំនួន {toKhmerNum(d.waterTreatmentPlants)} កន្លែង</>,
    fields: ["waterTreatmentPlants"],
  },
  {
    id: "៣.៤.១៩",
    indicator: "ចំនួនគម្រោងដែលផ្នែកឯកជន សប្បុរសជន និងសហគមន៍មូលដ្ឋាន បានស្តារ ជួសជុល កសាង ថែទាំហេដ្ឋារចនាសម្ព័ន្ធគមនាគមន៍ក្នុងឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.privateCommunityProjects)} គម្រោង</>,
    fields: ["privateCommunityProjects"],
  },
  {
    id: "៣.៤.២០",
    indicator: "ចំនួនគម្រោងដែលផ្នែកឯកជន សប្បុរសជន និងសហគមន៍មូលដ្ឋាន បានស្តារ ជួសជុល កសាង ថែទាំហេដ្ឋារចនាសម្ព័ន្ធគមនាគមន៍ក្នុងឃុំ សង្កាត់ ស្មើនឹង",
    render: (d) => <>ចំនួន {toKhmerNum(d.privateCommunityProjectsKm)} គីឡូម៉ែត្រ</>,
    fields: ["privateCommunityProjectsKm"],
  },
  {
    id: "៣.៤.២១",
    indicator: "សូមរៀបរាប់បន្ថែមអំពីការកសាងហេដ្ឋារចនាសម្ព័ន្ធរូបវន្តក្នុងឃុំ សង្កាត់ (បើមាន)",
    render: (d) => <>{toKhmerNum(d.infrastructureDescription)}</>,
    fields: ["infrastructureDescription"],
  },
];

const sub_3_5_rows: DataRow[] = [
  {
    id: "៣.៥.១",
    indicator: "ចំនួនភាគរយគ្រួសារក្នុងឃុំ សង្កាត់មានទឹកស្អាតសម្រាប់ផឹក និងប្រើប្រាស់ក្នុងជីវភាពប្រចាំថ្ងៃតាមរយៈទឹកបំពង់ ការស្តារ ជីកស្រះ អណ្តូងទឹក",
    render: (d) => <>ចំនួន {toKhmerNum(d.cleanWaterPct)} %</>,
    fields: ["cleanWaterPct"],
  },
  {
    id: "៣.៥.២",
    indicator: "ចំនួនភាគរយគ្រួសារក្នុងឃុំ សង្កាត់ ដែលមានទឹកស្អាតប្រើប្រាស់តាមរយៈទឹកបំពង់",
    render: (d) => <>ចំនួន {toKhmerNum(d.pipedWaterPct)} %</>,
    fields: ["pipedWaterPct"],
  },
];

const sub_3_6_rows: DataRow[] = [
  {
    id: "៣.៦.១",
    indicator: "ចំនួនព្រែក បឹងបួរ អូរធម្មជាតិ និងជីកស្រះ ដែលត្រូវបានស្តារ និងជីកថ្មី",
    render: (d) => <>ចំនួន {toKhmerNum(d.restoredWaterBodies)} កន្លែង</>,
    fields: ["restoredWaterBodies"],
  },
  {
    id: "៣.៦.២",
    indicator: "ចំនួនប្រឡាយស្រោចស្រពនៅតាមឃុំ សង្កាត់ដែលបានកសាង និងពង្រីកថ្មី",
    render: (d) => <>ចំនួន {toKhmerNum(d.irrigationCanals)} ខ្សែ</>,
    fields: ["irrigationCanals"],
  },
  {
    id: "៣.៦.៣",
    indicator: "ចំនួនប្រឡាយស្រោចស្រពនៅតាមឃុំ សង្កាត់ដែលបានកសាង និងពង្រីកថ្មីស្មើនឹង",
    render: (d) => <>ចំនួន {toKhmerNum(d.irrigationCanalsMeters)} ម៉ែត្រ</>,
    fields: ["irrigationCanalsMeters"],
  },
  {
    id: "៣.៦.៤",
    indicator: "ចំនួនប្រព័ន្ធបញ្ចេញបញ្ចូលទឹក",
    render: (d) => <>ចំនួន {toKhmerNum(d.waterInletSystems)} កន្លែង</>,
    fields: ["waterInletSystems"],
  },
  {
    id: "៣.៦.៥",
    indicator: "ចំនួនវគ្គបណ្តុះបណ្តាលដែលក្រុមប្រឹក្សាឃុំ សង្កាត់ទទួលបានពាក់ព័ន្ធលើការគ្រប់គ្រង ការអភិវឌ្ឍ និងការអភិរក្សព្រែក អូរ និងបឹងបួរធម្មជាតិ",
    render: (d) => <>ចំនួន {toKhmerNum(d.waterManagementTraining)} វគ្គ</>,
    fields: ["waterManagementTraining"],
  },
  {
    id: "៣.៦.៦",
    indicator: "ចំនួនសហគមន៍កសិករប្រើប្រាស់ទឹកដែលបានបង្កើតនៅតាមឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.farmingCommunities)} សហគមន៍</>,
    fields: ["farmingCommunities"],
  },
  {
    id: "៣.៦.៧",
    indicator: "ចំនួនវគ្គបណ្តុះបណ្តាលដល់សហគមន៍កសិករប្រើប្រាស់ទឹក",
    render: (d) => <>ចំនួន {toKhmerNum(d.farmingCommunityTraining)} វគ្គ</>,
    fields: ["farmingCommunityTraining"],
  },
];

const sub_3_7_rows: DataRow[] = [
  {
    id: "៣.៧.១",
    indicator: "ភាគរយនៃភូមិក្នុងឃុំ សង្កាត់នីមួយៗមានអគ្គិសនីប្រើប្រាស់ពេញលេញ",
    render: (d) => <>ចំនួន {toKhmerNum(d.electricityCoveragePct)} %</>,
    fields: ["electricityCoveragePct"],
  },
];

const sub_3_8_rows: DataRow[] = [
  {
    id: "៣.៨.១",
    indicator: "ឃុំ សង្កាត់មានវេបសាយ (Website) និងកម្មវិធីទូរស័ព្ទឆ្លាតវៃ (Apps) សម្រាប់ផ្ដល់ព័ត៌មាន និងចែករំលែកឯកសារនានា",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasCommuneWebsite === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasCommuneWebsite === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasCommuneWebsite"],
  },
  {
    id: "៣.៨.២",
    indicator: "មន្ទីរពេទ្យបង្អែក មណ្ឌលសុខភាពមានវេបសាយ (Website) និងកម្មវិធីទូរស័ព្ទឆ្លាតវៃ (Apps)",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasHealthCenterWebsite === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasHealthCenterWebsite === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasHealthCenterWebsite"],
  },
  {
    id: "៣.៨.៣",
    indicator: "សាលារៀនមានវេបសាយ (Website) និងកម្មវិធីទូរស័ព្ទឆ្លាតវៃ (Apps)",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasSchoolWebsite === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasSchoolWebsite === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasSchoolWebsite"],
  },
  {
    id: "៣.៨.៤",
    indicator: "ប៉ុស្ដិ៍នគរបាល មានវេបសាយ (Website) និងកម្មវិធីទូរស័ព្ទឆ្លាតវៃ (Apps)",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasPoliceWebsite === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasPoliceWebsite === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasPoliceWebsite"],
  },
];

const sub_3_9_rows: DataRow[] = [
  {
    id: "៣.៩.១",
    indicator: "ចំនួនករណីសម្រុះសម្រួលដោះស្រាយវិវាទដីធ្លីនៅឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.landDisputeCases)} ករណី</>,
    fields: ["landDisputeCases"],
  },
  {
    id: "៣.៩.២",
    indicator: "ឃុំ សង្កាត់បានរៀបចំផែនការប្រើប្រាស់ដី និងប្លង់គោលប្រើប្រាស់ដីទីប្រជុំជន",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasLandUsePlan === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasLandUsePlan === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasLandUsePlan"],
  },
  {
    id: "៣.៩.៣",
    indicator: "ចំនួនសហគមន៍ក្នុងគោលដៅសន្សំប្រាក់ ប្រវាស់កម្លាំងពលកម្ម ជំនាញសាងសង់ផ្ទះ",
    render: (d) => <>ចំនួន {toKhmerNum(d.targetCommunities)} សហគមន៍</>,
    fields: ["targetCommunities"],
  },
];

const sub_3_10_rows: DataRow[] = [
  {
    id: "៣.១០.១",
    indicator: "ឃុំ សង្កាត់មានយន្តការប្រមូលសំរាម សំណល់រឹង សំណល់រាវ និងការបំពុលបរិស្ថានផ្សេងទៀត",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasWasteCollection === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasWasteCollection === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasWasteCollection"],
  },
  {
    id: "៣.១០.២",
    indicator: "ចំនួនកម្មវិធីផ្សព្វផ្សាយអំពីច្បាប់ គោលការណ៍ និងវិធានការនានាស្តីពីកិច្ចការពារថែរក្សាបរិស្ថាន រួមទាំងវិធីសាស្រ្តនៃការថែរក្សាសុខភាព សុវត្ថិភាពចំណីអាហារ ផលប៉ះពាល់ពីការប្រើប្រាស់សារធាតុគីមី ការប្រើគ្រឿងស្រវឹង និងថ្នាំជក់",
    render: (d) => <>ចំនួន {toKhmerNum(d.environmentalLawPrograms)} ដង</>,
    fields: ["environmentalLawPrograms"],
  },
  {
    id: "៣.១០.៣",
    indicator: "ចំនួនប្រជាពលរដ្ឋចូលរួមកម្មវិធីផ្សព្វផ្សាយច្បាប់ គោលការណ៍ និងវិធានការនានាស្តីពីកិច្ចការពារថែរក្សាបរិស្ថាន",
    render: (d) => <>ចំនួន {toKhmerNum(d.environmentalLawParticipants)} នាក់</>,
    fields: ["environmentalLawParticipants"],
  },
  {
    id: "៣.១០.៤",
    indicator: "ចំនួនកម្មវិធីផ្សព្វផ្សាយការរស់នៅស្អាតប្រកបដោយចីរភាព ការអប់រំ ផ្សព្វផ្សាយ និងបំផុសលើកទឹកចិត្តឱ្យប្រជាពលរដ្ឋចូលរួមក្នុងចលនាប្រឡងប្រណាំងមេត្រីភាពបរិស្ថានភូមិ ឃុំ សង្កាត់",
    render: (d) => <>ចំនួន {toKhmerNum(d.greenVillagePrograms)} ដង</>,
    fields: ["greenVillagePrograms"],
  },
  {
    id: "៣.១០.៥",
    indicator: "ឃុំ សង្កាត់ដែលបានបញ្ច្រាបគោលការណ៍អភិវឌ្ឍន៍ដោយចីរភាពទៅក្នុងផែនការអភិវឌ្ឍន៍ឃុំ សង្កាត់",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasGreenVillageProgram === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasGreenVillageProgram === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasGreenVillageProgram"],
  },
  {
    id: "៣.១០.៦",
    indicator: "ចំនួនកម្មវិធីអប់រំផ្សព្វផ្សាយគ្រោះថ្នាក់ដែលបណ្តាលមកពីការពុលចំណីអាហារ ភេសជ្ជៈនានា",
    render: (d) => <>ចំនួន {toKhmerNum(d.foodSafetyPrograms)} ដង</>,
    fields: ["foodSafetyPrograms"],
  },
  {
    id: "៣.១០.៧",
    indicator: "ចំនួនករណីពុលចំណីអាហារ ភេសជ្ជៈនានានៅតាមឃុំ សង្កាត់ដែលត្រូវបានឆ្លើយតបដោះស្រាយ",
    render: (d) => <>ចំនួន {toKhmerNum(d.foodPoisoningCases)} ករណី</>,
    fields: ["foodPoisoningCases"],
  },
];

const sub_3_11_rows: DataRow[] = [
  {
    id: "៣.១១.១",
    indicator: "ចំនួនគ្រួសារដែលទទួលបានការឧបត្ថម្ភជាស្បៀងអាហារ និងថ្នាំសង្កូវ ដែលជួបការលំបាក និងខ្វះខាតដោយសារការរីករាលដាលនៃជំងឺឆ្លង និងជំងឺរាតត្បាតកាចសាហាវនានា",
    render: (d) => <>ចំនួន {toKhmerNum(d.disasterAffectedHouseholds)} គ្រួសារ</>,
    fields: ["disasterAffectedHouseholds"],
  },
  {
    id: "៣.១១.២",
    indicator: "ឃុំ សង្កាត់មានយន្តការសម្រាប់ដោះស្រាយ និងជួយសង្គ្រោះសម្រាប់ប្រជាពលរដ្ឋដែលទទួលរងគ្រោះដោយសារទឹកជំនន់",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasEmergencyResponse === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasEmergencyResponse === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasEmergencyResponse"],
  },
  {
    id: "៣.១១.៣",
    indicator: "ឃុំ សង្កាត់មានរៀបចំយន្តការដោះស្រាយ និងជួយសង្គ្រោះគ្រោះរាំងស្ងួត តាមរយៈអន្តរាគមន៍ជួយបូមទឹកសង្គ្រោះផលដំណាំរបស់ប្រជាពលរដ្ឋ និងការផ្គត់ផ្គង់ទឹកសម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasDroughtPumping === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasDroughtPumping === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasDroughtPumping"],
  },
  {
    id: "៣.១១.៤",
    indicator: "ឃុំ សង្កាត់មានយន្តការតាមដាន ត្រួតពិនិត្យជាប្រចាំនូវតម្រូវការស្បៀងក្នុងមូលដ្ឋាននៅក្នុងសហគមន៍ប្រជាជនដោយមិនទុកឱ្យប្រជាជនណាម្នាក់គ្មានស្បៀងអាហារសម្រាប់ហូប ដោយអាជ្ញាធរមិនបានដឹង និងមិនបានជួយដោះស្រាយនោះឡើយ",
    render: (d) => (
      <>
        <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
          {d.hasDisasterPreparedness === "មាន" ? "☑" : "☐"} មាន
        </label>
        <label className="inline-flex items-center gap-1 cursor-not-allowed">
          {d.hasDisasterPreparedness === "មិនមាន" ? "☑" : "☐"} មិនមាន
        </label>
      </>
    ),
    fields: ["hasDisasterPreparedness"],
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

export default function Section3Services({ data }: Section3Props) {
  return (
    <table className="w-full border-collapse border border-black border-t-0">
      <tbody>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#B4C6E7]">៣</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#B4C6E7]" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលមានការផ្តល់សេវាសាធារណៈជូនប្រជាពលរដ្ឋប្រកបដោយគុណភាព តម្លាភាព គណនេយ្យភាព និងជឿទុកចិត្ត
          </td>
        </tr>
        <SubSection id="៣.១" label="សេវារដ្ឋបាល" rows={sub_3_1_rows} data={data} />
        <SubSection id="៣.២" label="សេវាអប់រំ" rows={sub_3_2_rows} data={data} pageBreak />
        <SubSection id="៣.៣" label="សេវាសុខាភិបាល" rows={sub_3_3_rows} data={data} pageBreak />
        <SubSection id="៣.៤" label="ការកសាងហេដ្ឋារចនាសម្ព័ន្ធគមនាគមន៍" rows={sub_3_4_rows} data={data} pageBreak />
        <SubSection id="៣.៥" label="ការផ្គត់ផ្គង់ទឹកស្អាត" rows={sub_3_5_rows} data={data} pageBreak />
        <SubSection id="៣.៦" label="ការរក្សាប្រភពទឹក និងការពង្រឹងប្រព័ន្ធស្រោចស្រព" rows={sub_3_6_rows} data={data} pageBreak />
        <SubSection id="៣.៧" label="ការផ្គត់ផ្គង់ថាមពលអគ្គិសនី" rows={sub_3_7_rows} data={data} pageBreak />
        <SubSection id="៣.៨" label="បច្ចេកវិទ្យា គមនាគមន៍ និងព័ត៌មាន" rows={sub_3_8_rows} data={data} pageBreak />
        <SubSection id="៣.៩" label="ការគ្រប់គ្រងដីធ្លី សំណង់ ការរៀបចំដែនដី និងនគរូបនីយកម្ម" rows={sub_3_9_rows} data={data} pageBreak />
        <SubSection id="៣.១០" label="ការងារអនាម័យ និងបរិស្ថាន" rows={sub_3_10_rows} data={data} pageBreak />
        <SubSection id="៣.១១" label="ការងារបង្ការ និងការទប់ស្កាត់ការប្រែប្រួលអាកាសធាតុ គ្រោះមហន្តរាយ និងជំងឺឆ្លងកាចសាហាវនានា" rows={sub_3_11_rows} data={data} pageBreak />
      </tbody>
    </table>
  );
}

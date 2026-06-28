import type { EvaluationData } from "@/lib/evaluation-schema";

const khmerDigits: Record<string, string> = {
  "0": "០", "1": "១", "2": "២", "3": "៣", "4": "៤",
  "5": "៥", "6": "៦", "7": "៧", "8": "៨", "9": "៩",
};

function toKhmerNum(value: string | undefined) {
  const text = (value || "").replace(/\d/g, (d) => khmerDigits[d]);
  return <span className="font-bold">{text}</span>;
}

interface Section3Props {
  data: Partial<EvaluationData>;
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
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.១</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            សេវារដ្ឋបាល
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១.១</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនប្រជាពលរដ្ឋដែលបានទទួលសេវារដ្ឋបាលនៅឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.serviceRecipientsCount)} នាក់
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១.២</td>
          <td className="border border-black font-siemreap text-xs">
            ចំនួនសេវារដ្ឋបាលដែលបានផ្តល់ជូនប្រជាពលរដ្ឋ តាមប្រភេទនីមួយៗ ៖
            <ol className="pl-5 space-y-1 mt-1">
              <li>១. ចំនួនបញ្ជីកំណើត</li>
              <li>២. ចំនួនបញ្ជីអាពាហ៍ពិពាហ៍</li>
              <li>៣. ចំនួនបញ្ជីមរណភាព</li>
              <li>៤. ចំនួនការផ្តល់សៀវភៅស្នាក់នៅ សៀវភៅគ្រួសារ</li>
              <li>៥. ចំនួនអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <br />
              <li>១. ចំនួន {toKhmerNum(data.birthRegistrations)} សេវា</li>
              <li>២. ចំនួន {toKhmerNum(data.marriageRegistrations)} សេវា</li>
              <li>៣. ចំនួន {toKhmerNum(data.deathRegistrations)} សេវា</li>
              <li>៤. ចំនួន {toKhmerNum(data.residenceBookIssued)} សេវា</li>
              <li>៥. ចំនួន {toKhmerNum(data.identityCardsIssued)} សេវា</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១.៤</td>
          <td className="border border-black font-siemreap text-xs p-1">
            មធ្យោបាយទទួលមតិរិះគន់ ឬសំណូមពរជូនប្រជាពលរដ្ឋដែលឃុំ សង្កាត់កំពុងអនុវត្ត រួមមាន (ប្រអប់សំបុត្រ តេឡេក្រាម បណ្តាញទំនាក់ទំនងសង្គម។ល។)
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            រួមមាន {toKhmerNum(data.feedbackMethods)}
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.២</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            សេវាអប់រំ
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.២.៥</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. សមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាសមាជិកគណៈកម្មាធិការគ្រប់គ្រងសាលារៀន</li>
              <li>២. សមាជិកក្រុមប្រឹក្សាក្រុង ស្រុក ខណ្ឌ ជាសមាជិកគណៈកម្មាធិការគ្រប់គ្រងសាលារៀន</li>
              <li>៣. ចំនួនកិច្ចប្រជុំប្រចាំខែរបស់គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasCouncilMemberSchoolCommittee === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasCouncilMemberSchoolCommittee === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>២. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasDistrictMemberSchoolCommittee === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasDistrictMemberSchoolCommittee === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>៣. ចំនួន {toKhmerNum(data.schoolMeetingCount)} ដង</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.២.៦</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. គ្រូបង្រៀននៅតាមតំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាក ត្រូវបានគាំទ្រ និងលើកទឹកចិត្ត (មាន ឬមិនមាន) តាមរយៈការផ្តល់ប្រាក់ឧបត្ថម្ភបន្ថែម ឬផ្សេងទៀត</li>
              <li>២. បើមាន សូមរៀបរាប់ការគាំទ្រគ្រូបង្រៀននៅតាមតំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាកទាំងនោះ</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasTeacherSupport === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasTeacherSupport === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <br />
              <li>២. ការគាំទ្ររួមមាន {toKhmerNum(data.teacherSupportDetails)}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.២.៨</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនភាគរយសិស្សក្រីក្រ សិស្សស្ថិតក្នុងតំបន់ជួបការលំបាក និងសិស្សមានពិការភាពទទួលបានអាហារូបករណ៍
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.scholarshipPercentage)} %
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៣</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            សេវាសុខាភិបាល
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៣.២</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនប្រជាពលរដ្ឋទទួលបានសេវាថែទាំសុខភាពបឋមនៅមណ្ឌលសុខភាព (តួលេខនេះត្រូវផ្តល់ដោយមណ្ឌលសុខភាព)
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.primaryHealthcareRecipients)} នាក់
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៣.៦</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. មណ្ឌលសុខភាពនៅឃុំ សង្កាត់</li>
              <li>២. មន្ទីរពេទ្យបង្អែកនៅក្នុងក្រុង ស្រុក ខណ្ឌ</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasHealthCenter === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasHealthCenter === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>២. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasReferralHospital === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasReferralHospital === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៣.៧</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ការលើកទឹកចិត្តដល់គ្រូពេទ្យដែលទៅបំពេញការងារនៅតំបន់ជនបទ តំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាក តាមរយៈការផ្តល់ប្រាក់ឧបត្ថម្ភបន្ថែម ឬផ្សេងទៀត</li>
              <li>២. បើមាន សូមរៀបរាប់ការគាំទ្រគ្រូពេទ្យនៅតាមតំបន់ដាច់ស្រយាល និងតំបន់ជួបការលំបាកទាំងនោះ</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasDoctorIncentives === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasDoctorIncentives === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>២. ការគាំទ្ររួមមាន {toKhmerNum(data.doctorSupportDetails)}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៣.៩</td>
          <td className="border border-black font-siemreap text-xs p-1">
            ឃុំ សង្កាត់មានទីកន្លែងហាត់ប្រាណ ឬហាត់កីឡាសាធារណៈ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasPublicExerciseSpace === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasPublicExerciseSpace === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៣.១០</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនកម្មវិធី កិច្ចប្រជុំ ព្រឹត្តិការណ៍ផ្សព្វផ្សាយវិធានសុខាភិបាល ដើម្បីបង្ការ និងទប់ស្កាត់ការឆ្លងរាលដាលជំងឺកូវីដ១៩ និងកាត់បន្ថយការប្រឈមនឹងកត្តាហានិភ័យនៃជំងឺមិនឆ្លងដែលបានរៀបចំ</li>
              <li>២. ចំនួនប្រជាពលរដ្ឋចូលរួមកម្មវិធី កិច្ចប្រជុំ ព្រឹត្តិការណ៍ផ្សព្វផ្សាយការយល់ដឹងរបស់ប្រជាពលរដ្ឋក្នុងការវិធានសុខាភិបាល ដើម្បីបង្ការ និងទប់ស្កាត់ការឆ្លងរាលដាលជំងឺកូវីដ១៩ និងកាត់បន្ថយការប្រឈមនឹងកត្តាហានិភ័យនៃជំងឺមិនឆ្លង</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.healthAwarenessPrograms)} ដង</li>
              <br />
              <li>២. ចំនួន {toKhmerNum(data.healthAwarenessParticipants)} នាក់</li>
            </ol>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៤</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការកសាងហេដ្ឋារចនាសម្ព័ន្ធ កសាងរចនាសម្ព័ន្ធសហគមន៍
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៤.១</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ការកសាងផ្លូវថ្មី (គ្រប់គម្រោងទាំងអស់ដែលបានអភិវឌ្ឍនៅឃុំ សង្កាត់)</li>
              <li>២. ការជួសជុល (គ្រប់គម្រោងទាំងអស់ដែលបានអភិវឌ្ឍនៅឃុំ សង្កាត់)</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១.១. ការកសាងផ្លូវបេតុងចំនួន {toKhmerNum(data.newConcreteRoads)} ខ្សែ</li>
              <li>១.២. ការកសាងផ្លូវបេតុងស្មើនឹងប្រវែង {toKhmerNum(data.newConcreteRoadKm)} គីឡូម៉ែត្រ</li>
              <li>១.៣. ការកសាងផ្លូវក្រាលកៅស៊ូចំនួន {toKhmerNum(data.newAsphaltRoads)} ខ្សែ</li>
              <li>១.៤. ការកសាងផ្លូវក្រាលកៅស៊ូស្មើនឹងប្រវែង {toKhmerNum(data.newAsphaltRoadKm)} គីឡូម៉ែត្រ</li>
              <li>១.៥. ការជួសជុលផ្លូវដី និងគ្រួសក្រហមចំនួន {toKhmerNum(data.repairedDirtRoads)} ខ្សែ</li>
              <li>១.៦. ការជួសជុលផ្លូវដី និងគ្រួសក្រហមស្មើនឹងប្រវែង {toKhmerNum(data.repairedDirtRoadKm)} គីឡូម៉ែត្រ</li>
              <li>២.១. ការជួសជុលផ្លូវបេតុងចំនួន {toKhmerNum(data.repairConcreteRoads)} ខ្សែ</li>
              <li>២.២. ការជួសជុលផ្លូវបេតុងស្មើនឹងប្រវែង {toKhmerNum(data.repairConcreteRoadKm)} គីឡូម៉ែត្រ</li>
              <li>២.៣. ការជួសជុលផ្លូវក្រាលកៅស៊ូចំនួន {toKhmerNum(data.repairAsphaltRoads)} ខ្សែ</li>
              <li>២.៤. ការជួសជុលផ្លូវក្រាលកៅស៊ូស្មើនឹងប្រវែង {toKhmerNum(data.repairAsphaltRoadKm)} គីឡូម៉ែត្រ</li>
              <li>២.៥. ការកសាងផ្លូវដី និងគ្រួសក្រហមចំនួន {toKhmerNum(data.constructDirtRoads)} ខ្សែ</li>
              <li>២.៦. ការកសាងផ្លូវដី និងគ្រួសក្រហមស្មើនឹងប្រវែង {toKhmerNum(data.constructDirtRoadKm)} គីឡូម៉ែត្រ</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៤.២</td>
          <td className="border border-black font-siemreap text-xs p-1">
            ផ្លូវក្រាលគ្រួសក្រហម ត្រូវបានប្រែក្លាយទៅជាផ្លូវកៅស៊ូ ឬផ្លូវបេតុង
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ផ្លូវក្រាលគ្រួសក្រហម ត្រូវបានប្រែក្លាយទៅជាផ្លូវកៅស៊ូ ឬផ្លូវបេតុងមានចំនួន {toKhmerNum(data.upgradedRoadLines)} ខ្សែ</li>
              <li>២. ផ្លូវក្រាលគ្រួសក្រហម ត្រូវបានប្រែក្លាយទៅជាផ្លូវកៅស៊ូ ឬផ្លូវបេតុងមានចំនួន {toKhmerNum(data.upgradedRoadKm)} គីឡូម៉ែត្រ</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៤.៣</td>
          <td className="border border-black font-siemreap text-xs p-1">
            ការកសាងប្រព័ន្ធប្រឡាយរំដោះទឹក លូបង្អូរទឹក ស្ថានីយបូមទឹក ប្រព័ន្ធចម្រោះទឹកកខ្វក់
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ការកសាងថ្មីប្រព័ន្ធប្រឡាយរំដោះទឹក/លូបង្អូរទឹកចំនួន {toKhmerNum(data.drainageLines)} ខ្សែ</li>
              <li>២. ការកសាងថ្មីប្រព័ន្ធប្រឡាយរំដោះទឹក/លូបង្អូរទឹកចំនួន {toKhmerNum(data.drainageMeters)} ម៉ែត្រ</li>
              <li>៣. ការកសាងថ្មីស្ថានីយបូមទឹក {toKhmerNum(data.pumpingStations)} កន្លែង</li>
              <li>៤. ការកសាងថ្មីប្រព័ន្ធចម្រោះទឹកកខ្វក់ {toKhmerNum(data.waterTreatmentPlants)} កន្លែង</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៤.៤</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនគម្រោងដែលផ្អែកឯកជន សប្បុរសជន និងសហគមន៍មូលដ្ឋាន បានស្តារ ជួសជុល កសាង ថែទាំហេដ្ឋារចនាសម្ព័ន្ធសហគមន៍ក្នុងឃុំ សង្កាត់</li>
              <li>២. ចំនួនគម្រោងដែលផ្អែកឯកជន សប្បុរសជន និងសហគមន៍មូលដ្ឋាន បានស្តារ ជួសជុល កសាង ថែទាំហេដ្ឋារចនាសម្ព័ន្ធសហគមន៍ក្នុងឃុំ សង្កាត់ស្មើនឹងប្រវែង</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.privateCommunityProjects)} គម្រោង</li>
              <li>២. ស្មើនឹង {toKhmerNum(data.privateCommunityProjectsKm)} គីឡូម៉ែត្រ</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៥</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការផ្គត់ផ្គង់ទឹកស្អាត
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៥.១</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនភាគរយគ្រួសារក្នុងឃុំ សង្កាត់មានទឹកស្អាតសម្រាប់ផឹក និងប្រើប្រាស់ក្នុងជីវភាពប្រចាំថ្ងៃតាមរយៈទឹកបំពង់ ការស្តារ ដឹកស្រះ អណ្ដូងទឹក
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.cleanWaterPct)} %
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៥.២</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនភាគរយគ្រួសារក្នុងឃុំ សង្កាត់ ដែលមានទឹកស្អាតប្រើប្រាស់តាមរយៈទឹកបំពង់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.pipedWaterPct)} %
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៦</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការរក្សាប្រភពទឹក និងការពង្រីកប្រព័ន្ធស្រោចស្រព
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.១</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនអាងស្តុកទឹកខ្នាតតូចនៅតាមឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.smallReservoirs)} កន្លែង
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.២</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនព្រែក បឹងបួរ អូរធម្មជាតិ និងជីកស្រះ ដែលត្រូវដកស្តារ និងជីកថ្មី</li>
              <li>២. ចំនួនព្រែក បឹងបួរ អូរធម្មជាតិ និងជីកស្រះ ដែលត្រូវដកស្តារ និងជីកថ្មី ស្មើនឹងប្រវែង</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.restoredWaterBodies)} កន្លែង</li>
              <li>២. ស្មើនឹងប្រវែង {toKhmerNum(data.restoredWaterBodiesM)} ម៉ែត្រ</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.៤</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនប្រឡាយស្រោចស្រពនៅតាមឃុំ សង្កាត់ដែលបានកសាង</li>
              <li>២. ចំនួនប្រឡាយស្រោចស្រពនៅតាមឃុំ សង្កាត់ដែលបានពង្រីកថ្មី</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.irrigationCanals)} ខ្សែ</li>
              <li>២. ស្មើនឹង {toKhmerNum(data.irrigationCanalsMeters)} ម៉ែត្រ</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.៥</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនប្រព័ន្ធបញ្ចូលទឹក
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.waterInletSystems)}
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.៦</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនវគ្គបណ្តុះបណ្តាលដែលក្រុមប្រឹក្សាឃុំ សង្កាត់ទទួលបានពាក់ព័ន្ធលើការគ្រប់គ្រង ការអភិវឌ្ឍ និងការអភិរក្សព្រែក អូរ និងបឹងបួរធម្មជាតិ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.waterManagementTraining)} វគ្គ
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.៧</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនសហគមន៍កសិករប្រើប្រាស់ទឹកដែលបានបង្កើតនៅតាមឃុំ សង្កាត់</li>
              <li>២. ចំនួនវគ្គបណ្តុះបណ្តាលដល់សហគមន៍កសិករប្រើប្រាស់ទឹក</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.farmingCommunities)} សហគមន៍</li>
              <li>២. ចំនួន {toKhmerNum(data.farmingCommunityTraining)} វគ្គ</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៦.៨</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ការធ្វើអន្តរាគមន៍បូមទឹកសង្គ្រោះនៅពេលជួបគ្រោះរាំងស្ងួត
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasDroughtPumping === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasDroughtPumping === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៧</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការផ្គត់ផ្គង់ថាមពលអគ្គិសនី
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៧.១</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ភាគរយនៃភូមិក្នុងឃុំ សង្កាត់នីមួយៗ មានអគ្គិសនីប្រើប្រាស់ពេញលេញ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.electricityCoveragePct)} %
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៨</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            បច្ចេកវិទ្យា គមនាគមន៍ និងព័ត៌មាន
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៨.៣</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ឃុំ សង្កាត់មានគេហទំព័រ (<span className="font-sans">Website</span>) និងកម្មវិធីទូរស័ព្ទដៃ (<span className="font-sans">Apps</span>) សម្រាប់ផ្តល់ព័ត៌មាន និងចែករំលែកឯកសារនានា</li>
              <li>២. មន្ទីរពេទ្យបង្អែក មណ្ឌលសុខភាពមានគេហទំព័រ (<span className="font-sans">Website</span>) និងកម្មវិធីទូរស័ព្ទដៃ (<span className="font-sans">Apps</span>) សម្រាប់ផ្តល់ព័ត៌មាន និងចែករំលែកឯកសារនានា</li>
              <li>៣. សាលារៀនមានគេហទំព័រ (<span className="font-sans">Website</span>) និងកម្មវិធីទូរស័ព្ទដៃ (<span className="font-sans">Apps</span>) សម្រាប់ផ្តល់ព័ត៌មាន និងចែករំលែកឯកសារនានា</li>
              <li>៤. ប៉ុស្តិ៍នគរបាល មានគេហទំព័រ (<span className="font-sans">Website</span>) និងកម្មវិធីទូរស័ព្ទដៃ (<span className="font-sans">Apps</span>) សម្រាប់ផ្តល់ព័ត៌មាន និងចែករំលែកឯកសារនានា</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasCommuneWebsite === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasCommuneWebsite === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>២. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasHealthCenterWebsite === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasHealthCenterWebsite === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>៣. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasSchoolWebsite === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasSchoolWebsite === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>៤. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasPoliceWebsite === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasPoliceWebsite === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.៩</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការគ្រប់គ្រងដីធ្លី សំណង់ ការរៀបចំដែនដី និងនគរូបនីយកម្ម
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៩.៤</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនករណីសម្របសម្រួលដោះស្រាយវិវាទដីធ្លីនៅឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.landDisputeCases)} ករណី
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៩.៥</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ សង្កាត់បានរៀបចំផែនការប្រើប្រាស់ដី និងប្លង់គោលប្រើប្រាស់ដីទីប្រជុំជន
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasLandUsePlan === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasLandUsePlan === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.៩.៧</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនសហគមន៍ក្នុងគោលដៅសន្សំប្រាក់ ប្រាស់កម្លាំងពលកម្ម ជំនាញសាងសង់ផ្ទះធនធាន ហិរញ្ញវត្ថុ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.targetCommunities)} សហគមន៍
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.១០</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការងារអនាម័យ និងបរិស្ថាន
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១០.១</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ សង្កាត់មានយន្តការប្រមូលសំរាម សំណល់រឹង សំណល់រាវ និងការបំពុលបរិស្ថាន ផ្សេងទៀត
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasWasteCollection === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasWasteCollection === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១០.២</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនកម្មវិធីផ្សព្វផ្សាយអំពីច្បាប់ គោលការណ៍ និងវិធានការនានាស្តីពីកិច្ចការពារថែរក្សា បរិស្ថាន រួមទាំងវិធីសាស្ត្រនៃការថែរក្សាសុខភាព សុវត្ថិភាពចំណីអាហារ ផលប៉ះពាល់ពីការប្រើប្រាស់សារធាតុគីមី ការប្រើគ្រឿងស្រវឹង និងថ្នាំជក់</li>
              <li>២. ចំនួនប្រជាពលរដ្ឋចូលរួមកម្មវិធីផ្សព្វផ្សាយច្បាប់ គោលការណ៍ និងវិធានការនានា ស្តីពីកិច្ចការពារថែរក្សាបរិស្ថាន រួមទាំងវិធីសាស្ត្រនៃការថែរក្សាសុខភាព សុវត្ថិភាពចំណីអាហារ ផលប៉ះពាល់ពីការប្រើប្រាស់សារធាតុគីមី ការប្រើគ្រឿងស្រវឹង និងថ្នាំជក់</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.environmentalLawPrograms)} ដង</li>
              <li>២. ចំនួន {toKhmerNum(data.environmentalLawParticipants)} នាក់</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១០.៣</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនកម្មវិធីផ្សព្វផ្សាយការរស់នៅស្អាតប្រកបដោយចីរភាព ការអប់រំ ផ្សព្វផ្សាយ ស្អាត ភូមិ ឃុំ សង្កាត់ និងជួយលើកទឹកចិត្តឱ្យប្រជាពលរដ្ឋចូលរួមក្នុងចលនាប្រឡងប្រណាំង មេត្រីភាពបរិស្ថានភូមិ ឃុំ សង្កាត់</li>
              <li>២. ឃុំ សង្កាត់ដែលបានបញ្ចូលគោលការណ៍អភិវឌ្ឍន៍ដោយចីរភាពទៅក្នុងផែនការ អភិវឌ្ឍន៍ឃុំ សង្កាត់</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.greenVillagePrograms)} ដង</li>
              <li>២. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasGreenVillageProgram === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasGreenVillageProgram === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១០.៤</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនកម្មវិធីអប់រំផ្សព្វផ្សាយគ្រោះថ្នាក់ដែលបណ្តាលមកពីការពុលចំណីអាហារ ភេសជ្ជៈ នានា</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.foodSafetyPrograms)} ដង</li>
              <li>២. ចំនួន {toKhmerNum(data.foodPoisoningCases)} ករណី</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">៣.១១</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការបង្ការ និងការទប់ស្កាត់ការប្រើប្រាស់សារធាតុ គ្រឿងញៀន និងការឆ្លងជំងឺមហារីក
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១១.១</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនគ្រួសារដែលទទួលបានការឧបត្ថម្ភគាំទ្រចំណីអាហារ និងសម្លៀកបំពាក់ ដែលជួបការលំបាក និងខ្វះខាតដោយសារផលប៉ះពាល់នៃជំងឺឆ្លង និងជំងឺរាតត្បាតកាចសាហាវ នានា
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.smallBusinessesCount)} គ្រួសារ
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១១.២</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ សង្កាត់មានយន្តការសង្គ្រោះបឋម និងផ្តល់យោបល់ការថែទាំសុខភាពដល់ប្រជាពលរដ្ឋដែលទទួលរងគ្រោះថ្នាក់ដោយសារទឹកជំនន់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasEmergencyResponse === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasEmergencyResponse === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១១.៣</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ សង្កាត់មានរៀបចំប្រព័ន្ធការពារ និងផ្តល់សេវាសង្គ្រោះបន្ទាន់ដល់ជនរងគ្រោះ តាមរយៈអន្តរាគមន៍ជួយសង្គ្រោះពីគ្រោះធម្មជាតិ គ្រោះថ្នាក់ការងារ និងការស្វែងរកទិន្នន័យគ្រោះថ្នាក់ ប្រើប្រាស់ប្រចាំថ្ងៃ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasDisasterPreparedness === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasDisasterPreparedness === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">៣.១១.៤</td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ សង្កាត់មានយន្តការតាមដាន ត្រួតពិនិត្យផលប៉ះពាល់សង្គមក្នុងមូលដ្ឋាន នៅក្នុងការកសាងប្រព័ន្ធការពារសិទ្ធិមនុស្សដល់ប្រជាជនជាសហគមន៍ដែលរងគ្រោះដោយគ្រោះថ្នាក់ការងារ សម្របសម្រួល ដោយអាជ្ញាធរមិនមានការរើសអើង និងមិនមានជម្លោះដីធ្លីក្នុងរយៈពេលវែងឡើយ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasHumanRightsProtection === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasHumanRightsProtection === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
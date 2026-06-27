import type { EvaluationData } from "@/lib/evaluation-schema";

const khmerDigits: Record<string, string> = {
  "0": "០",
  "1": "១",
  "2": "២",
  "3": "៣",
  "4": "៤",
  "5": "៥",
  "6": "៦",
  "7": "៧",
  "8": "៨",
  "9": "៩",
};

function toKhmerNum(value: string | undefined) {
  const text = (value || "").replace(/\d/g, (d) => khmerDigits[d]);
  return <span className="font-bold">{text}</span>;
}

interface Section7Props {
  data: Partial<EvaluationData>;
}

export default function Section7Governance({ data }: Section7Props) {
  return (
    <table className="w-full border-collapse border border-black border-t-0">

      <tbody><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap">
            ៧
          </td>
          <td className="border border-black border-t-0 p-3 font-siemreap" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលមានស្វ័យភាព សិទ្ធិអំណាច មុខងារ ធនធាន
            និងការទទួលខុសត្រូវច្បាស់លាស់
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap">
            ៧.១
          </td>
          <td className="border border-black border-t-0 p-3 font-siemreap" colSpan={2}>
            ស្វ័យភាព និងសិទ្ធិអំណាចរបស់ក្រុមប្រឹក្សាឃុំ សង្កាត់
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.១.២
          </td>
          <td className="border border-black p-3 font-siemreap">
            ចំនួនសំណើរសំណូមពរ និងកង្វល់នានារបស់ប្រជាពលរដ្ឋដែលក្រុមប្រឹក្សាឃុំ
            សង្កាត់ ពុំអាចដោះស្រាយបានជម្រុញមក រដ្ឋបាលក្រុង ស្រុក ខណ្ឌ
            រដ្ឋបាលរាជធានី ខេត្ត និង ក្រសួង ស្ថាប័នថ្នាក់ជាតិ ដើម្បីដោះស្រាយ
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            ចំនួន {toKhmerNum(data.citizenRequestsEscalated)} ករណី
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap">
            ៧.២
          </td>
          <td className="border border-black border-t-0 p-3 font-siemreap" colSpan={2}>
            មុខងារ និងការទទួលខុសត្រូវ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៣
          </td>
          <td className="border border-black p-3 font-siemreap">
            ក្រុមប្រឹក្សាឃុំ សង្កាត់បានចូលរួមក្នុងគណៈគ្រប់គ្រងសាលារៀន
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasCouncilInSchoolManagement === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasCouncilInSchoolManagement === "មិនមាន" ? "☑" : "☐"}មិនមាន
          </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៤
          </td>
          <td className="border border-black p-3 font-siemreap">
            ចំនួនមត្តេយ្យសហគមន៍ក្នុងឃុំ សង្កាត់នីមួយៗ
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            ចំនួន {toKhmerNum(data.communityPreschoolsCount)} សាលាមត្តេយ្យសហគមន៍
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៥
          </td>
          <td className="border border-black p-3 font-siemreap">
            ឃុំ សង្កាត់ដែលបានគ្រប់គ្រងសហគមន៍តំបន់ការពារធម្មជាតិ
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasManagedProtectedArea === "មាន" ? "☑" : "☐"}មាន
          </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasManagedProtectedArea === "មិនមាន" ? "☑" : "☐"}មិនមាន
          </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៦
          </td>
          <td className="border border-black font-siemreap">
            <ol className="pl-5 space-y-1">
              <li>
                ចំនួនគម្រោងរបស់ឃុំ
                សង្កាត់ដែលបានបញ្ចូលភាពធន់នឹងការប្រែប្រួលអាកាសធាតុទៅក្នុងប្រព័ន្ធគ្រប់គ្រងការងារ
                ការផ្តល់សេវាសាធារណៈ និងការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធមូលដ្ឋាន
              </li>
              <li>
                ឃុំ សង្កាត់បានជំរុញការផ្សព្វផ្សាយ
                ដើម្បីបង្កើនការយល់ដឹងដល់ប្រជាពលរដ្ឋអំពី
                មូលហេតុនិងផលប៉ះពាល់នៃការប្រែប្រួលអាកាសធាតុ
              </li>
            </ol>
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            <ol className="pl-5 space-y-1">
              <li>ចំនួន {toKhmerNum(data.climateResilienceProjects)} គម្រោង</li>
              <li>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasClimateChangeAwareness === "បាន" ? "☑" : "☐"}បាន
          </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasClimateChangeAwareness === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៧
          </td>
          <td className="border border-black p-3 font-siemreap">
            ឃុំ សង្កាត់បានចូលរួមក្នុងគណៈកម្មការគ្រប់គ្រង
            ឬការគ្រប់គ្រងមណ្ឌលសុខភាព
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasCouncilInHealthManagement === "បាន" ? "☑" : "☐"}បាន
          </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasCouncilInHealthManagement === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៨
          </td>
          <td className="border border-black p-3 font-siemreap">
            ឃុំ សង្កាត់បានអនុវត្តមុខងារ
            និងការទទួលខុសត្រូវលើការងារកិច្ចការពារកុមារ
            និងគ្រប់គ្រងសេវាថែទាំកុមារ ដែលមានពិការភាព គ្មានទីពឹង
            និងក្រុមកុមារងាយរងគ្រោះ និង ងាយរងគ្រោះផ្សេងៗទៀតនៅក្នុងសហគមន៍
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasChildProtectionServices === "បាន" ? "☑" : "☐"}បាន
          </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasChildProtectionServices === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.៩
          </td>
          <td className="border border-black font-siemreap">
            <ol className="pl-5 space-y-1">
              <li>
                ឃុំ សង្កាត់ដែលបានចូលរួមគ្រប់គ្រងសំរាម សំណល់រឹង និងបញ្ហា
                បរិស្ថានផ្សេងៗទៀតក្នុងមូលដ្ឋានរបស់ខ្លួន
              </li>
            </ol>
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            <ol className="pl-5 space-y-1">
              <li>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasWasteManagement === "បាន" ? "☑" : "☐"}បាន
          </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasWasteManagement === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
              </li>
              <li>
                បើបាន ដូចជា៖
                <div className="whitespace-pre-line min-h-[3rem]">
                  {toKhmerNum(data.wasteManagementDetails)}
                </div>
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.១១
          </td>
          <td className="border border-black p-3 font-siemreap">
            ឃុំ សង្កាត់បានបង្កើត និងគ្រប់គ្រងផ្សារសហគមន៍នានា
            ដើម្បីបង្កលក្ខណៈងាយស្រួល ក្នុងការទិញលក់ទំនិញ និងផលិតផលនៅតាមមូលដ្ឋាន
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasManagedCommunityMarket === "បាន" ? "☑" : "☐"}បាន
          </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasManagedCommunityMarket === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.១២
          </td>
          <td className="border border-black p-3 font-siemreap">
            ចំនួនប្រជាពលរដ្ឋ ដែលជួបប្រទះនឹងបញ្ហាប្រឈមនានាពាក់ព័ន្ធគ្រោះមហន្តរាយ
            និងជំងឺឆ្លងរាតត្បាតនានាដែលជួយដោះស្រាយដោយឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[40%] pl-5 pr-4 font-siemreap text-justify align-top">
            ចំនួន {toKhmerNum(data.disasterAffectedCitizens)} នាក់
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.១៣
          </td>
          <td className="border border-black font-siemreap">
            <ol className="pl-5 space-y-1">
              <li>
                ឃុំ សង្កាត់ដែលបានរៀបចំ
                និងអនុវត្តគម្រោង/សកម្មភាពផ្គត់ផ្គង់ទឹកស្អាត និងអនាម័យ នៅក្នុងឃុំ
                សង្កាត់
              </li>
              <li>ចំនួនគម្រោងផ្គត់ផ្គង់ទឹកស្អាត</li>
              <li>ចំនួនគម្រោងកសាងបង្គន់អនាម័យ</li>
            </ol>
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            <ol className="pl-5 space-y-1">
              <li>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasCleanWaterSanitation === "បាន" ? "☑" : "☐"}បាន
          </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasCleanWaterSanitation === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
              </li>
              <li>
                ចំនួនគម្រោងផ្គត់ផ្គង់ទឹកស្អាតក្នុងឃុំ សង្កាត់{" "}
                {toKhmerNum(data.cleanWaterProjects)} គម្រោង
              </li>
              <li>
                ចំនួនគម្រោងកសាងបង្គន់អនាម័យក្នុងឃុំ សង្កាត់{" "}
                {toKhmerNum(data.toiletConstructionProjects)} គម្រោង
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.១៤
          </td>
          <td className="border border-black font-siemreap">
            <ol className="pl-5 space-y-1">
              <li>
                ឃុំ សង្កាត់ដែលបានរៀបចំ និងអនុវត្តគម្រោង/សកម្មភាព
                លើកកម្ពស់សមភាពយេនឌ័រ និងការទប់ស្កាត់អំពើហិង្សាក្នុងគ្រួសារ
              </li>
            </ol>
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            <ol className="pl-5 space-y-1">
              <li>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasGenderEqualityProjects === "បាន" ? "☑" : "☐"}បាន
          </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasGenderEqualityProjects === "មិនបាន" ? "☑" : "☐"}មិនបាន
          </label>
              </li>
              <li>
                បើបាន ចំនួន {toKhmerNum(data.genderEqualityProjectsCount)} គម្រោង
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.២.១៥
          </td>
          <td className="border border-black p-3 font-siemreap">
            មុខងារចាំបាច់ផ្សេងៗទៀត ដែលឃុំ
            សង្កាត់បានអនុវត្តដើម្បីឆ្លើយតបទៅនឹងតម្រូវការចាំបាច់របស់ប្រជាពលរដ្ឋនៅមូលដ្ឋាន
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            រួមមាន៖
            <div className="whitespace-pre-line min-h-[3rem]">
              {toKhmerNum(data.otherEssentialFunctions)}
            </div>
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap">
            ៧.៣
          </td>
          <td className="border border-black border-t-0 p-3 font-siemreap" colSpan={2}>
            ធនធានហិរញ្ញវត្ថុ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.៣.៤
          </td>
          <td className="border border-black font-siemreap">
            <ol className="pl-5 space-y-1">
              <li>
                ឃុំ
                សង្កាត់បានកៀរគរជំនួយឧបត្ថម្ភពីដៃគូអភិវឌ្ឍន៍នានាទាំងក្នុងប្រទេស
                ទាំងក្រៅប្រទេស និងពីសប្បុរសជន ដើម្បីអភិវឌ្ឍន៍ ឃុំ សង្កាត់
              </li>
              <li>ចំនួនថវិកាឃុំ សង្កាត់កៀរគរបាន</li>
            </ol>
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            <ol className="pl-5 space-y-1">
              <li>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
    {data.hasMobilizedDevelopmentSupport === "មាន" ? "☑" : "☐"}មាន
          </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
    {data.hasMobilizedDevelopmentSupport === "មិនមាន" ? "☑" : "☐"}មិនមាន
          </label>
              </li>
              <li>
                ចំនួនថវិកាឃុំ សង្កាត់កៀរគរបាន{" "}
                {toKhmerNum(data.mobilizedBudgetAmount)} រៀល
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap">
            ៧.៤
          </td>
          <td className="border border-black border-t-0 p-3 font-siemreap" colSpan={2}>
            ធនធានមនុស្ស
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៧.៤.៤
          </td>
          <td className="border border-black font-siemreap">
            <ol className="pl-5 space-y-1">
              <li>
                អាកប្បកិរិយាថ្លៃថ្នូរ ស្អាតស្អំ គោរពច្បាប់ មិនរើសអើង
                មានការគោរពស្រឡាញ់ និងជឿជាក់ពីប្រជាជន
              </li>
              <li>
                ចំនួនថ្នាក់ដឹកនាំភូមិដែលរងការបណ្ដឹង
                និងទទួលទណ្ឌកម្មវិន័យផ្នែករដ្ឋបាល និង ច្បាប់
              </li>
            </ol>
          </td>
          <td className="border border-black w-[40%] font-siemreap pr-4 text-justify align-top">
            <ol className="pl-5 space-y-1">
              <li>
                ថ្នាក់ដឹកនាំភូមិដែលមានបរិញ្ញាបត្រឡើង{" "}
                {toKhmerNum(data.villageLeadersWithBachelor)} នាក់
              </li>
              <li>
                ថ្នាក់ដឹកនាំភូមិដែលមានបរិញ្ញាបត្ររង{" "}
                {toKhmerNum(data.villageLeadersWithAssociate)} នាក់
              </li>
              <li>
                ថ្នាក់ដឹកនាំភូមិដែលមានមធ្យមសិក្សាទុតិយភូមិ{" "}
                {toKhmerNum(data.villageLeadersWithHighSchool)} នាក់
              </li>
              <li>
                ចំនួនថ្នាក់ដឹកនាំភូមិដែលរងការបណ្ដឹង
                និងទទួលទណ្ឌកម្មវិន័យផ្នែករដ្ឋបាល និង ច្បាប់{" "}
                {toKhmerNum(data.villageLeadersDisciplined)} នាក់
              </li>
            </ol>
          </td>
        </tr></tbody>
    </table>
  );
}

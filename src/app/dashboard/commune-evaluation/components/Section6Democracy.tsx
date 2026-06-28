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

interface Section6Props {
  data: Partial<EvaluationData>;
}

export default function Section6Democracy({ data }: Section6Props) {
  return (
    <table className="w-full border-collapse border border-black border-t-0">

      <tbody><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap bg-[#B4C6E7]">
            ៦
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap bg-[#B4C6E7]" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលលើកកម្ពស់ការអនុវត្តលទ្ធិប្រជាធិបតេយ្យ បង្កើនការចូលរួម និងការសហការរួមគ្នា ការពារសន្តិសុខសណ្តាប់ធ្នាប់ ធានាការរស់នៅសុខ្ន មិនមានអំពើហិង្សាក្នុងគ្រួសារ
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap bg-[#E8EDF8]">
            ៦.១
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap bg-[#E8EDF8]" colSpan={2}>
            ការលើកកម្ពស់ការយល់ដឹងចំពោះប្រជាពលរដ្ឋ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.១.១
          </td>
          <td className="border border-black p-1 font-siemreap">
            ការវាយតម្លៃការដោះស្រាយបញ្ហាប្រឈម និងតម្រូវការរបស់ប្រជាជនរបស់ ក្រុមប្រឹក្សាឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-justify align-top">
            ចំនួននៃការវាយតម្លៃការដោះស្រាយបញ្ហាប្រឈម និងតម្រូវការរបស់ប្រជាជនរបស់ ក្រុមប្រឹក្សាឃុំ សង្កាត់{" "}
            {toKhmerNum(data.problemsAssessmentSessions)}%
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.១.៣
          </td>
          <td className="border border-black font-siemreap">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមប្រជុំក្រុមប្រឹក្សា ឃុំ សង្កាត់
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.citizensParticipatingCouncilMeetings)} នាក់</li>
              <li>២. រួមមាន៖ {toKhmerNum(data.citizenParticipationMechanisms)}</li>
            </ol>
          </td>
        </tr><tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap bg-[#E8EDF8]">
            ៦.២
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap bg-[#E8EDF8]" colSpan={2}>
            ការលើកកម្ពស់យុត្តិធម៌សង្គម
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.២.៥
          </td>
          <td className="border border-black p-1 font-siemreap">ភាគរយនៃការដោះស្រាយវិវាទនៅមូលដ្ឋានដោយឃុំ សង្កាត់</td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-justify align-top">
            ចំនួន {toKhmerNum(data.disputeResolutionRate)} %
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.២.៦
          </td>
          <td className="border border-black p-1 font-siemreap">
            ចំនួនកម្មវិធីផ្សព្វផ្សាយ និងអប់រំអំពីច្បាប់ និងយន្តការដោះស្រាយវិវាទក្រៅប្រព័ន្ធតុលាការ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-justify align-top">
            ចំនួន {toKhmerNum(data.legalAwarenessProgramsCount)} ដង
          </td>
        </tr><tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap bg-[#E8EDF8]">
            ៦.៣
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap bg-[#E8EDF8]" colSpan={2}>
            លើកកម្ពស់ភាពស្អាតស្អំ និងការចាត់វិធានការប្រឆាំងអំពើពុករលួយ និងការរំលោភអំណាច
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.៣.៣
          </td>
          <td className="border border-black p-1 font-siemreap">
            ចំនួនអធិការកិច្ចលើការបំពេញការងាររបស់ក្រុមប្រឹក្សាឃុំ សង្កាត់ ក្នុងរយៈពេល៥ឆ្នាំ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-justify align-top">
            ចំនួន {toKhmerNum(data.councilInspectionsCount)} ដងក្នុងរយៈពេល៥ឆ្នាំ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.៣.៤
          </td>
          <td className="border border-black font-siemreap">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១. ចំនួនក្រុមប្រឹក្សាឃុំ សង្កាត់ដែលប្រព្រឹត្តអំពើពុករលួយ ឬរំលោភបំពានអំណាចក្នុងការអនុវត្តតួនាទី ភារកិច្ច និងការទទួលខុសត្រូវរបស់ខ្លួនត្រូវទទួលរងវិធានការត្រួតពិនិត្យ និងទណ្ឌកម្មវិន័យរដ្ឋបាល និងការអនុវត្តតាមច្បាប់ជាធរមាន
              </li>
              <li>២. ចំនួនស្មៀនដែលប្រព្រឹត្តអំពើពុករលួយ ឬរំលោភបំពានអំណាចក្នុងការអនុវត្តតួនាទី ភារកិច្ច និងការទទួលខុសត្រូវរបស់ខ្លួនត្រូវទទួលរងវិធានការត្រួតពិនិត្យ និងទណ្ឌកម្មវិន័យរដ្ឋបាល និងការអនុវត្តតាមច្បាប់ជាធរមាន</li>
              <li>៣. ចំនួនថ្នាក់ដឹកនាំភូមិដែលប្រព្រឹត្តអំពើពុករលួយ ឬរំលោភបំពានអំណាចក្នុងការអនុវត្តតួនាទី ភារកិច្ច និងការទទួលខុសត្រូវរបស់ខ្លួនត្រូវទទួលរងវិធានការត្រួតពិនិត្យ និងទណ្ឌកម្មវិន័យរដ្ឋបាល និងការអនុវត្តតាមច្បាប់ជាធរមាន</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនក្រុមប្រឹក្សាឃុំ សង្កាត់ដែលប្រព្រឹត្តអំពើពុករលួយ ឬរំលោភបំពានអំណាចក្នុងការអនុវត្តតួនាទី ភារកិច្ច និងការទទួលខុសត្រូវរបស់ខ្លួនត្រូវទទួលរងវិធានការត្រួតពិនិត្យ និងទណ្ឌកម្មវិន័យរដ្ឋបាល និងការអនុវត្តតាមច្បាប់ជាធរមាន {toKhmerNum(data.disciplinedCouncilMembers)} នាក់</li>
              <li>២. ចំនួនស្មៀនដែលប្រព្រឹត្តអំពើពុករលួយ ឬរំលោភបំពានអំណាចក្នុងការអនុវត្តតួនាទី ភារកិច្ច និងការទទួលខុសត្រូវរបស់ខ្លួនត្រូវទទួលរងវិធានការត្រួតពិនិត្យ និងទណ្ឌកម្មវិន័យរដ្ឋបាល និងការអនុវត្តតាមច្បាប់ជាធរមាន {toKhmerNum(data.disciplinedVillageChiefs)} នាក់</li>
              <li>៣. ចំនួនថ្នាក់ដឹកនាំភូមិដែលប្រព្រឹត្តអំពើពុករលួយ ឬរំលោភបំពានអំណាចក្នុងការអនុវត្តតួនាទី ភារកិច្ច និងការទទួលខុសត្រូវរបស់ខ្លួនត្រូវទទួលរងវិធានការត្រួតពិនិត្យ និងទណ្ឌកម្មវិន័យរដ្ឋបាល និងការអនុវត្តតាមច្បាប់ជាធរមាន {toKhmerNum(data.disciplinedCommuneLeaders)} នាក់</li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap align-top">
            ៦.៣.៥
          </td>
          <td className="border border-black p-1 font-siemreap">ឃុំ សង្កាត់ធ្លាប់បានទទួលការលើកទឹកចិត្ត និងរង្វាន់លើកទឹកចិត្ត</td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasReceivedIncentives === "មាន" ? "☑" : "☐"}មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasReceivedIncentives === "មិនមាន" ? "☑" : "☐"}មិនមាន
            </label>
          </td>
        </tr></tbody>
    </table>
  );
}
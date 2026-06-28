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

interface Section4Props {
  data: Partial<EvaluationData>;
}

export default function Section4Economy({ data }: Section4Props) {
  return (
    <table className="w-full border-collapse border border-black border-t-0">

      <tbody><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#B4C6E7]">
            ៤
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#B4C6E7]" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលមានការអភិវឌ្ឍសេដ្ឋកិច្ចមូលដ្ឋាន
            ដើម្បីលើកកម្ពស់ជីវភាពរស់នៅរបស់ប្រជាពលរដ្ឋ
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៤.១
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការលើកកម្ពស់របរ មុខរបរ និងវគ្គបណ្តុះបណ្តាលវិជ្ជាជីវៈដល់ប្រជាពលរដ្ឋ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.១.១
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១. ចំនួនសហគ្រាសខ្នាតតូចដើម្បីជីវភាព និងកែច្នៃផលិតផលក្នុងឃុំ
                សង្កាត់ជាផ្លូវការ លក្ខណៈ គ្រួសារ ឬសហគមន៍ដែលបានបង្កើត
              </li>
              <li>
                ២. ចំនួនសហគ្រាសខ្នាតតូចដើម្បីជីវភាព និងកែច្នៃផលិតផលក្នុងឃុំ
                សង្កាត់ជាផ្លូវការ លក្ខណៈ គ្រួសារ ឬសហគមន៍ដែលទទួលបានចុះបញ្ជីដោយឃុំ
                សង្កាត់
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.smallBusinessesCount)} សហគ្រាស</li>
              <li>
                ២. ចំនួន {toKhmerNum(data.registeredSmallBusinesses)} សហគ្រាស
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.១.២
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ការផ្សព្វផ្សាយព័ត៌មានគ្រប់គ្រងហិរញ្ញវត្ថុដល់ប្រជាពលរដ្ឋនៅក្នុងឃុំ
            សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                {data.hasFinancialLiteracy === "បាន" ? "☑" : "☐"}បាន
              </label>
              <label className="inline-flex items-center gap-1 cursor-not-allowed">
                {data.hasFinancialLiteracy === "មិនបាន" ? "☑" : "☐"}មិនបាន
              </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.១.៣
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ការបង្កើតយន្តការបណ្តុះបណ្តាលជំនាញដល់យុវជនក្នុងឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                {data.hasYouthSkillsTraining === "មាន" ? "☑" : "☐"}មាន
              </label>
              <label className="inline-flex items-center gap-1 cursor-not-allowed">
                {data.hasYouthSkillsTraining === "មិនមាន" ? "☑" : "☐"}មិនមាន
              </label>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.១.៤
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ការបង្កើតផ្សារសហគមន៍ក្នុងឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            រួមមាន {toKhmerNum(data.hasCommunityMarket)}
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៣.១
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១. ការផ្សព្វផ្សាយអំពីសារៈសំខាន់
                និងការចូលរួមរបស់ប្រជាពលរដ្ឋក្នុងការថែរក្សា ការពារ
                សម្បត្តិវប្បធម៌ បេតិកភណ្ឌជាតិ អត្តសញ្ញាណ និងប្រពៃណី
                ទំនៀមទម្លាប់ដ៏ថ្លៃថ្លារបស់ជាតិនៅក្នុងឃុំ សង្កាត់
              </li>
              <li>
                ២. ការបណ្តុះបណ្តាលអំពីជំនាញសិល្បៈ សិល្បៈស្មូន
                និងសិល្បៈកម្រដទៃទៀតរបស់ប្រជាជន នៅតាមមូលដ្ឋាន
                និងសហគមន៍ជនជាតិដើមភាគតិច
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasCulturalPromotion === "មាន" ? "☑" : "☐"}មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasCulturalPromotion === "មិនមាន" ? "☑" : "☐"}មិនមាន
                </label>
              </li>
              <li>
                ២.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasArtsTraining === "បាន" ? "☑" : "☐"}បាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasArtsTraining === "មិនបាន" ? "☑" : "☐"}មិនបាន
                </label>
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៣.២
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនករណីបទល្មើសធនធានធម្មជាតិដែលត្រូវបានទប់ស្កាត់ ឬបង្ក្រាប
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.naturalResourceCrimeCases)} ករណី
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៣.៤
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ
            សង្កាត់បានបញ្ចូលគម្រោងការបង្កើតមុខរបរថ្មីៗសម្រាប់សហគមន៍តំបន់ការពារធម្មជាតិទៅក្នុងផែនការអភិវឌ្ឍន៍
            និងកម្មវិធីវិនិយោគបីឆ្នាំរំកិលឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasNewMarketProjects === "មាន" ? "☑" : "☐"}មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasNewMarketProjects === "មិនមាន" ? "☑" : "☐"}មិនមាន
                </label>
              </li>
              <li>
                ២. ប្រសិនបើមាន មានមុខរបរអ្វីខ្លះ៖{" "}
                {toKhmerNum(data.newMarketDetails)}
              </li>
            </ol>
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៣.៦
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនសហគមន៍ទេសចរណ៍ មូលដ្ឋានដែលបានបង្កើតក្នុងឃុំ
            សង្កាត់ដែលមានតំបន់ទេសចរណ៍
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.tourismCommunities)} សហគមន៍
          </td>
        </tr><tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៤.៤
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការអភិវឌ្ឍ និងគ្រប់គ្រងផ្សារ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៤.២
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ចំនួនផ្សារដែលបានសាងសង់ កែលម្អ ឬរៀបចំឡើងវិញដែលបានដំណើរការ
            និងមានលក្ខណៈសមស្របនៅក្នុងឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.marketCount)} ផ្សារ
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៤.៣
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនផ្សារដែលមានគណៈកម្មការគ្រប់គ្រង</li>
              <li>
                ២. ការគ្រប់គ្រងផ្សារនៅតាមមូលដ្ឋានឃុំ សង្កាត់ឱ្យមានសុវត្ថិភាព
                សណ្តាប់ធ្នាប់ អនាម័យ និងបរិស្ថានល្អ
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.hasMarketManagement)} ផ្សារ</li>
              <li>
                ២.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.marketManagementQuality === "ល្អ" ? "☑" : "☐"}ល្អ
                </label>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.marketManagementQuality === "មធ្យម" ? "☑" : "☐"}មធ្យម
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.marketManagementQuality === "មិនទាន់បានល្អ" ? "☑" : "☐"}មិនទាន់បានល្អ
                </label>
              </li>
            </ol>
          </td>
        </tr><tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៤.៥
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការអភិវឌ្ឍសេដ្ឋកិច្ចមូលដ្ឋាននៅតាមតំបន់ព្រំដែន
          </td>
        </tr><tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៤.៥.១
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ចំនួនគម្រោងហេដ្ឋារចនាសម្ព័ន្ធដែលបានសាងសង់ ឬកែលម្អនៅតំបន់ព្រំដែន
                (គម្រោងហេដ្ឋារចនាសម្ព័ន្ធអ្វីខ្លះ?) *(បំពេញដោយឃុំ សង្កាត់ដែលនៅជាប់ព្រំដែន)*
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            ចំនួន {toKhmerNum(data.borderAreaInfrastructureProjects)} គម្រោង រួមមាន៖
            <div className="mt-2 whitespace-pre-line min-h-[3rem]">
              {toKhmerNum(data.borderAreaInfrastructureDetails)}
            </div>
          </td>
        </tr><tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៤.៦
          </td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            ការលើកកម្ពស់ភាពជាដៃគូផ្សារភ្ជាប់ជាមួយសហគមន៍មូលដ្ឋាន អង្គការសង្គមស៊ីវិល និងផ្នែកឯកជន
          </td>
        </tr></tbody>
    </table>
  );
}
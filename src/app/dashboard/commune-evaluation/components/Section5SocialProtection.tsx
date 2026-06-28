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

interface Section5Props {
  data: Partial<EvaluationData>;
}

export default function Section5SocialProtection({ data }: Section5Props) {
  return (
    <table className="w-full border-collapse border border-black border-t-0">
      <tbody>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#B4C6E7]">
            ៥
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#B4C6E7]"
            colSpan={2}
          >
            ជាឃុំ សង្កាត់ដែលលើកកម្ពស់ការគាំពារសង្គម លើកកម្ពស់ស្ថានភាពរបស់ស្ត្រី
            យុវជន និងកុមារ ជនមានពិការភាព ជនចាស់ជរា ជនជាតិដើមភាគតិច អតីតយុទ្ធជន
            គ្រួសារក្រីក្រ និងក្រុមជនងាយរងគ្រោះផ្សេងៗទៀត
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៥.២
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]"
            colSpan={2}
          >
            ការលើកកម្ពស់ស្ថានភាពរបស់ស្ត្រី យុវជន និងកុមារ
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៥.២.៦
          </td>
          <td className="border border-black p-1 font-siemreap text-xs">
            ឃុំ សង្កាត់បានអនុវត្តសកម្មភាព និងផ្តល់សេវាថែទាំកុមារដែលមានពិការភាព
            មិនមានទីពឹង និងក្រុមកុមារងាយរងគ្រោះផ្សេងៗទៀត
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasDisabledChildCareServices === "បាន" ? "☑" : "☐"}បាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasDisabledChildCareServices === "មិនបាន" ? "☑" : "☐"}មិនបាន
            </label>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៥.៣
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]"
            colSpan={2}
          >
            ការគាំពារជនជាតិដើមភាគតិច
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៥.៣.២
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ឃុំ
                សង្កាត់ដែលមានជនជាតិដើមភាគតិចបានដាក់បញ្ចូលតម្រូវការនានារបស់ជនជាតិ
                ដើមភាគតិចទៅក្នុងកម្មវិធីវិនិយោគបីឆ្នាំរំកិលឃុំ សង្កាត់
                និងសកម្មភាពអភិវឌ្ឍន៍នានា
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១. ឃុំ
                សង្កាត់ដែលមានជនជាតិដើមភាគតិចបានដាក់បញ្ចូលតម្រូវការនានារបស់ជនជាតិ
                ដើមភាគតិចទៅក្នុងកម្មវិធីវិនិយោគបីឆ្នាំរំកិលឃុំ សង្កាត់
                និងសកម្មភាពអភិវឌ្ឍន៍នានា
              </li>
              <li>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.minorityNeedsIncluded === "បាន" ? "☑" : "☐"}បាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.minorityNeedsIncluded === "មិនបាន" ? "☑" : "☐"}មិនបាន
                </label>
              </li>
              <li>
                ២. បើបានដាក់បញ្ចូល មានគម្រោងចំនួនប៉ុន្មានបានអនុវត្ត? ចំនួន{" "}
                {toKhmerNum(data.minorityProjectsImplemented)} គម្រោង
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៥.៣.៤
          </td>
          <td className="border border-black font-siemreap text-xs p-1">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១.
                ចំនួនជនជាតិដើមភាគតិចជាបេក្ខជនឈរឈ្មោះបោះឆ្នោតជ្រើសរើសក្រុមប្រឹក្សាឃុំ
                សង្កាត់ក្នុងឆ្នាំ២០២២
              </li>
              <li>
                ២. ចំនួនជនជាតិដើមភាគតិចជាសមាជិកក្រុមប្រឹក្សាឃុំ
                សង្កាត់សម្រាប់អាណត្តិឆ្នាំ២០២២-២០២៦
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top p-1">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.minorityCandidates2022)} នាក់</li>
              <br />
              <li>
                ២. ចំនួន {toKhmerNum(data.minorityCouncilMembers2022to2026)}{" "}
                នាក់
              </li>
            </ol>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៥.៤
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]"
            colSpan={2}
          >
            ការគាំពារជនពិការ និងជនចាស់ជរា
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs">
            ៥.៤.១
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១. ឃុំ សង្កាត់ដែលបានបង្កើតមូលនិធិសម្រាប់គាំទ្រជនមានពិការភាព
                និងចាស់ជរា នៅតាសហគមន៍
              </li>
              <li>
                ២. ឃុំ សង្កាត់មានសហគមន៍ជនពិការ
                និងជនចាស់ជរារួមគ្គាសំរាប់ដំណើរការការងារក្នុងឃុំ សង្កាត់ ឱ្យមាន
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasSupportInfrastructureForDisabledElderly === "មាន"
                    ? "☑"
                    : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasSupportInfrastructureForDisabledElderly === "មិនមាន"
                    ? "☑"
                    : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>
                ២.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasCommunityCareFacility === "មាន" ? "☑" : "☐"}មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasCommunityCareFacility === "មិនមាន" ? "☑" : "☐"}មិនមាន
                </label>
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៥.៤.៤
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១.
                ចំនួនជនមានពិការភាពជាបេក្ខជនឈរឈ្មោះបោះឆ្នោតជ្រើសរើសក្រុមប្រឹក្សាឃុំ
                សង្កាត់ក្នុងឆ្នាំ២០២២
              </li>
              <li>
                ២. ចំនួនជនមានពិការភាពជាសមាជិកក្រុមប្រឹក្សាឃុំ
                សង្កាត់សម្រាប់អាណត្តិឆ្នាំ២០២២-២០២៦
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.disabledCandidates2022)} នាក់</li>
              <li>
                ២. ចំនួន {toKhmerNum(data.disabledCouncilMembers2022to2026)}{" "}
                នាក់
              </li>
            </ol>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៥.៥
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]"
            colSpan={2}
          >
            ការគាំពារជនក្រីក្រ
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top ">
            ៥.៥.២
          </td>
          <td className="border border-black font-siemreap text-xs p-1">
            ចំនួនគ្រួសារក្រីក្រដែលជួបការលំបាក (ជនអនាថា ផ្ទុកមេរោគអេដស៍/ជំងឺអេដស៍
            និងកុមារ និងចាស់ជរា) ដែលទទួលបានជំនួយសង្គ្រោះបន្ទាប់ន់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.poorHouseholdsReliefCount)} គ្រួសារ
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">
            ៥.៦
          </td>
          <td
            className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]"
            colSpan={2}
          >
            ការលើកកម្ពស់សមធម៌សង្គម
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៥.៦.១
          </td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១. ឃុំ
                សង្កាត់មានផែនការបញ្ជ្រាបយេនឌ័រទៅក្នុងការអនុវត្តការងារសេវាគ្របដណ្តប់ពលរដ្ឋផ្សេងៗគ្នារវាងស្ត្រី
                យុវជន កុមារ ជនមានពិការភាព ជនចាស់ជរា និងជនជាតិ
                ដើមភាគតិចទៅក្នុងកម្មវិធីវិនិយោគបីឆ្នាំរំកិលឃុំ សង្កាត់
                និងសកម្មភាពអភិវឌ្ឍន៍នានា
              </li>
              <li>
                ២. ចំនួនសហគ្រាសខ្នាតតូចដែលដឹកនាំ និងគ្រប់គ្រងដោយស្ត្រី និងកុមារ
                ប្រយោជន៍របស់ប្រជាពលរដ្ឋផ្សេងទៀត
              </li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>
                ១.
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasGenderMainstreamingPlan === "មាន" ? "☑" : "☐"}មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasGenderMainstreamingPlan === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <br />
              <br />
              <li>
                ២. ចំនួន {toKhmerNum(data.womenChildrenLedSmallBusinesses)}{" "}
                សហគ្រាស
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">
            ៥.៦.២
          </td>
          <td className="border border-black font-siemreap text-xs p-1">
            តើក្នុងឃុំ សង្កាត់មានក្នុងផែនការ
            និងកម្មវិធីបញ្ជ្រាបយេនឌ័រសម្រាប់ប្រជាជនជាជនបង្គោល ស្ត្រី យុវជន កុមារ
            ជនមានពិការភាព ជនចាស់ជរា និងជនជាតិដើមភាគតិច
            ក្នុងការទទួលព័ត៌មានសាធារណៈនានា ការវិភាគយេនឌ័រ
            និងការផ្សព្វផ្សាយផ្សេងៗ ?
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top p-1">
            រួមមាន
            <div className="whitespace-pre-line min-h-[3rem">
              {toKhmerNum(data.genderMainstreamingPlanDetails)}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

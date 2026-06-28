import type { EvaluationData } from "@/lib/evaluation-schema";

const khmerDigits: Record<string, string> = {
  "0": "០", "1": "១", "2": "២", "3": "៣", "4": "៤",
  "5": "៥", "6": "៦", "7": "៧", "8": "៨", "9": "៩",
};

function toKhmerNum(value: string | undefined) {
  const text = (value || "").replace(/\d/g, (d) => khmerDigits[d]);
  return <span className="font-bold">{text}</span>;
}

interface Section2Props {
  data: Partial<EvaluationData>;
}

export default function Section2Security({ data }: Section2Props) {
  return (
    <table className="w-full border-collapse  border-black border-t-0">
      <tbody>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#B4C6E7]">២</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#B4C6E7]" colSpan={2}>
            ជាឃុំ សង្កាត់ដែលមានសន្តិសុខ របៀបរៀបរយ សណ្តាប់ធ្នាប់សាធារណៈ និងសុវត្ថិភាពសង្គមល្អប្រសើរ
          </td>
        </tr>
        <tr>
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">២.១</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            មិនមានបទល្មើសលួច ឆក់ ប្លន់ គ្រឿងញៀន ល្បែងស៊ីសងខុសច្បាប់ និងបទល្មើសផ្សេងៗទៀតក្នុងភូមិ ឃុំ សង្កាត់
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.១.៣</td>
          <td className="border border-black font-siemreap text-xs p-1">
            ចំនួនប្រជាការពារនៅតាមឃុំ សង្កាត់
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.communeGuardCount)} នាក់
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.១.៤</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនវគ្គបណ្តុះបណ្តាល និងពង្រឹងសមត្ថភាពប្រជាការពារ</li>
              <li>២. ការគាំទ្រផ្សេងៗដល់ប្រជាការពារ</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.communeGuardTrainingCount)} វគ្គបណ្តុះបណ្តាល និងពង្រឹងសមត្ថភាពប្រជាការពារ</li>
              <li>២. ការគាំទ្រផ្សេងៗដល់ប្រជាការពារ រួមមាន {toKhmerNum(data.communeGuardSupport)}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.១.៥</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនមន្ត្រីនគរបាលរដ្ឋបាលនៅឃុំ សង្កាត់នីមួយៗ</li>
              <li>២. ចំនួនវគ្គបណ្តុះបណ្តាលដែលផ្តល់ឱ្យប៉ុស្តិ៍នគរបាលរដ្ឋបាលឃុំ សង្កាត់</li>
              <li>៣. ការគាំទ្រផ្សេងៗដល់ប៉ុស្តិ៍នគរបាល</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.administrativePoliceCount)} នាក់</li>
              <li>២. ចំនួន {toKhmerNum(data.policeTrainingCount)} វគ្គ</li>
              <li>៣. រួមមាន {toKhmerNum(data.policeSupport)}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.១.៦</td>
          <td className="border border-black font-siemreap text-xs p-1">
            អត្រាបទល្មើសដែលបង្ក្រាបបាន បើប្រៀបធៀបនឹងបទល្មើសដែលកើតឡើង
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            ចំនួន {toKhmerNum(data.crimeSuppressionRate)} %
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.១.៧</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនកម្មវិធីអប់រំ និងផ្សព្វផ្សាយអំពីបញ្ហាបទល្មើស រៀបចំនៅតាមមូលដ្ឋាន តាមវត្តអារាម សាលារៀន និងទីតាំងនានា និងគ្រឿងញៀនដែលបាន</li>
              <li>២. ចំនួនប្រជាពលរដ្ឋចូលរួមកម្មវិធីអប់រំ និងផ្សព្វផ្សាយអំពីបញ្ហាបទល្មើស និងគ្រឿងញៀនដែលបានរៀបចំនៅតាមមូលដ្ឋាន តាមសាលារៀន និងទីតាំងនានា</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.crimeEducationPrograms)} កម្មវិធី</li>
              <li>២. ចំនួន {toKhmerNum(data.crimeEducationParticipants)} នាក់</li>
            </ol>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">២.២</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            មានសណ្តាប់ធ្នាប់សាធារណៈល្អ ជាពិសេសមិនមានគ្រោះថ្នាក់ចរាចរណ៍
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.២.១</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ឃុំ សង្កាត់ដែលរៀបចំឱ្យមានការសម្រួលចរាចរណ៍ ឆ្លងកាត់ផ្លូវសាធារណៈរបស់ប្រជាពលរដ្ឋ ជាពិសេសសិស្សានុសិស្ស</li>
              <li>២. ចំនួនស្លាកសញ្ញាចរាចរណ៍នៅក្នុងឃុំ សង្កាត់ (គ្រប់គ្រាន់ ឬមិនទាន់គ្រប់គ្រាន់ ឬមិនមាន)</li>
              <li>៣. ចំនួនគ្រោះថ្នាក់ចរាចរណ៍</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.hasTrafficManagement === "មាន" ? "☑" : "☐"}
                  មាន
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.hasTrafficManagement === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <br />
              <li>២. 
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.trafficSignsStatus === "គ្រប់គ្រាន់" ? "☑" : "☐"}
                  គ្រប់គ្រាន់
                </label>
                <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
                  {data.trafficSignsStatus === "មិនទាន់គ្រប់គ្រាន់" ? "☑" : "☐"}
                  មិនទាន់គ្រប់គ្រាន់
                </label>
                <label className="inline-flex items-center gap-1 cursor-not-allowed">
                  {data.trafficSignsStatus === "មិនមាន" ? "☑" : "☐"}
                  មិនមាន
                </label>
              </li>
              <li>៣. ចំនួន {toKhmerNum(data.trafficAccidentCases)} ករណី</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.២.២</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនទីប្រជុំជន សាលារៀន តំបន់ជុំវិញផ្សារ និងតំបន់ស្មុគស្មាញនានា ដែលមានសណ្តាប់ធ្នាប់ល្អ</li>
              <li>២. ចំនួនទីប្រជុំជន សាលារៀន តំបន់ជុំវិញផ្សារ និងតំបន់ស្មុគស្មាញនានាដែលមិនទាន់មានសណ្តាប់ធ្នាប់ល្អ</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.orderlyPlaces)} កន្លែង</li>
              <li>២. ចំនួន {toKhmerNum(data.disorderlyPlaces)} កន្លែង</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.២.៣</td>
          <td className="border border-black font-siemreap text-xs p-1">
            ឃុំ សង្កាត់ដែលមានចំណតសាធារណៈ
          </td>
          <td className="border border-black w-[45%] p-1 font-siemreap text-xs text-justify align-top">
            <label className="inline-flex items-center gap-1 mr-4 cursor-not-allowed">
              {data.hasPublicParking === "មាន" ? "☑" : "☐"}
              មាន
            </label>
            <label className="inline-flex items-center gap-1 cursor-not-allowed">
              {data.hasPublicParking === "មិនមាន" ? "☑" : "☐"}
              មិនមាន
            </label>
          </td>
        </tr>
        <tr>
          <td className="border border-black w-20 p-1 text-center font-siemreap text-xs align-top">២.២.៤</td>
          <td className="border border-black font-siemreap text-xs">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួនកម្មវិធីផ្សព្វផ្សាយ និងអប់រំច្បាប់ចរាចរណ៍</li>
              <li>២. ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមអប់រំផ្សព្វផ្សាយច្បាប់ចរាចរណ៍</li>
            </ol>
          </td>
          <td className="border border-black w-[45%] font-siemreap text-xs pr-4 text-justify align-top">
            <ol className="p-1 space-y-1 text-wrap">
              <li>១. ចំនួន {toKhmerNum(data.trafficLawEducationSessions)} វគ្គ</li>
              <li>២. ចំនួន {toKhmerNum(data.trafficLawEducationParticipants)} នាក់</li>
            </ol>
          </td>
        </tr>
        <tr data-pb="true">
          <td className="border border-black border-t-0 w-20 p-1 text-center font-siemreap text-xs bg-[#E8EDF8]">២.៣</td>
          <td className="border border-black border-t-0 p-1 font-siemreap text-xs bg-[#E8EDF8]" colSpan={2}>
            មិនមានអំពើអនាចារ មិនមានការជួញដូរមនុស្ស ជាពិសេសស្ត្រីនិងកុមារ មិនមានអំពើហិង្សាក្នុងគ្រួសារ និងមិនមានក្មេងទំនើង
          </td>
        </tr>
      </tbody>
    </table>
  );
}
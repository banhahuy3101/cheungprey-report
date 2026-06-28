import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { CommuneEvaluation } from "@/lib/commune-evaluation";

export function generatePDF(data: CommuneEvaluation, communeName: string) {
  const toKhmer = (v: string) => v.split("|")[1] || v;
  const toValue = (v: string) => {
    if (v === "yes") return "បាន/មាន";
    if (v === "no") return "ទេ/មិនមាន";
    if (v === "sufficient") return "គ្រប់គ្រាន់";
    if (v === "insufficient") return "មិនគ្រប់គ្រាន់";
    if (v === "none") return "មិនមាន";
    return v || "-";
  };

  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageW = 190;
  const margin = 10;
  let y = margin;

  const header = () => {
    doc.setFontSize(16);
    doc.text("សម្រាប់រដ្ឋបាលឃុំ/សង្កាត់នីមួយៗ", pageW / 2, y, { align: "center" });
    y += 7;
    doc.setFontSize(10);
    doc.text(`ខេត្ត: ${toKhmer(data.province)}    ស្រុក: ${toKhmer(data.district)}    ឃុំ: ${toKhmer(data.commune)}`, pageW / 2, y, { align: "center" });
    y += 7;
    doc.text(`អាណត្តិទី៥ (២០២២-២០២៧)`, pageW / 2, y, { align: "center" });
    y += 10;
  };

  const section = (title: string, rows: [string, string][]) => {
    if (y > 260) { doc.addPage(); y = margin; header(); }
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 5;
    autoTable(doc, {
      startY: y,
      margin: { left: margin },
      tableWidth: pageW,
      styles: { fontSize: 9, cellPadding: 1.5 },
      headStyles: { fillColor: [30, 64, 175] },
      body: rows.map(([label, val]) => [label, val]),
      columns: [{ header: "លក្ខណៈវិនិច្ឆ័យ", dataKey: 0 }, { header: "តម្លៃ", dataKey: 1 }],
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  };

  header();

  section("១. លទ្ធិប្រជាធិបតេយ្យ និងសិទ្ធិសេរីភាព", [
    ["ភាគរយចុះឈ្មោះបោះឆ្នោតជាតិ ២០២៣", toValue(data.voterRegistrationNational2023)],
    ["ភាគរយចុះឈ្មោះបោះឆ្នោតមូលដ្ឋាន ២០២២", toValue(data.voterRegistrationLocal2022)],
    ["ភាគរយអ្នកទៅបោះឆ្នោតជាតិ ២០២៣", toValue(data.voterTurnoutNational2023)],
    ["ភាគរយអ្នកទៅបោះឆ្នោតមូលដ្ឋាន ២០២២", toValue(data.voterTurnoutLocal2022)],
    ["អំពើហឹង្សាបោះឆ្នោតជាតិ", toValue(data.electionViolenceNational2023)],
    ["អំពើហឹង្សាបោះឆ្នោតមូលដ្ឋាន", toValue(data.electionViolenceLocal2022)],
    ["សមាជិកក្រុមប្រឹក្សាសរុប", toValue(data.totalCouncilMembers)],
    ["សមាជិកយុវជន", toValue(data.youthCouncilMembers)],
    ["ស្មៀន", toValue(data.totalClerks)],
    ["ប្រធានភូមិ", toValue(data.totalVillageLeaders)],
    ["ប្រធានភូមិយុវជន", toValue(data.youthVillageLeaders)],
    ["ការរំលោភសិទ្ធិមនុស្ស", toValue(data.humanRightsViolations)],
    ["អ្នកចូលរួមវេទិកាសាធារណៈ", toValue(data.publicForumAttendees)],
    ["អ្នកចូលរួមប្រជុំក្រុមប្រឹក្សា", toValue(data.councilMeetingAttendees)],
    ["គម្រោងសង្គម", toValue(data.totalSocialProjects)],
    ["សំណើពលរដ្ឋ", toValue(data.citizenRequestsCount)],
    ["ដោះស្រាយរួច", toValue(data.resolvedRequestsCount)],
  ]);

  section("២. សន្តិសុខសាធារណៈ", [
    ["ប្រជាការពារសរុប", toValue(data.totalSecurityGuards)],
    ["វគ្គបណ្តុះបណ្តាលប្រជាការពារ", toValue(data.guardTrainingSessions)],
    ["ការគាំទ្រប្រជាការពារ", toValue(data.guardSupportDetails)],
    ["នគរបាល", toValue(data.policeOfficersCount)],
    ["វគ្គបណ្តុះបណ្តាលនគរបាល", toValue(data.policeTrainingSessions)],
    ["អត្រាបង្ក្រាបបទល្មើស", toValue(data.crimeSuppressionRate)],
    ["កម្មវិធីអប់រំបទល្មើស", toValue(data.crimeEducationPrograms)],
    ["អ្នកចូលរួមអប់រំបទល្មើស", toValue(data.crimeEducationAttendees)],
    ["គ្រោះថ្នាក់ចរាចរណ៍", toValue(data.trafficAccidentsCount)],
    ["ផ្លាកសញ្ញាចរាចរណ៍", toValue(data.trafficSignsStatus)],
    ["កែសម្រួលសុវត្ថិភាពចរាចរណ៍", toValue(data.trafficSafetyAdjustment)],
    ["ទីសាធារណៈមានសណ្តាប់ធ្នាប់", toValue(data.orderlyPublicPlaces)],
    ["ទីសាធារណៈមិនមានសណ្តាប់ធ្នាប់", toValue(data.disorderlyPublicPlaces)],
    ["ចំណតរថយន្តសាធារណៈ", toValue(data.hasPublicParking)],
  ]);

  section("៣. សេវាសាធារណៈ និងហេដ្ឋារចនាសម្ព័ន្ធ", [
    ["ចុះបញ្ជីកំណើត", toValue(data.birthRegistrations)],
    ["ចុះបញ្ជីអាពាហ៍ពិពាហ៍", toValue(data.marriageRegistrations)],
    ["ចុះបញ្ជីមរណភាព", toValue(data.deathRegistrations)],
    ["សៀវភៅស្នាក់នៅ", toValue(data.residenceBooks)],
    ["អត្តសញ្ញាណប័ណ្ណ", toValue(data.nationalIds)],
    ["អ្នកទទួលសេវារដ្ឋបាល", toValue(data.administrativeServiceRecipients)],
    ["ផ្លូវបេតុង (ខ្សែ)", toValue(data.newConcreteRoadsCount)],
    ["ផ្លូវបេតុង (គ.ម)", toValue(data.newConcreteRoadsLength)],
    ["ផ្លូវកៅស៊ូ (ខ្សែ)", toValue(data.newAsphaltRoadsCount)],
    ["ផ្លូវកៅស៊ូ (គ.ម)", toValue(data.newAsphaltRoadsLength)],
    ["ជួសជុលផ្លូវ (ខ្សែ)", toValue(data.repairDirtRoadsCount)],
    ["ជួសជុលផ្លូវ (គ.ម)", toValue(data.repairDirtRoadsLength)],
    ["ប្រព័ន្ធប្រឡាយ (កន្លែង)", toValue(data.canalSystemsCount)],
    ["ប្រព័ន្ធប្រឡាយ (គ.ម)", toValue(data.canalSystemsLength)],
    ["ទឹកស្អាត", toValue(data.cleanWaterAccessPct)],
    ["ទឹកបំពង់", toValue(data.pipeWaterAccessPct)],
    ["អគ្គិសនី", toValue(data.electricityAccessPct)],
    ["ស្រះទឹកតូចៗ", toValue(data.smallWaterReservoirsCount)],
    ["បណ្តឹងដីធ្លី", toValue(data.landDisputeResolutions)],
    ["សហគមន៍សន្សំ", toValue(data.savingsCommunitiesCount)],
  ]);

  section("៤. អភិវឌ្ឍន៍សេដ្ឋកិច្ច", [
    ["សហគ្រាសខ្នាតតូចបង្កើតថ្មី", toValue(data.smallEnterprisesCreated)],
    ["សហគ្រាសខ្នាតតូចចុះបញ្ជី", toValue(data.smallEnterprisesRegistered)],
    ["បណ្តុះបណ្តាលគំនិតពាណិជ្ជកម្ម", toValue(data.farmersTrainedBusiness)],
    ["តាំងពិព័រណ៍សហគមន៍", toValue(data.hasCommunityExhibitions)],
    ["គ្រួសារកសិកម្ម", toValue(data.agriculturalFamiliesCount)],
    ["គ្រួសារប្រើគ្រឿងយន្ត", toValue(data.familiesUsingAgriMachinery)],
    ["សហគមន៍កសិកម្មថ្មី", toValue(data.agriculturalCommunitiesCreated)],
    ["គ្រួសារក្រទទួលគ្រាប់ពូជ", toValue(data.poorFamiliesReceivedSeeds)],
    ["ស្រះទឹកក្នុងគ្រួសារ", toValue(data.householdPondCommunities)],
    ["កសិដ្ឋានចិញ្ចឹមសត្វ", toValue(data.animalHusbandryFarms)],
    ["ឧស្សាហកម្មកែច្នៃ", toValue(data.agriProcessingIndustries)],
  ]);

  section("៥. ការពារសង្គម", [
    ["គ្រួសារក្រទទួលគ្រាប់ពូជ", toValue(data.poorFamiliesReceivedSeeds)],
    ["ចែកគ្រាប់ពូជទាន់ពេល", toValue(data.distributedSeedsTimely)],
    ["គណៈកម្មការគ្រប់គ្រងគម្រោង", toValue(data.hasProjectManagementCommittee)],
    ["យន្តការមតិត្រឡប់", toValue(data.feedbackMechanism)],
  ]);

  section("៦. អភិបាលកិច្ចល្អ", [
    ["សំណើពលរដ្ឋ", toValue(data.citizenRequestsCount)],
    ["ដោះស្រាយរួច", toValue(data.resolvedRequestsCount)],
    ["អ្នកចូលរួមផែនការ", toValue(data.planningProcessAttendees)],
    ["អ្នកទទួលសេវារដ្ឋបាល", toValue(data.administrativeServiceRecipients)],
    ["គេហទំព័រឃុំ", toValue(data.hasCommuneWebsite)],
  ]);

  section("៧. សមត្ថភាពស្ថាប័ន", [
    ["សមាជិកក្រុមប្រឹក្សាសរុប", toValue(data.totalCouncilMembers)],
    ["ស្មៀន", toValue(data.totalClerks)],
    ["ប្រធានភូមិ", toValue(data.totalVillageLeaders)],
    ["វគ្គបណ្តុះបណ្តាលនគរបាល", toValue(data.policeTrainingSessions)],
    ["វគ្គបណ្តុះបណ្តាលប្រជាការពារ", toValue(data.guardTrainingSessions)],
    ["យន្តការមតិត្រឡប់", toValue(data.feedbackMechanism)],
  ]);

  doc.save(`របាយការណ៍វាយតម្លៃ_${communeName}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

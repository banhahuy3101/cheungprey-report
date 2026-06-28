function toLabel(v: unknown, khmerTrue?: string, khmerFalse?: string): string {
  if (v === "yes" || v === "មាន" || v === "បាន") return khmerTrue ?? "មាន";
  if (v === "no" || v === "មិនមាន" || v === "មិនបាន") return khmerFalse ?? "មិនមាន";
  if (v === "sufficient") return "គ្រប់គ្រាន់";
  if (v === "insufficient") return "មិនគ្រប់គ្រាន់";
  if (v === "none") return "មិនមាន";
  if (v === "ល្អ") return "ល្អ";
  if (v === "មធ្យម") return "មធ្យម";
  if (v === "មិនទាន់បានល្អ") return "មិនទាន់បានល្អ";
  return String(v ?? "-");
}

function khmerNum(s: string): string {
  const map: Record<string, string> = { "0": "០","1": "១","2": "២","3": "៣","4": "៤","5": "៥","6": "៦","7": "៧","8": "៨","9": "៩" };
  return String(s).replace(/[0-9]/g, (d) => map[d] ?? d);
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 10px;border:1px solid #d1d5db;font-size:13px;background:#f9fafb">${label}</td><td style="padding:6px 10px;border:1px solid #d1d5db;font-size:13px">${value}</td></tr>`;
}

function section(title: string, rows: string): string {
  return `<div style="margin-bottom:24px"><h3 style="font-size:15px;font-weight:600;color:#1e3a5f;margin:0 0 8px;padding:8px 12px;background:#e8f0fe;border-radius:4px">${title}</h3><table style="width:100%;border-collapse:collapse">${rows}</table></div>`;
}

export function generateEvaluationHtml(record: Record<string, unknown>): string {
  const v = (key: string): string => {
    const val = record[key];
    if (val === undefined || val === null || val === "") return "-";
    return khmerNum(String(val));
  };

  const c = (key: string, t?: string, f?: string): string => {
    const val = record[key];
    if (val === undefined || val === null || val === "") return "-";
    return toLabel(val, t, f);
  };

  const province = v("province");
  const district = v("district");
  const commune = v("commune");
  const mandateNumber = v("mandateNumber");
  const mandateYearStart = v("mandateYearStart");
  const mandateYearEnd = v("mandateYearEnd");

  const s1rows = [
    row("ភាគរយចំនួនប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតតំណាងរាស្ត្រ២០២៣", v("registeredVotersNational2023")),
    row("ភាគរយចំនួនប្រជាពលរដ្ឋគ្រប់អាយុ១៨ឆ្នាំ ទៅចុះឈ្មោះបោះឆ្នោតឃុំ សង្កាត់២០២២", v("registeredVotersCommune2022")),
    row("ភាគរយនៃចំនួនប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោតតំណាងរាស្ត្រ២០២៣", v("voterTurnoutNational2023")),
    row("ភាគរយនៃចំនួនប្រជាពលរដ្ឋមានឈ្មោះបោះឆ្នោតបានទៅបោះឆ្នោតឃុំ សង្កាត់២០២២", v("voterTurnoutCommune2022")),
    row("ករណីអំពើហិង្សាពាក់ព័ន្ធនឹងការបោះឆ្នោតតំណាងរាស្ត្រ២០២៣", v("violenceCasesNational2023")),
    row("ករណីអំពើហិង្សាពាក់ព័ន្ធនឹងការបោះឆ្នោតឃុំ សង្កាត់២០២២", v("violenceCasesCommune2022")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ", v("highSchoolDiploma")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្ររង", v("associateDegree")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្រ", v("bachelorDegree")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់មានបរិញ្ញាបត្រជាន់ខ្ពស់ឡើង", v("masterDegree")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ដែលត្រូវដកចេញពីមុខតំណែង", v("removedCouncilMembers")),
    row("ចំនួនសរុបនៃសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់", v("totalCouncilMembers")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាស្រ្តី", v("femaleCouncilMembers")),
    row("ចំនួនសមាជិកក្រុមប្រឹក្សាឃុំ សង្កាត់ជាយុវជន", v("youthCouncilMembers")),
    row("ចំនួនសរុបស្មៀនឃុំ សង្កាត់", v("totalClerks")),
    row("ចំនួនសរុបស្មៀនឃុំ សង្កាត់ជាស្រ្តី", v("femaleClerks")),
    row("ចំនួនស្មៀនឃុំ សង្កាត់ជាយុវជន", v("youthClerks")),
    row("ចំនួនសរុបថ្នាក់ដឹកនាំភូមិ", v("totalVillageLeaders")),
    row("ចំនួនថ្នាក់ដឹកនាំភូមិជាស្រ្តី", v("femaleVillageLeaders")),
    row("ចំនួនថ្នាក់ដឹកនាំភូមិជាយុវជន", v("youthVillageLeaders")),
    row("ករណីរំលោភសិទ្ធិមនុស្ស", v("humanRightsViolations")),
    row("ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមវេទិកាសាធារណៈ", v("publicForumParticipants")),
    row("ចំនួនប្រជាពលរដ្ឋដែលបានចូលរួមកិច្ចប្រជុំក្រុមប្រឹក្សា", v("councilMeetingParticipants")),
    row("ចំនួនប្រជាពលរដ្ឋចូលរួមរៀបចំផែនការអភិវឌ្ឍន៍", v("planningProcessParticipants")),
    row("គណៈកម្មការគ្រប់គ្រងគម្រោង", c("hasProjectManagementCommittee")),
    row("ចំនួនប្រជាពលរដ្ឋទទួលសេវារដ្ឋបាល", v("administrativeServiceRecipients")),
    row("ចំនួនគម្រោងសេវាសង្គម និងហេដ្ឋារចនាសម្ព័ន្ធ", v("communityProjectsCount")),
    row("សំណើ សំណូមពរ ក្តីកង្វល់", v("serviceRequestCases")),
    row("ការដោះស្រាយសំណើ សំណូមពរ", v("serviceResolvedCases")),
    row("វិវាទពាក់ព័ន្ធនឹងជំនឿ ប្រពៃណី និងសាសនា", v("religiousDisputeCases")),
    row("វិវាទពាក់ព័ន្ធនឹងនយោបាយ", v("politicalDisputeCases")),
    row("មណ្ឌល ទីធ្លាសាធារណៈ ឬអគារវប្បធម៌", c("hasCommunityCulturalSpace")),
  ].join("");

  const s2rows = [
    row("ចំនួនប្រជាការពារ", v("communeGuardCount")),
    row("វគ្គបណ្តុះបណ្តាលប្រជាការពារ", v("communeGuardTrainingCount")),
    row("ការគាំទ្រប្រជាការពារ", c("communeGuardSupport")),
    row("ចំនួនមន្ត្រីនគរបាលរដ្ឋបាល", v("administrativePoliceCount")),
    row("វគ្គបណ្តុះបណ្តាលនគរបាល", v("policeTrainingCount")),
    row("ការគាំទ្រនគរបាល", c("policeSupport")),
    row("អត្រាបង្ក្រាបបទល្មើស", v("crimeSuppressionRate")),
    row("កម្មវិធីអប់រំបទល្មើស", v("crimeEducationPrograms")),
    row("អ្នកចូលរួមអប់រំបទល្មើស", v("crimeEducationParticipants")),
    row("ការសម្រួលចរាចរណ៍", c("hasTrafficManagement")),
    row("ស្លាកសញ្ញាចរាចរណ៍", c("trafficSignsStatus")),
    row("គ្រោះថ្នាក់ចរាចរណ៍", v("trafficAccidentCases")),
    row("ទីប្រជុំជនមានសណ្តាប់ធ្នាប់", v("orderlyPlaces")),
    row("ទីប្រជុំជនមិនទាន់មានសណ្តាប់ធ្នាប់", v("disorderlyPlaces")),
    row("ចំណតសាធារណៈ", c("hasPublicParking")),
    row("វគ្គអប់រំច្បាប់ចរាចរណ៍", v("trafficLawEducationSessions")),
    row("អ្នកចូលរួមអប់រំច្បាប់ចរាចរណ៍", v("trafficLawEducationParticipants")),
  ].join("");

  const s3rows = [
    row("ចំនួនអ្នកទទួលសេវារដ្ឋបាល", v("serviceRecipientsCount")),
    row("បញ្ជីកំណើត", v("birthRegistrations")),
    row("បញ្ជីអាពាហ៍ពិពាហ៍", v("marriageRegistrations")),
    row("បញ្ជីមរណភាព", v("deathRegistrations")),
    row("សៀវភៅស្នាក់នៅ", v("residenceBookIssued")),
    row("អត្តសញ្ញាណប័ណ្ណ", v("identityCardsIssued")),
    row("មធ្យោបាយទទួលមតិរិះគន់", c("feedbackMethods")),
    row("សមាជិកក្រុមប្រឹក្សាក្នុងគណៈគ្រប់គ្រងសាលា", c("hasCouncilMemberSchoolCommittee")),
    row("សមាជិកក្រុមប្រឹក្សាស្រុកក្នុងគណៈគ្រប់គ្រងសាលា", c("hasDistrictMemberSchoolCommittee")),
    row("កិច្ចប្រជុំគណៈគ្រប់គ្រងសាលា", v("schoolMeetingCount")),
    row("ការគាំទ្រគ្រូបង្រៀនតំបន់ដាច់ស្រយាល", c("hasTeacherSupport")),
    row("ការគាំទ្រគ្រូបង្រៀន", c("teacherSupportDetails")),
    row("ភាគរយអាហារូបករណ៍", v("scholarshipPercentage")),
    row("អ្នកទទួលសេវាថែទាំសុខភាពបឋម", v("primaryHealthcareRecipients")),
    row("មណ្ឌលសុខភាព", c("hasHealthCenter")),
    row("មន្ទីរពេទ្យបង្អែក", c("hasReferralHospital")),
    row("ការលើកទឹកចិត្តគ្រូពេទ្យតំបន់ដាច់ស្រយាល", c("hasDoctorIncentives")),
    row("ការគាំទ្រគ្រូពេទ្យ", c("doctorSupportDetails")),
    row("ការចូលរួមគ្រប់គ្រងមណ្ឌលសុខភាព", c("hasCommunityHealthParticipation")),
    row("ទីកន្លែងហាត់ប្រាណសាធារណៈ", c("hasPublicExerciseSpace")),
    row("កម្មវិធីផ្សព្វផ្សាយសុខាភិបាល", v("healthAwarenessPrograms")),
    row("អ្នកចូលរួមផ្សព្វផ្សាយសុខាភិបាល", v("healthAwarenessParticipants")),
    row("ផ្លូវបេតុងថ្មី (ខ្សែ)", v("newConcreteRoads")),
    row("ផ្លូវបេតុងថ្មី (គ.ម)", v("newConcreteRoadKm")),
    row("ផ្លូវកៅស៊ូថ្មី (ខ្សែ)", v("newAsphaltRoads")),
    row("ផ្លូវកៅស៊ូថ្មី (គ.ម)", v("newAsphaltRoadKm")),
    row("ជួសជុលផ្លូវដី (ខ្សែ)", v("repairedDirtRoads")),
    row("ជួសជុលផ្លូវដី (គ.ម)", v("repairedDirtRoadKm")),
    row("ជួសជុលផ្លូវបេតុង (ខ្សែ)", v("repairConcreteRoads")),
    row("ជួសជុលផ្លូវបេតុង (គ.ម)", v("repairConcreteRoadKm")),
    row("ជួសជុលផ្លូវកៅស៊ូ (ខ្សែ)", v("repairAsphaltRoads")),
    row("ជួសជុលផ្លូវកៅស៊ូ (គ.ម)", v("repairAsphaltRoadKm")),
    row("កសាងផ្លូវដី (ខ្សែ)", v("constructDirtRoads")),
    row("កសាងផ្លូវដី (គ.ម)", v("constructDirtRoadKm")),
    row("ផ្លូវលើកកម្រិត (ខ្សែ)", v("upgradedRoadLines")),
    row("ផ្លូវលើកកម្រិត (គ.ម)", v("upgradedRoadKm")),
    row("ប្រឡាយរំដោះទឹក (ខ្សែ)", v("drainageLines")),
    row("ប្រឡាយរំដោះទឹក (ម)", v("drainageMeters")),
    row("ស្ថានីយបូមទឹក", v("pumpingStations")),
    row("ប្រព័ន្ធចម្រោះទឹក", v("waterTreatmentPlants")),
    row("គម្រោងឯកជន/សហគមន៍", v("privateCommunityProjects")),
    row("ប្រវែងគម្រោងឯកជន/សហគមន៍", v("privateCommunityProjectsKm")),
    row("ភាគរយគ្រួសារមានទឹកស្អាត", v("cleanWaterPct")),
    row("ភាគរយគ្រួសារមានទឹកបំពង់", v("pipedWaterPct")),
    row("អាងស្តុកទឹកខ្នាតតូច", v("smallReservoirs")),
    row("ស្តារព្រែក បឹងបួរ", v("restoredWaterBodies")),
    row("ប្រវែងស្តារព្រែក បឹងបួរ (ម)", v("restoredWaterBodiesM")),
    row("ប្រឡាយស្រោចស្រពថ្មី (ខ្សែ)", v("irrigationCanals")),
    row("ប្រវែងប្រឡាយស្រោចស្រព (ម)", v("irrigationCanalsMeters")),
    row("ប្រព័ន្ធបញ្ចូលទឹក", c("waterInletSystems")),
    row("វគ្គបណ្តុះបណ្តាលគ្រប់គ្រងទឹក", v("waterManagementTraining")),
    row("សហគមន៍កសិករប្រើប្រាស់ទឹក", v("farmingCommunities")),
    row("វគ្គបណ្តុះបណ្តាលសហគមន៍កសិករ", v("farmingCommunityTraining")),
    row("អន្តរាគមន៍បូមទឹកសង្គ្រោះ", c("hasDroughtPumping")),
    row("ភាគរយភូមិមានអគ្គិសនី", v("electricityCoveragePct")),
    row("គេហទំព័រឃុំ", c("hasCommuneWebsite")),
    row("គេហទំព័រមណ្ឌលសុខភាព", c("hasHealthCenterWebsite")),
    row("គេហទំព័រសាលារៀន", c("hasSchoolWebsite")),
    row("គេហទំព័រប៉ុស្តិ៍នគរបាល", c("hasPoliceWebsite")),
    row("ករណីដោះស្រាយវិវាទដីធ្លី", v("landDisputeCases")),
    row("ផែនការប្រើប្រាស់ដី", c("hasLandUsePlan")),
    row("សហគមន៍សន្សំប្រាក់", v("targetCommunities")),
    row("យន្តការប្រមូលសំរាម", c("hasWasteCollection")),
    row("កម្មវិធីផ្សព្វផ្សាយច្បាប់បរិស្ថាន", v("environmentalLawPrograms")),
    row("អ្នកចូលរួមផ្សព្វផ្សាយបរិស្ថាន", v("environmentalLawParticipants")),
    row("កម្មវិធីភូមិបៃតង", v("greenVillagePrograms")),
    row("គោលការណ៍អភិវឌ្ឍន៍ដោយចីរភាព", c("hasGreenVillageProgram")),
    row("កម្មវិធីសុវត្ថិភាពចំណីអាហារ", v("foodSafetyPrograms")),
    row("ករណីពុលចំណីអាហារ", v("foodPoisoningCases")),
    row("យន្តការសង្គ្រោះបឋម", c("hasEmergencyResponse")),
    row("ប្រព័ន្ធការពារគ្រោះមហន្តរាយ", c("hasDisasterPreparedness")),
    row("យន្តការតាមដានផលប៉ះពាល់សង្គម", c("hasHumanRightsProtection")),
  ].join("");

  const s4rows = [
    row("សហគ្រាសខ្នាតតូច", v("smallBusinessesCount")),
    row("សហគ្រាសចុះបញ្ជី", v("registeredSmallBusinesses")),
    row("ការផ្សព្វផ្សាយគ្រប់គ្រងហិរញ្ញវត្ថុ", c("hasFinancialLiteracy")),
    row("បណ្តុះបណ្តាលជំនាញយុវជន", c("hasYouthSkillsTraining")),
    row("ផ្សារសហគមន៍", c("hasCommunityMarket")),
    row("ការផ្សព្វផ្សាយវប្បធម៌", c("hasCulturalPromotion")),
    row("បណ្តុះបណ្តាលសិល្បៈ", c("hasArtsTraining")),
    row("បទល្មើសធនធានធម្មជាតិ", v("naturalResourceCrimeCases")),
    row("គម្រោងបង្កើតមុខរបរថ្មី", c("hasNewMarketProjects")),
    row("មុខរបរថ្មី", c("newMarketDetails")),
    row("សហគមន៍ទេសចរណ៍", v("tourismCommunities")),
    row("ផ្សារសាងសង់/កែលម្អ", v("marketCount")),
    row("ផ្សារមានគណៈកម្មការគ្រប់គ្រង", c("hasMarketManagement")),
    row("គុណភាពគ្រប់គ្រងផ្សារ", c("marketManagementQuality")),
    row("គម្រោងហេដ្ឋារចនាសម្ព័ន្ធតំបន់ព្រំដែន", v("borderAreaInfrastructureProjects")),
    row("ព័ត៌មានលម្អិតគម្រោងព្រំដែន", c("borderAreaInfrastructureDetails")),
  ].join("");

  const s5rows = [
    row("សេវាថែទាំកុមារពិការភាព", c("hasDisabledChildCareServices")),
    row("តម្រូវការជនជាតិដើមភាគតិច", c("minorityNeedsIncluded")),
    row("គម្រោងជនជាតិដើមភាគតិច", v("minorityProjectsImplemented")),
    row("បេក្ខជនជនជាតិដើមភាគតិច ២០២២", v("minorityCandidates2022")),
    row("សមាជិកក្រុមប្រឹក្សាជនជាតិដើមភាគតិច ២០២២-២០២៦", v("minorityCouncilMembers2022to2026")),
    row("មូលនិធិគាំទ្រជនពិការ/ចាស់ជរា", c("hasSupportInfrastructureForDisabledElderly")),
    row("សហគមន៍ជនពិការ/ចាស់ជរា", c("hasCommunityCareFacility")),
    row("បេក្ខជនជនពិការ ២០២២", v("disabledCandidates2022")),
    row("សមាជិកក្រុមប្រឹក្សាជនពិការ ២០២២-២០២៦", v("disabledCouncilMembers2022to2026")),
    row("គ្រួសារក្រីក្រទទួលបានជំនួយ", v("poorHouseholdsReliefCount")),
    row("ផែនការបញ្ជ្រាបយេនឌ័រ", c("hasGenderMainstreamingPlan")),
    row("សហគ្រាសដឹកនាំដោយស្ត្រី/កុមារ", v("womenChildrenLedSmallBusinesses")),
    row("ព័ត៌មានលម្អិតផែនការយេនឌ័រ", c("genderMainstreamingPlanDetails")),
  ].join("");

  const s6rows = [
    row("ការវាយតម្លៃដោះស្រាយបញ្ហា", v("problemsAssessmentSessions")),
    row("ប្រជាពលរដ្ឋចូលរួមប្រជុំក្រុមប្រឹក្សា", v("citizensParticipatingCouncilMeetings")),
    row("យន្តការចូលរួម", c("citizenParticipationMechanisms")),
    row("ភាគរយដោះស្រាយវិវាទ", v("disputeResolutionRate")),
    row("កម្មវិធីផ្សព្វផ្សាយច្បាប់", v("legalAwarenessProgramsCount")),
    row("អធិការកិច្ចក្រុមប្រឹក្សា", v("councilInspectionsCount")),
    row("ក្រុមប្រឹក្សាប្រព្រឹត្តអំពើពុករលួយ", v("disciplinedCouncilMembers")),
    row("ស្មៀនប្រព្រឹត្តអំពើពុករលួយ", v("disciplinedVillageChiefs")),
    row("ថ្នាក់ដឹកនាំភូមិប្រព្រឹត្តអំពើពុករលួយ", v("disciplinedCommuneLeaders")),
    row("ការលើកទឹកចិត្ត និងរង្វាន់", c("hasReceivedIncentives")),
  ].join("");

  const s7rows = [
    row("សំណើជម្រុះមករដ្ឋបាលស្រុក", v("citizenRequestsEscalated")),
    row("ការចូលរួមគ្រប់គ្រងសាលារៀន", c("hasCouncilInSchoolManagement")),
    row("មត្តេយ្យសហគមន៍", v("communityPreschoolsCount")),
    row("ការគ្រប់គ្រងតំបន់ការពារធម្មជាតិ", c("hasManagedProtectedArea")),
    row("គម្រោងធន់នឹងបម្រែបម្រួលអាកាសធាតុ", v("climateResilienceProjects")),
    row("ការផ្សព្វផ្សាយបម្រែបម្រួលអាកាសធាតុ", c("hasClimateChangeAwareness")),
    row("ការចូលរួមគ្រប់គ្រងមណ្ឌលសុខភាព", c("hasCouncilInHealthManagement")),
    row("កិច្ចការពារកុមារ", c("hasChildProtectionServices")),
    row("ការគ្រប់គ្រងសំរាម", c("hasWasteManagement")),
    row("ព័ត៌មានលម្អិតការគ្រប់គ្រងសំរាម", c("wasteManagementDetails")),
    row("ការគ្រប់គ្រងផ្សារសហគមន៍", c("hasManagedCommunityMarket")),
    row("ប្រជាពលរដ្ឋជួបគ្រោះមហន្តរាយ", v("disasterAffectedCitizens")),
    row("គម្រោងទឹកស្អាត និងអនាម័យ", c("hasCleanWaterSanitation")),
    row("គម្រោងផ្គត់ផ្គង់ទឹកស្អាត", v("cleanWaterProjects")),
    row("គម្រោងបង្គន់អនាម័យ", v("toiletConstructionProjects")),
    row("គម្រោងសមភាពយេនឌ័រ", c("hasGenderEqualityProjects")),
    row("ចំនួនគម្រោងយេនឌ័រ", v("genderEqualityProjectsCount")),
    row("មុខងារចាំបាច់ផ្សេងៗ", c("otherEssentialFunctions")),
    row("ការកៀរគរជំនួយដៃគូអភិវឌ្ឍន៍", c("hasMobilizedDevelopmentSupport")),
    row("ថវិកាកៀរគរបាន", v("mobilizedBudgetAmount")),
    row("ថ្នាក់ដឹកនាំភូមិមានបរិញ្ញាបត្រ", v("villageLeadersWithBachelor")),
    row("ថ្នាក់ដឹកនាំភូមិមានបរិញ្ញាបត្ររង", v("villageLeadersWithAssociate")),
    row("ថ្នាក់ដឹកនាំភូមិមានមធ្យមសិក្សា", v("villageLeadersWithHighSchool")),
    row("ថ្នាក់ដឹកនាំភូមិទទួលទណ្ឌកម្ម", v("villageLeadersDisciplined")),
  ].join("");

  return `<!DOCTYPE html>
<html lang="km">
<head>
<meta charset="utf-8">
<style>
  body { font-family: "Moul", "Siemreap", "Khmer OS", "Leelawadee UI", sans-serif; margin:0; padding:20px; color:#1e293b; background:#fff; }
  h1 { font-size:18px; text-align:center; margin:0 0 4px; }
  h2 { font-size:14px; text-align:center; font-weight:400; margin:0 0 16px; color:#475569; }
  table { width:100%; border-collapse:collapse; margin-bottom:16px; }
  th, td { padding:6px 10px; border:1px solid #d1d5db; font-size:13px; text-align:left; }
  th { background:#1e40af; color:#fff; font-weight:600; }
  .section-title { font-size:15px; font-weight:600; color:#1e3a5f; margin:16px 0 8px; padding:8px 12px; background:#e8f0fe; border-radius:4px; }
</style>
</head>
<body>
<h1>សម្រាប់រដ្ឋបាលឃុំ/សង្កាត់នីមួយៗ</h1>
<h2>ខេត្ត: ${province} &nbsp;&nbsp; ស្រុក: ${district} &nbsp;&nbsp; ឃុំ: ${commune} &nbsp;&nbsp; អាណត្តិទី${mandateNumber} (${mandateYearStart}-${mandateYearEnd})</h2>

<div class="section-title">១. លទ្ធិប្រជាធិបតេយ្យ និងសិទ្ធិសេរីភាព</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s1rows}</tbody></table>

<div class="section-title">២. សន្តិសុខសាធារណៈ</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s2rows}</tbody></table>

<div class="section-title">៣. សេវាសាធារណៈ និងហេដ្ឋារចនាសម្ព័ន្ធ</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s3rows}</tbody></table>

<div class="section-title">៤. អភិវឌ្ឍន៍សេដ្ឋកិច្ច</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s4rows}</tbody></table>

<div class="section-title">៥. ការពារសង្គម</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s5rows}</tbody></table>

<div class="section-title">៦. អភិបាលកិច្ចល្អ</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s6rows}</tbody></table>

<div class="section-title">៧. សមត្ថភាពស្ថាប័ន</div>
<table><thead><tr><th>លក្ខណៈវិនិច្ឆ័យ</th><th>តម្លៃ</th></tr></thead><tbody>${s7rows}</tbody></table>
</body>
</html>`;
}

"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import EvaluationForm, { type EvaluationFormHandle } from "../components/EvaluationForm";
import type { EvaluationData } from "@/lib/evaluation-schema";
import { defaultEvaluationData } from "@/lib/evaluation-schema";
import { createEvaluation } from "@/lib/evaluation-service";

const khmerProvinces = [
  "ភ្នំពេញ",
  "សៀមរាប",
  "បាត់ដំបង",
  "កំពង់ចាម",
  "កំពត",
  "ព្រៃវែង",
  "តាកែវ",
  "កណ្តាល",
];
const khmerDistricts = ["មង្គលបុរី", "បាស្តែក", "ពញាឮ", "សង្កែ", "ចំការលើ"];
const khmerCommunes = ["រកា", "តាលោ", "ស្វាយដង្គំ", "អូរឫស្សី", "ព្រែកតាសេក"];

function rand(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randNum(min: number, max: number) {
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

function randChoice(options: string[]) {
  return rand(options);
}

function generateRandomData(): EvaluationData {
  return {
    ...defaultEvaluationData,
    province: rand(khmerProvinces),
    district: rand(khmerDistricts),
    commune: rand(khmerCommunes),
    registeredVotersNational2023: randNum(50, 95),
    registeredVotersCommune2022: randNum(50, 95),
    voterTurnoutNational2023: randNum(60, 98),
    voterTurnoutCommune2022: randNum(60, 98),
    violenceCasesNational2023: randNum(0, 10),
    violenceCasesCommune2022: randNum(0, 10),
    highSchoolDiploma: randNum(1, 10),
    associateDegree: randNum(0, 5),
    bachelorDegree: randNum(0, 5),
    masterDegree: randNum(0, 3),
    removedCouncilMembers: randNum(0, 3),
    totalCouncilMembers: randNum(5, 15),
    femaleCouncilMembers: randNum(1, 8),
    youthCouncilMembers: randNum(1, 6),
    totalClerks: randNum(2, 10),
    femaleClerks: randNum(1, 5),
    youthClerks: randNum(0, 4),
    totalVillageLeaders: randNum(5, 30),
    femaleVillageLeaders: randNum(1, 10),
    youthVillageLeaders: randNum(1, 10),
    humanRightsViolations: randNum(0, 5),
    publicForumParticipants: randNum(50, 500),
    councilMeetingParticipants: randNum(20, 200),
    planningProcessParticipants: randNum(10, 100),
    hasProjectManagementCommittee: randChoice(["មាន", "មិនមាន"]),
    administrativeServiceRecipients: randNum(100, 5000),
    communityProjectsCount: randNum(1, 20),
    serviceRequestCases: randNum(10, 100),
    serviceResolvedCases: randNum(5, 90),
    religiousDisputeCases: randNum(0, 5),
    politicalDisputeCases: randNum(0, 5),
    hasCommunityCulturalSpace: randChoice(["មាន", "មិនមាន"]),
    communeGuardCount: randNum(5, 50),
    communeGuardTrainingCount: randNum(1, 10),
    communeGuardSupport: randChoice(["សម្លៀកបំពាក់", "ឧបករណ៍", "ប្រាក់ឧបត្ថម្ភ"]),
    administrativePoliceCount: randNum(2, 20),
    policeTrainingCount: randNum(1, 10),
    policeSupport: randChoice(["សម្ភារៈ", "ថវិកា", "យានយន្ត"]),
    crimeSuppressionRate: randNum(50, 100),
    crimeEducationPrograms: randNum(1, 15),
    crimeEducationParticipants: randNum(50, 500),
    hasTrafficManagement: randChoice(["មាន", "មិនមាន"]),
    trafficSignsStatus: randChoice(["គ្រប់គ្រាន់", "មិនទាន់គ្រប់គ្រាន់", "មិនមាន"]),
    trafficAccidentCases: randNum(0, 20),
    orderlyPlaces: randNum(1, 15),
    disorderlyPlaces: randNum(0, 10),
    hasPublicParking: randChoice(["មាន", "មិនមាន"]),
    trafficLawEducationSessions: randNum(1, 10),
    trafficLawEducationParticipants: randNum(30, 300),
    serviceRecipientsCount: randNum(100, 5000),
    birthRegistrations: randNum(50, 500),
    marriageRegistrations: randNum(10, 100),
    deathRegistrations: randNum(10, 100),
    residenceBookIssued: randNum(50, 500),
    identityCardsIssued: randNum(100, 1000),
    feedbackMethods: randChoice(["ប្រអប់សំបុត្រ", "តេឡេក្រាម", "បណ្តាញសង្គម"]),
    hasCouncilMemberSchoolCommittee: randChoice(["មាន", "មិនមាន"]),
    hasDistrictMemberSchoolCommittee: randChoice(["មាន", "មិនមាន"]),
    schoolMeetingCount: randNum(1, 12),
    hasTeacherSupport: randChoice(["មាន", "មិនមាន"]),
    teacherSupportDetails: randChoice(["ប្រាក់ឧបត្ថម្ភ", "ផ្ទះស្នាក់នៅ", "វគ្គបណ្តុះបណ្តាល"]),
    scholarshipPercentage: randNum(10, 80),
    primaryHealthcareRecipients: randNum(500, 5000),
    hasHealthCenter: randChoice(["មាន", "មិនមាន"]),
    hasReferralHospital: randChoice(["មាន", "មិនមាន"]),
    hasDoctorIncentives: randChoice(["មាន", "មិនមាន"]),
    doctorSupportDetails: randChoice(["ប្រាក់ឧបត្ថម្ភ", "ផ្ទះស្នាក់នៅ"]),
    hasCommunityHealthParticipation: randChoice(["មាន", "មិនមាន"]),
    hasPublicExerciseSpace: randChoice(["មាន", "មិនមាន"]),
    healthAwarenessPrograms: randNum(1, 15),
    healthAwarenessParticipants: randNum(50, 500),
    newConcreteRoads: randNum(0, 5),
    newConcreteRoadKm: randNum(1, 20),
    newAsphaltRoads: randNum(0, 5),
    newAsphaltRoadKm: randNum(1, 20),
    repairedDirtRoads: randNum(0, 10),
    repairedDirtRoadKm: randNum(1, 30),
    repairConcreteRoads: randNum(0, 10),
    repairConcreteRoadKm: randNum(1, 30),
    repairAsphaltRoads: randNum(0, 10),
    repairAsphaltRoadKm: randNum(1, 30),
    constructDirtRoads: randNum(0, 10),
    constructDirtRoadKm: randNum(1, 30),
    upgradedRoadLines: randNum(0, 5),
    upgradedRoadKm: randNum(1, 20),
    drainageLines: randNum(0, 10),
    drainageMeters: randNum(50, 1000),
    pumpingStations: randNum(0, 5),
    waterTreatmentPlants: randNum(0, 3),
    privateCommunityProjects: randNum(0, 10),
    privateCommunityProjectsKm: randNum(1, 20),
    cleanWaterPct: randNum(50, 100),
    pipedWaterPct: randNum(20, 90),
    smallReservoirs: randNum(0, 10),
    restoredWaterBodies: randNum(0, 10),
    restoredWaterBodiesM: randNum(100, 5000),
    irrigationCanals: randNum(0, 10),
    irrigationCanalsMeters: randNum(100, 5000),
    waterInletSystems: randNum(0, 10),
    waterManagementTraining: randNum(1, 10),
    farmingCommunities: randNum(1, 10),
    farmingCommunityTraining: randNum(1, 10),
    hasDroughtPumping: randChoice(["មាន", "មិនមាន"]),
    electricityCoveragePct: randNum(50, 100),
    hasCommuneWebsite: randChoice(["មាន", "មិនមាន"]),
    hasHealthCenterWebsite: randChoice(["មាន", "មិនមាន"]),
    hasSchoolWebsite: randChoice(["មាន", "មិនមាន"]),
    hasPoliceWebsite: randChoice(["មាន", "មិនមាន"]),
    landDisputeCases: randNum(0, 20),
    hasLandUsePlan: randChoice(["មាន", "មិនមាន"]),
    targetCommunities: randNum(1, 10),
    hasWasteCollection: randChoice(["មាន", "មិនមាន"]),
    environmentalLawPrograms: randNum(1, 10),
    environmentalLawParticipants: randNum(30, 300),
    greenVillagePrograms: randNum(1, 10),
    hasGreenVillageProgram: randChoice(["មាន", "មិនមាន"]),
    foodSafetyPrograms: randNum(1, 10),
    foodPoisoningCases: randNum(0, 10),
    hasEmergencyResponse: randChoice(["មាន", "មិនមាន"]),
    hasDisasterPreparedness: randChoice(["មាន", "មិនមាន"]),
    hasHumanRightsProtection: randChoice(["មាន", "មិនមាន"]),
    smallBusinessesCount: randNum(10, 100),
    registeredSmallBusinesses: randNum(5, 80),
    hasFinancialLiteracy: randChoice(["បាន", "មិនបាន"]),
    hasYouthSkillsTraining: randChoice(["មាន", "មិនមាន"]),
    hasCommunityMarket: randChoice(["មាន", "មិនមាន"]),
    hasCulturalPromotion: randChoice(["មាន", "មិនមាន"]),
    hasArtsTraining: randChoice(["បាន", "មិនបាន"]),
    naturalResourceCrimeCases: randNum(0, 10),
    hasNewMarketProjects: randChoice(["មាន", "មិនមាន"]),
    newMarketDetails: randChoice(["កសិកម្ម", "វាលស្រែ", "ទេសចរណ៍"]),
    tourismCommunities: randNum(0, 5),
    marketCount: randNum(0, 5),
    hasMarketManagement: randNum(0, 5),
    marketManagementQuality: randChoice(["ល្អ", "មធ្យម", "មិនទាន់បានល្អ"]),
    borderAreaInfrastructureProjects: randNum(0, 5),
    borderAreaInfrastructureDetails: randChoice(["ផ្លូវ", "សាលារៀន", "មណ្ឌលសុខភាព"]),
    hasDisabledChildCareServices: randChoice(["បាន", "មិនបាន"]),
    minorityNeedsIncluded: randChoice(["បាន", "មិនបាន"]),
    minorityProjectsImplemented: randNum(0, 10),
    minorityCandidates2022: randNum(0, 10),
    minorityCouncilMembers2022to2026: randNum(0, 10),
    hasSupportInfrastructureForDisabledElderly: randChoice(["មាន", "មិនមាន"]),
    hasCommunityCareFacility: randChoice(["មាន", "មិនមាន"]),
    disabledCandidates2022: randNum(0, 10),
    disabledCouncilMembers2022to2026: randNum(0, 10),
    poorHouseholdsReliefCount: randNum(10, 200),
    hasGenderMainstreamingPlan: randChoice(["មាន", "មិនមាន"]),
    womenChildrenLedSmallBusinesses: randNum(0, 20),
    genderMainstreamingPlanDetails: randChoice(["ផែនការ", "កម្មវិធី", "វគ្គបណ្តុះបណ្តាល"]),
    problemsAssessmentSessions: randNum(50, 100),
    citizensParticipatingCouncilMeetings: randNum(20, 200),
    citizenParticipationMechanisms: randChoice(["ប្រជុំ", "វេទិកា", "តេឡេក្រាម"]),
    disputeResolutionRate: randNum(50, 100),
    legalAwarenessProgramsCount: randNum(1, 10),
    councilInspectionsCount: randNum(1, 10),
    disciplinedCouncilMembers: randNum(0, 5),
    disciplinedVillageChiefs: randNum(0, 5),
    disciplinedCommuneLeaders: randNum(0, 5),
    hasReceivedIncentives: randChoice(["មាន", "មិនមាន"]),
    citizenRequestsEscalated: randNum(0, 50),
    hasCouncilInSchoolManagement: randChoice(["មាន", "មិនមាន"]),
    communityPreschoolsCount: randNum(0, 10),
    hasManagedProtectedArea: randChoice(["មាន", "មិនមាន"]),
    climateResilienceProjects: randNum(0, 10),
    hasClimateChangeAwareness: randChoice(["បាន", "មិនបាន"]),
    hasCouncilInHealthManagement: randChoice(["បាន", "មិនបាន"]),
    hasChildProtectionServices: randChoice(["បាន", "មិនបាន"]),
    hasWasteManagement: randChoice(["បាន", "មិនបាន"]),
    wasteManagementDetails: randChoice(["ប្រមូលសំរាម", "ប្រឡាយ", "អង់ហ្សឹម"]),
    hasManagedCommunityMarket: randChoice(["បាន", "មិនបាន"]),
    disasterAffectedCitizens: randNum(0, 500),
    hasCleanWaterSanitation: randChoice(["បាន", "មិនបាន"]),
    cleanWaterProjects: randNum(0, 10),
    toiletConstructionProjects: randNum(0, 10),
    hasGenderEqualityProjects: randChoice(["បាន", "មិនបាន"]),
    genderEqualityProjectsCount: randNum(0, 10),
    otherEssentialFunctions: randChoice(["សុវត្ថិភាព", "សណ្តាប់ធ្នាប់", "សេវាសាធារណៈ"]),
    hasMobilizedDevelopmentSupport: randChoice(["មាន", "មិនមាន"]),
    mobilizedBudgetAmount: randNum(1000000, 100000000),
    villageLeadersWithBachelor: randNum(0, 10),
    villageLeadersWithAssociate: randNum(0, 10),
    villageLeadersWithHighSchool: randNum(0, 10),
    villageLeadersDisciplined: randNum(0, 5),
  };
}

export default function NewEvaluationPage() {
  const [seed, setSeed] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<EvaluationFormHandle>(null);

  const handleSubmit = async (form: EvaluationData) => {
    setSubmitting(true);
    try {
      await createEvaluation(form);
      window.location.href = "/dashboard/commune-evaluation";
    } catch (err) {
      console.error("Failed to create evaluation", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-slate-50 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/commune-evaluation">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-slate-500">វាយតម្លៃឃុំ / សង្កាត់</p>
            <h1 className="text-2xl font-semibold text-slate-900">បង្កើតថ្មី</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button type="button" variant="outline" onClick={() => setSeed((s) => s + 1)}>
            បំពេញស្វ័យប្រវត្តិ
          </Button>
          <Button className="inline-flex items-center gap-2" disabled={submitting} onClick={() => formRef.current?.submitForm()}>
            <Save size={16} />
            {submitting ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
          </Button>
        </div>
      </div>

      <EvaluationForm
        key={seed}
        ref={formRef}
        initialData={seed > 0 ? generateRandomData() : defaultEvaluationData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

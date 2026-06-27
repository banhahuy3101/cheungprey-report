export interface CommuneEvaluation {
  province: string;
  district: string;
  commune: string;
  periodFrom: string;
  periodTo: string;

  // ── 1. Democracy & Rights ───────────────────────────────────────────
  voterRegistrationNational2023: string;
  voterRegistrationLocal2022: string;
  voterTurnoutNational2023: string;
  voterTurnoutLocal2022: string;
  electionViolenceNational2023: string;
  electionViolenceLocal2022: string;

  councilHighSchool: string;
  councilAssociate: string;
  councilBachelor: string;
  councilMasterOrHigher: string;
  councilDismissed: string;

  totalCouncilMembers: string;
  youthCouncilMembers: string;
  totalClerks: string;
  youthClerks: string;
  totalVillageLeaders: string;
  youthVillageLeaders: string;

  humanRightsViolations: string;
  publicForumAttendees: string;
  councilMeetingAttendees: string;
  planningProcessAttendees: string;
  hasProjectManagementCommittee: "yes" | "no" | "";
  administrativeServiceRecipients: string;
  totalSocialProjects: string;
  citizenRequestsCount: string;
  resolvedRequestsCount: string;
  citizenRequestResolutionRate: string;
  religiousCulturalDisputes: string;
  politicalDisputes: string;
  publicCulturalSpaces: string;

  // ── 2. Security & Public Order ──────────────────────────────────────
  totalSecurityGuards: string;
  guardTrainingSessions: string;
  guardSupportDetails: string;
  policeOfficersCount: string;
  policeTrainingSessions: string;
  policeSupportDetails: string;
  crimeSuppressionRate: string;
  crimeEducationPrograms: string;
  crimeEducationAttendees: string;
  trafficSafetyAdjustment: "yes" | "no" | "";
  trafficSignsStatus: "sufficient" | "insufficient" | "none" | "";
  trafficAccidentsCount: string;
  trafficEducationPrograms: string;
  trafficEducationAttendees: string;
  orderlyPublicPlaces: string;
  disorderlyPublicPlaces: string;
  hasPublicParking: "yes" | "no" | "";
  humanTraffickingPrograms: string;
  humanTraffickingAttendees: string;
  domesticViolenceCases: string;

  // ── 3. Public Services & Infrastructure ────────────────────────────
  // 3.1 Administrative
  birthRegistrations: string;
  marriageRegistrations: string;
  deathRegistrations: string;
  residenceBooks: string;
  nationalIds: string;
  feedbackMechanism: string;

  // 3.2 Education
  schoolCommitteeMembers: string;
  schoolCommitteeMeetings: string;
  teacherSupportRural: "yes" | "no" | "";
  teacherSupportDetails: string;
  teachersSupportedCount: string;
  scholarshipPercentage: string;

  // 3.3 Health
  healthCenterAttendees: string;
  healthCenterMonthlyAvg: string;
  hospitalMonthlyAvg: string;
  hasHealthCenter: "yes" | "no" | "";
  hasReferralHospital: "yes" | "no" | "";
  doctorRuralIncitation: "yes" | "no" | "";
  doctorRuralDetails: string;
  communityHealthCommittee: "yes" | "no" | "";
  publicGymStatus: "yes" | "no" | "";
  covidHealthSessions: string;
  covidHealthAttendees: string;
  healthEducationSessions: string;
  healthEducationAttendees: string;

  // 3.4 Roads & Infrastructure
  newConcreteRoadsCount: string;
  newConcreteRoadsLength: string;
  newAsphaltRoadsCount: string;
  newAsphaltRoadsLength: string;
  repairDirtRoadsCount: string;
  repairDirtRoadsLength: string;
  roadUpgradesCount: string;
  roadUpgradesLength: string;
  canalSystemsCount: string;
  canalSystemsLength: string;
  pumpStationsCount: string;
  wasteWaterSystemsCount: string;
  privateSectorProjectsCount: string;
  privateSectorProjectsLength: string;

  // 3.5 Water Supply
  cleanWaterAccessPct: string;
  pipeWaterAccessPct: string;

  // 3.6 Water Resources
  smallWaterReservoirsCount: string;
  restoredNaturalWaterSourcesCount: string;
  restoredNaturalWaterSourcesLength: string;
  constructedCanalsCount: string;
  constructedCanalsLength: string;
  irrigationSystemsCount: string;
  councilWaterTrainingSessions: string;
  farmerWaterCommunitiesCount: string;
  farmerWaterTrainingSessions: string;
  droughtPumpingIntervention: "yes" | "no" | "";

  // 3.7 Electricity
  electricityAccessPct: string;

  // 3.8 Technology
  hasCommuneWebsite: "yes" | "no" | "";
  hasHealthWebsite: "yes" | "no" | "";
  hasSchoolWebsite: "yes" | "no" | "";
  hasPoliceWebsite: "yes" | "no" | "";

  // 3.9 Land Management
  landDisputeResolutions: string;
  hasLandUsePlan: "yes" | "no" | "";
  savingsCommunitiesCount: string;

  // 3.10 Environment
  hasWasteManagementMechanism: "yes" | "no" | "";
  wasteCollectionCoverage: string;
  envProgramsCount: string;
  envProgramsAttendees: string;
  sustainableLivingProgramsCount: string;
  hasSustainabilityInPlan: "yes" | "no" | "";
  foodPoisoningProgramsCount: string;
  foodPoisoningCasesResolved: string;
  foodSafetyInspections: string;

  // 3.11 Climate & Disaster
  foodDistributedFamilies: string;
  floodInterventionFamilies: string;
  droughtInterventionFamilies: string;
  hasFloodInterventionMechanism: "yes" | "no" | "";
  hasDroughtInterventionMechanism: "yes" | "no" | "";
  hasFoodMonitoringMechanism: "yes" | "no" | "";
  earlyWarningSystemExists: "yes" | "no" | "";
  disasterPreparednessPlans: string;

  // ── 4. Economic Development ──────────────────────────────────────────
  smallEnterprisesCreated: string;
  smallEnterprisesRegistered: string;
  financialTrainingSessions: string;
  financialTrainingAttendees: string;
  businessIncubationUnits: string;
  productionBasesCount: string;
  farmersTrainedBusiness: "yes" | "no" | "";
  farmerBusinessTrainingCount: string;
  farmerBusinessTrainingAttendees: string;
  hasCommunityExhibitions: "yes" | "no" | "";
  exhibitionsConducted: string;
  agriculturalFamiliesCount: string;
  familiesUsingAgriMachinery: string;
  agriculturalCommunitiesCreated: string;
  agriCommunitiesTrained: "yes" | "no" | "";
  distributedSeedsTimely: "yes" | "no" | "";
  poorFamiliesReceivedSeeds: string;
  householdPondCommunities: string;
  animalHusbandryFarms: string;
  agriProcessingIndustries: string;
  resourceCommunityInvolvement: "yes" | "no" | "";
  receivedFinancialSupportFunds: "yes" | "no" | "";
  miningCommunitiesCount: string;
  miningFundsAmount: string;
  culturalHeritagePrograms: string;
  naturalResourceViolations: string;
  livelihoodProjects: string;
  tourismCommunitiesCount: string;
  marketsConstructed: string;
  marketsRenovated: string;
  marketManagementCommitteeExists: "yes" | "no" | "";
  borderProjectsCount: string;
  partnershipOrganizations: string;

  // ── 5. Social Protection ─────────────────────────────────────────────
  womenProjectParticipants: string;
  youthProjectParticipants: string;
  childCareServicesCount: string;
  indigenousInclusionPlan: "yes" | "no" | "";
  indigenousCandidates: string;
  indigenousCouncilMembers: string;
  disabledSupportedCount: string;
  elderlySupportedCount: string;
  disabledCandidates: string;
  disabledCouncilMembers: string;
  elderlyCandidates: string;
  elderlyCouncilMembers: string;
  emergencyAssistanceFamilies: string;
  emergencyAssistanceAmount: string;
  inclusivePlanningProjects: string;
  priorityServiceRecipients: string;

  // ── 6. Good Governance ──────────────────────────────────────────────
  problemResolutionPercent: string;
  assemblyParticipationRate: string;
  disputeResolutionPercent: string;
  legalEducationProgramsCount: string;
  legalEducationAttendees: string;
  inspectionCount: string;
  councilCorruptionCases: string;
  clerkCorruptionCases: string;
  villageLeaderCorruptionCases: string;
  meritAwards: string;

  // ── 7. Institutional Capacity ────────────────────────────────────────
  unresolvedCasesForwarded: string;
  transferredFunctionsImplemented: string;
  schoolManagementCommittee: "yes" | "no" | "";
  communityPreschoolsCount: string;
  naturalProtectionAreasCount: string;
  climateAdaptationProjects: string;
  healthCenterCommitteeMeetings: string;
  childProtectionCommittee: "yes" | "no" | "";
  wasteManagementCommittee: "yes" | "no" | "";
  marketManagementUnit: "yes" | "no" | "";
  disasterResponseUnit: "yes" | "no" | "";
  waterSanitationProjects: string;
  genderEqualityInitiatives: string;
  otherTransferredFunctions: string;
  partnerSupportPrograms: string;
  partnerFundingAmount: string;
  villageLeaderHighSchoolCount: string;
  villageLeaderBachelorCount: string;
  villageLeaderComplaints: string;
}

export const initialEvaluationState: CommuneEvaluation = {
  province: "",
  district: "",
  commune: "",
  periodFrom: "2022",
  periodTo: "2026",

  voterRegistrationNational2023: "",
  voterRegistrationLocal2022: "",
  voterTurnoutNational2023: "",
  voterTurnoutLocal2022: "",
  electionViolenceNational2023: "",
  electionViolenceLocal2022: "",

  councilHighSchool: "",
  councilAssociate: "",
  councilBachelor: "",
  councilMasterOrHigher: "",
  councilDismissed: "",

  totalCouncilMembers: "",
  youthCouncilMembers: "",
  totalClerks: "",
  youthClerks: "",
  totalVillageLeaders: "",
  youthVillageLeaders: "",

  humanRightsViolations: "",
  publicForumAttendees: "",
  councilMeetingAttendees: "",
  planningProcessAttendees: "",
  hasProjectManagementCommittee: "",
  administrativeServiceRecipients: "",
  totalSocialProjects: "",
  citizenRequestsCount: "",
  resolvedRequestsCount: "",
  citizenRequestResolutionRate: "",
  religiousCulturalDisputes: "",
  politicalDisputes: "",
  publicCulturalSpaces: "",

  totalSecurityGuards: "",
  guardTrainingSessions: "",
  guardSupportDetails: "",
  policeOfficersCount: "",
  policeTrainingSessions: "",
  policeSupportDetails: "",
  crimeSuppressionRate: "",
  crimeEducationPrograms: "",
  crimeEducationAttendees: "",
  trafficSafetyAdjustment: "",
  trafficSignsStatus: "",
  trafficAccidentsCount: "",
  trafficEducationPrograms: "",
  trafficEducationAttendees: "",
  orderlyPublicPlaces: "",
  disorderlyPublicPlaces: "",
  hasPublicParking: "",
  humanTraffickingPrograms: "",
  humanTraffickingAttendees: "",
  domesticViolenceCases: "",

  birthRegistrations: "",
  marriageRegistrations: "",
  deathRegistrations: "",
  residenceBooks: "",
  nationalIds: "",
  feedbackMechanism: "",

  schoolCommitteeMembers: "",
  schoolCommitteeMeetings: "",
  teacherSupportRural: "",
  teacherSupportDetails: "",
  teachersSupportedCount: "",
  scholarshipPercentage: "",

  healthCenterAttendees: "",
  healthCenterMonthlyAvg: "",
  hospitalMonthlyAvg: "",
  hasHealthCenter: "",
  hasReferralHospital: "",
  doctorRuralIncitation: "",
  doctorRuralDetails: "",
  communityHealthCommittee: "",
  publicGymStatus: "",
  covidHealthSessions: "",
  covidHealthAttendees: "",
  healthEducationSessions: "",
  healthEducationAttendees: "",

  newConcreteRoadsCount: "",
  newConcreteRoadsLength: "",
  newAsphaltRoadsCount: "",
  newAsphaltRoadsLength: "",
  repairDirtRoadsCount: "",
  repairDirtRoadsLength: "",
  roadUpgradesCount: "",
  roadUpgradesLength: "",
  canalSystemsCount: "",
  canalSystemsLength: "",
  pumpStationsCount: "",
  wasteWaterSystemsCount: "",
  privateSectorProjectsCount: "",
  privateSectorProjectsLength: "",

  cleanWaterAccessPct: "",
  pipeWaterAccessPct: "",

  smallWaterReservoirsCount: "",
  restoredNaturalWaterSourcesCount: "",
  restoredNaturalWaterSourcesLength: "",
  constructedCanalsCount: "",
  constructedCanalsLength: "",
  irrigationSystemsCount: "",
  councilWaterTrainingSessions: "",
  farmerWaterCommunitiesCount: "",
  farmerWaterTrainingSessions: "",
  droughtPumpingIntervention: "",

  electricityAccessPct: "",

  hasCommuneWebsite: "",
  hasHealthWebsite: "",
  hasSchoolWebsite: "",
  hasPoliceWebsite: "",

  landDisputeResolutions: "",
  hasLandUsePlan: "",
  savingsCommunitiesCount: "",

  hasWasteManagementMechanism: "",
  wasteCollectionCoverage: "",
  envProgramsCount: "",
  envProgramsAttendees: "",
  sustainableLivingProgramsCount: "",
  hasSustainabilityInPlan: "",
  foodPoisoningProgramsCount: "",
  foodPoisoningCasesResolved: "",
  foodSafetyInspections: "",

  foodDistributedFamilies: "",
  floodInterventionFamilies: "",
  droughtInterventionFamilies: "",
  hasFloodInterventionMechanism: "",
  hasDroughtInterventionMechanism: "",
  hasFoodMonitoringMechanism: "",
  earlyWarningSystemExists: "",
  disasterPreparednessPlans: "",

  smallEnterprisesCreated: "",
  smallEnterprisesRegistered: "",
  financialTrainingSessions: "",
  financialTrainingAttendees: "",
  businessIncubationUnits: "",
  productionBasesCount: "",
  farmersTrainedBusiness: "",
  farmerBusinessTrainingCount: "",
  farmerBusinessTrainingAttendees: "",
  hasCommunityExhibitions: "",
  exhibitionsConducted: "",
  agriculturalFamiliesCount: "",
  familiesUsingAgriMachinery: "",
  agriculturalCommunitiesCreated: "",
  agriCommunitiesTrained: "",
  distributedSeedsTimely: "",
  poorFamiliesReceivedSeeds: "",
  householdPondCommunities: "",
  animalHusbandryFarms: "",
  agriProcessingIndustries: "",
  resourceCommunityInvolvement: "",
  receivedFinancialSupportFunds: "",
  miningCommunitiesCount: "",
  miningFundsAmount: "",
  culturalHeritagePrograms: "",
  naturalResourceViolations: "",
  livelihoodProjects: "",
  tourismCommunitiesCount: "",
  marketsConstructed: "",
  marketsRenovated: "",
  marketManagementCommitteeExists: "",
  borderProjectsCount: "",
  partnershipOrganizations: "",

  womenProjectParticipants: "",
  youthProjectParticipants: "",
  childCareServicesCount: "",
  indigenousInclusionPlan: "",
  indigenousCandidates: "",
  indigenousCouncilMembers: "",
  disabledSupportedCount: "",
  elderlySupportedCount: "",
  disabledCandidates: "",
  disabledCouncilMembers: "",
  elderlyCandidates: "",
  elderlyCouncilMembers: "",
  emergencyAssistanceFamilies: "",
  emergencyAssistanceAmount: "",
  inclusivePlanningProjects: "",
  priorityServiceRecipients: "",

  problemResolutionPercent: "",
  assemblyParticipationRate: "",
  disputeResolutionPercent: "",
  legalEducationProgramsCount: "",
  legalEducationAttendees: "",
  inspectionCount: "",
  councilCorruptionCases: "",
  clerkCorruptionCases: "",
  villageLeaderCorruptionCases: "",
  meritAwards: "",

  unresolvedCasesForwarded: "",
  transferredFunctionsImplemented: "",
  schoolManagementCommittee: "",
  communityPreschoolsCount: "",
  naturalProtectionAreasCount: "",
  climateAdaptationProjects: "",
  healthCenterCommitteeMeetings: "",
  childProtectionCommittee: "",
  wasteManagementCommittee: "",
  marketManagementUnit: "",
  disasterResponseUnit: "",
  waterSanitationProjects: "",
  genderEqualityInitiatives: "",
  otherTransferredFunctions: "",
  partnerSupportPrograms: "",
  partnerFundingAmount: "",
  villageLeaderHighSchoolCount: "",
  villageLeaderBachelorCount: "",
  villageLeaderComplaints: "",
};

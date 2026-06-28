"use client";

import { Input, Select, Textarea, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { EvaluationData } from "@/features/commune-evaluation/schema";
import { defaultEvaluationData } from "@/features/commune-evaluation/schema";
import { fetchProvinces, fetchDistricts, fetchCommunes, type ProvinceItem, type DistrictItem, type CommuneItem } from "@/lib/province-data";
import Autocomplete from "@/components/ui/Autocomplete";
import { useEffect, useState, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check, Plus, Trash2 } from "lucide-react";

interface EvaluationFormProps {
  initialData?: Partial<EvaluationData>;
  onSubmit: (data: EvaluationData) => void;
  onAutoFill?: () => void;
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">ជ្រើសរើស</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

const yesNoOptions = [
  { value: "មាន", label: "មាន" },
  { value: "មិនមាន", label: "មិនមាន" },
];

const yesNo2Options = [
  { value: "មាន", label: "មាន" },
  { value: "មិនមាន", label: "មិនមាន" },
];

const doneOptions = [
  { value: "បាន", label: "បាន" },
  { value: "មិនបាន", label: "មិនបាន" },
];

const trafficSignOptions = [
  { value: "គ្រប់គ្រាន់", label: "គ្រប់គ្រាន់" },
  { value: "មិនទាន់គ្រប់គ្រាន់", label: "មិនទាន់គ្រប់គ្រាន់" },
  { value: "មិនមាន", label: "មិនមាន" },
];

const marketQualityOptions = [
  { value: "ល្អ", label: "ល្អ" },
  { value: "មធ្យម", label: "មធ្យម" },
  { value: "មិនទាន់បានល្អ", label: "មិនទាន់បានល្អ" },
];

interface FieldConfig {
  key: keyof EvaluationData;
  label: string;
  type: "text" | "select" | "textarea";
  options?: { value: string; label: string }[];
}

export interface EvaluationFormHandle {
  submitForm: () => void;
}

const STEPS = [
  { key: "general", label: "ទូទៅ" },
  { key: "s1", label: "លទ្ធិប្រជាធិបតេយ្យ" },
  { key: "s2", label: "សន្តិសុខ" },
  { key: "s3", label: "សេវាសាធារណៈ" },
  { key: "s4", label: "សេដ្ឋកិច្ច" },
  { key: "s5", label: "គាំពារសង្គម" },
  { key: "s6", label: "យុត្តិធម៌សង្គម" },
  { key: "s7", label: "ស្វ័យភាព" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function StepIndicator({ current, onNavigate }: { current: StepKey; onNavigate: (key: StepKey) => void }) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => onNavigate(step.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap
                ${active ? "bg-blue-600 text-white shadow-md" : done ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400 hover:text-slate-600"}`}
            >
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold
                ${active ? "bg-white/20" : done ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}
              >
                {done ? <Check size={10} /> : i + 1}
              </div>
              <span className="hidden md:inline">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-4 h-0.5 mx-1 ${i < currentIdx ? "bg-blue-500" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default forwardRef<EvaluationFormHandle, EvaluationFormProps>(function EvaluationForm({
  initialData,
  onSubmit,
  onAutoFill,
}, ref) {
  const [form, setForm] = useState<EvaluationData>({
    ...defaultEvaluationData,
    ...initialData,
  });
  const [step, setStep] = useState<StepKey>("general");

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formRef.current?.requestSubmit();
    },
  }), [form]);

  const [provinces, setProvinces] = useState<{ label: string; value: string }[]>([]);
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [communes, setCommunes] = useState<CommuneItem[]>([]);
  const [provinceCodeMap, setProvinceCodeMap] = useState<Record<string, string>>({});
  const [districtCodeMap, setDistrictCodeMap] = useState<Record<string, string>>({});

  const loadDistricts = useCallback(() => {
    if (districts.length > 0) return;
    fetchDistricts().then((items) => {
      setDistricts(items);
      const map: Record<string, string> = {};
      items.forEach((i: DistrictItem) => { map[i.district_kh] = i.district_code; });
      setDistrictCodeMap(map);
    });
  }, [districts.length]);

  const loadCommunes = useCallback(() => {
    if (communes.length > 0) return;
    fetchCommunes().then((items) => setCommunes(items));
  }, [communes.length]);

  useEffect(() => {
    fetchProvinces().then((items) => {
      setProvinces(items.map((i: ProvinceItem) => ({ label: i.province_kh, value: i.province_kh })));
      const map: Record<string, string> = {};
      items.forEach((i: ProvinceItem) => { map[i.province_kh] = i.province_code; });
      setProvinceCodeMap(map);
      if (defaultEvaluationData.province || initialData?.province) {
        loadDistricts();
      }
    });
  }, []);

  const updateProvince = (v: string) => {
    if (v !== form.province) {
      setForm((prev) => ({ ...prev, province: v, district: "", commune: "" }));
      if (v) loadDistricts();
    }
  };

  const updateDistrict = (v: string) => {
    if (v !== form.district) {
      setForm((prev) => ({ ...prev, district: v, commune: "" }));
      if (v) loadCommunes();
    }
  };

  const filteredDistricts = form.province
    ? districts
        .filter((d) => d.province_code === provinceCodeMap[form.province])
        .map((d) => ({ label: d.district_kh, value: d.district_kh }))
    : [];

  const filteredCommunes = (form.province && form.district)
    ? communes
        .filter(
          (c) =>
            c.province_code === provinceCodeMap[form.province] &&
            c.district_code === districtCodeMap[form.district],
        )
        .map((c) => ({ label: c.commune_kh, value: c.commune_kh }))
    : [];

  const update = (field: keyof EvaluationData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const currentIdx = STEPS.findIndex((s) => s.key === step);
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEPS.length - 1;

  const goNext = () => {
    if (!isLast) setStep(STEPS[currentIdx + 1].key);
  };

  const goPrev = () => {
    if (!isFirst) setStep(STEPS[currentIdx - 1].key);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Step indicator */}
      <div className="sticky top-0 z-20 bg-white pb-3 pt-1 mb-4 border-b border-slate-100 flex justify-center">
        <StepIndicator current={step} onNavigate={(key) => setStep(key)} />
      </div>

      <div className="space-y-6">
        {step === "general" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6 space-y-1">
              <div className="font-moul text-lg text-slate-800">សម្រាប់រដ្ឋបាលឃុំ សង្កាត់នីមួយៗ</div>
              <div className="font-moul text-base text-slate-700">
                ទម្រង់ទិន្នន័យសម្រាប់ការវាយតម្លៃលទ្ធផលនៃការអនុវត្ត
              </div>
              <div className="font-moul text-base text-blue-700">
                គោលនយោបាយអភិវឌ្ឍន៍ឃុំ សង្កាត់អាណត្តិទី{form.mandateNumber} ({form.mandateYearStart}-{form.mandateYearEnd})
              </div>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">ព័ត៌មានទូទៅ</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Autocomplete label="រាជធានី / ខេត្ត" value={form.province} onChange={updateProvince} options={provinces} />
              <Autocomplete label="ក្រុង / ស្រុក / ខណ្ឌ" value={form.district} onChange={updateDistrict} options={filteredDistricts} />
              <Autocomplete label="ឃុំ / សង្កាត់" value={form.commune} onChange={(v) => update("commune", v)} options={filteredCommunes} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4 pt-4 border-t border-slate-100">
              <TextField label="អាណត្តិទី" value={form.mandateNumber} onChange={(v) => update("mandateNumber", v)} type="number" />
              <TextField label="ឆ្នាំចាប់ផ្តើម" value={form.mandateYearStart} onChange={(v) => update("mandateYearStart", v)} type="number" />
              <TextField label="ឆ្នាំបញ្ចប់" value={form.mandateYearEnd} onChange={(v) => update("mandateYearEnd", v)} type="number" />
            </div>
          </div>
        )}

        {step === "s1" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">១. លទ្ធិប្រជាធិបតេយ្យ និងសិទ្ធិសេរីភាព</h2>

            <h3 className="text-base font-semibold text-slate-800 mb-3 mt-2 border-b border-slate-200 pb-1">១.១.២ ការចុះឈ្មោះបោះឆ្នោត និងការបោះឆ្នោត</h3>
            <div className="space-y-3 mb-6">
              {(form.voterRecords ?? []).map((rec, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">ជម្រើស {i + 1}</span>
                    <button type="button" onClick={() => {
                      const next = [...(form.voterRecords ?? [])];
                      next.splice(i, 1);
                      setForm((prev) => ({ ...prev, voterRecords: next }));
                    }} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                    <SelectField label="ឆ្នាំ" value={rec.year} onChange={(v) => {
                      const next = [...(form.voterRecords ?? [])];
                      next[i] = { ...next[i], year: v };
                      setForm((prev) => ({ ...prev, voterRecords: next }));
                    }} options={["2023","2022","2021","2020","2019","2018","2017","2016","2015"].map((y) => ({ value: y, label: y }))} />
                    <SelectField label="ប្រភេទ" value={rec.electionType} onChange={(v) => {
                      const next = [...(form.voterRecords ?? [])];
                      next[i] = { ...next[i], electionType: v as "national" | "commune" };
                      setForm((prev) => ({ ...prev, voterRecords: next }));
                    }} options={[
                      { value: "national", label: "តំណាងរាស្ត្រ" },
                      { value: "commune", label: "ឃុំសង្កាត់" },
                    ]} />
                    <TextField label="ភាគរយចុះឈ្មោះ" value={rec.registeredVoters} onChange={(v) => {
                      const next = [...(form.voterRecords ?? [])];
                      next[i] = { ...next[i], registeredVoters: v };
                      setForm((prev) => ({ ...prev, voterRecords: next }));
                    }} />
                    <TextField label="ភាគរយទៅបោះឆ្នោត" value={rec.voterTurnout} onChange={(v) => {
                      const next = [...(form.voterRecords ?? [])];
                      next[i] = { ...next[i], voterTurnout: v };
                      setForm((prev) => ({ ...prev, voterRecords: next }));
                    }} />
                    <TextField label="ករណីហិង្សា" value={rec.violenceCases} onChange={(v) => {
                      const next = [...(form.voterRecords ?? [])];
                      next[i] = { ...next[i], violenceCases: v };
                      setForm((prev) => ({ ...prev, voterRecords: next }));
                    }} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setForm((prev) => ({
                ...prev,
                voterRecords: [...(prev.voterRecords ?? []), { year: "2023", electionType: "national" as const, registeredVoters: "", voterTurnout: "", violenceCases: "" }],
              }))} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                <Plus size={16} /> បន្ថែមជម្រើស
              </button>
            </div>

            <h3 className="text-base font-semibold text-slate-800 mb-3 mt-2 border-b border-slate-200 pb-1">១.១.៣ កម្រិតសមត្ថភាពរបស់ក្រុមប្រឹក្សាឃុំ សង្កាត់</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <TextField label="សមាជិកក្រុមប្រឹក្សាមានសញ្ញាបត្រទុតិយភូមិ" value={form.highSchoolDiploma} onChange={(v) => update("highSchoolDiploma", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាមានបរិញ្ញាបត្ររង" value={form.associateDegree} onChange={(v) => update("associateDegree", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាមានបរិញ្ញាបត្រ" value={form.bachelorDegree} onChange={(v) => update("bachelorDegree", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាមានបរិញ្ញាបត្រជាន់ខ្ពស់" value={form.masterDegree} onChange={(v) => update("masterDegree", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាត្រូវដកចេញ" value={form.removedCouncilMembers} onChange={(v) => update("removedCouncilMembers", v)} />
            </div>

            <h3 className="text-base font-semibold text-slate-800 mb-3 mt-2 border-b border-slate-200 pb-1">១.១.៤ សមាជិកក្រុមប្រឹក្សា ស្មៀន និងថ្នាក់ដឹកនាំភូមិ</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <TextField label="ចំនួនសមាជិកក្រុមប្រឹក្សាសរុប" value={form.totalCouncilMembers} onChange={(v) => update("totalCouncilMembers", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាជាស្ត្រី" value={form.femaleCouncilMembers} onChange={(v) => update("femaleCouncilMembers", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាជាយុវជន" value={form.youthCouncilMembers} onChange={(v) => update("youthCouncilMembers", v)} />
              <TextField label="ចំនួនស្មៀនសរុប" value={form.totalClerks} onChange={(v) => update("totalClerks", v)} />
              <TextField label="ស្មៀនជាស្ត្រី" value={form.femaleClerks} onChange={(v) => update("femaleClerks", v)} />
              <TextField label="ស្មៀនជាយុវជន" value={form.youthClerks} onChange={(v) => update("youthClerks", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិសរុប" value={form.totalVillageLeaders} onChange={(v) => update("totalVillageLeaders", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិជាស្ត្រី" value={form.femaleVillageLeaders} onChange={(v) => update("femaleVillageLeaders", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិជាយុវជន" value={form.youthVillageLeaders} onChange={(v) => update("youthVillageLeaders", v)} />
            </div>

            <h3 className="text-base font-semibold text-slate-800 mb-3 mt-2 border-b border-slate-200 pb-1">១.២ ការលើកកម្ពស់សិទ្ធិសេរីភាពរបស់ប្រជាពលរដ្ឋ</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <TextField label="ករណីរំលោភសិទ្ធិមនុស្ស" value={form.humanRightsViolations} onChange={(v) => update("humanRightsViolations", v)} />
              <TextField label="ប្រជាពលរដ្ឋចូលរួមវេទិកាសាធារណៈ" value={form.publicForumParticipants} onChange={(v) => update("publicForumParticipants", v)} />
              <TextField label="ប្រជាពលរដ្ឋចូលរួមប្រជុំក្រុមប្រឹក្សា" value={form.councilMeetingParticipants} onChange={(v) => update("councilMeetingParticipants", v)} />
              <TextField label="ប្រជាពលរដ្ឋចូលរួមរៀបចំផែនការ" value={form.planningProcessParticipants} onChange={(v) => update("planningProcessParticipants", v)} />
              <SelectField label="មានគណៈកម្មការគ្រប់គ្រងគម្រោង" value={form.hasProjectManagementCommittee} onChange={(v) => update("hasProjectManagementCommittee", v)} options={yesNo2Options} />
              <TextField label="ប្រជាពលរដ្ឋទទួលសេវារដ្ឋបាល" value={form.administrativeServiceRecipients} onChange={(v) => update("administrativeServiceRecipients", v)} />
              <TextField label="ចំនួនគម្រោងសហគមន៍" value={form.communityProjectsCount} onChange={(v) => update("communityProjectsCount", v)} />
              <TextField label="សំណើសេវា" value={form.serviceRequestCases} onChange={(v) => update("serviceRequestCases", v)} />
              <TextField label="សំណើដែលបានដោះស្រាយ" value={form.serviceResolvedCases} onChange={(v) => update("serviceResolvedCases", v)} />
            </div>

            <h3 className="text-base font-semibold text-slate-800 mb-3 mt-2 border-b border-slate-200 pb-1">១.៣ ភាពសុខដុមរមនាក្នុងសង្គម</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextField label="វិវាទសាសនា/ប្រពៃណី" value={form.religiousDisputeCases} onChange={(v) => update("religiousDisputeCases", v)} />
              <TextField label="វិវាទនយោបាយ" value={form.politicalDisputeCases} onChange={(v) => update("politicalDisputeCases", v)} />
              <SelectField label="មានមណ្ឌល/ទីធ្លាវប្បធម៌សហគមន៍" value={form.hasCommunityCulturalSpace} onChange={(v) => update("hasCommunityCulturalSpace", v)} options={yesNoOptions} />
            </div>
          </div>
        )}

        {step === "s2" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">២. សន្តិសុខ របៀបរៀបរយ និងសណ្តាប់ធ្នាប់សាធារណៈ</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextField label="ចំនួនប្រជាការពារ" value={form.communeGuardCount} onChange={(v) => update("communeGuardCount", v)} />
              <TextField label="វគ្គបណ្តុះបណ្តាលប្រជាការពារ" value={form.communeGuardTrainingCount} onChange={(v) => update("communeGuardTrainingCount", v)} />
              <TextField label="ការគាំទ្រប្រជាការពារ" value={form.communeGuardSupport} onChange={(v) => update("communeGuardSupport", v)} />
              <TextField label="មន្ត្រីនគរបាលរដ្ឋបាល" value={form.administrativePoliceCount} onChange={(v) => update("administrativePoliceCount", v)} />
              <TextField label="វគ្គបណ្តុះបណ្តាលនគរបាល" value={form.policeTrainingCount} onChange={(v) => update("policeTrainingCount", v)} />
              <TextField label="ការគាំទ្រនគរបាល" value={form.policeSupport} onChange={(v) => update("policeSupport", v)} />
              <TextField label="អត្រាបង្ក្រាបបទល្មើស (%)" value={form.crimeSuppressionRate} onChange={(v) => update("crimeSuppressionRate", v)} />
              <TextField label="កម្មវិធីអប់រំបទល្មើស" value={form.crimeEducationPrograms} onChange={(v) => update("crimeEducationPrograms", v)} />
              <TextField label="អ្នកចូលរួមអប់រំបទល្មើស" value={form.crimeEducationParticipants} onChange={(v) => update("crimeEducationParticipants", v)} />
              <SelectField label="មានការសម្រួលចរាចរណ៍" value={form.hasTrafficManagement} onChange={(v) => update("hasTrafficManagement", v)} options={yesNoOptions} />
              <SelectField label="ស្ថានភាពស្លាកសញ្ញាចរាចរណ៍" value={form.trafficSignsStatus} onChange={(v) => update("trafficSignsStatus", v)} options={[
                { value: "គ្រប់គ្រាន់", label: "គ្រប់គ្រាន់" },
                { value: "មិនទាន់គ្រប់គ្រាន់", label: "មិនទាន់គ្រប់គ្រាន់" },
                { value: "មិនមាន", label: "មិនមាន" },
              ]} />
              <TextField label="ចំនួនគ្រោះថ្នាក់ចរាចរណ៍" value={form.trafficAccidentCases} onChange={(v) => update("trafficAccidentCases", v)} />
              <TextField label="កន្លែងមានសណ្តាប់ធ្នាប់ល្អ" value={form.orderlyPlaces} onChange={(v) => update("orderlyPlaces", v)} />
              <TextField label="កន្លែងមិនទាន់មានសណ្តាប់ធ្នាប់" value={form.disorderlyPlaces} onChange={(v) => update("disorderlyPlaces", v)} />
              <SelectField label="មានចំណតសាធារណៈ" value={form.hasPublicParking} onChange={(v) => update("hasPublicParking", v)} options={yesNoOptions} />
              <TextField label="វគ្គអប់រំច្បាប់ចរាចរណ៍" value={form.trafficLawEducationSessions} onChange={(v) => update("trafficLawEducationSessions", v)} />
              <TextField label="អ្នកចូលរួមអប់រំច្បាប់ចរាចរណ៍" value={form.trafficLawEducationParticipants} onChange={(v) => update("trafficLawEducationParticipants", v)} />
            </div>
          </div>
        )}

        {step === "s3" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">៣. សេវាសាធារណៈ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">៣.១ សេវារដ្ឋបាល</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TextField label="ចំនួនអ្នកទទួលសេវារដ្ឋបាល" value={form.serviceRecipientsCount} onChange={(v) => update("serviceRecipientsCount", v)} />
                  <TextField label="បញ្ជីកំណើត" value={form.birthRegistrations} onChange={(v) => update("birthRegistrations", v)} />
                  <TextField label="បញ្ជីអាពាហ៍ពិពាហ៍" value={form.marriageRegistrations} onChange={(v) => update("marriageRegistrations", v)} />
                  <TextField label="បញ្ជីមរណភាព" value={form.deathRegistrations} onChange={(v) => update("deathRegistrations", v)} />
                  <TextField label="សៀវភៅស្នាក់នៅ/គ្រួសារ" value={form.residenceBookIssued} onChange={(v) => update("residenceBookIssued", v)} />
                  <TextField label="អត្តសញ្ញាណប័ណ្ណ" value={form.identityCardsIssued} onChange={(v) => update("identityCardsIssued", v)} />
                  <TextAreaField label="មធ្យោបាយទទួលមតិរិះគន់" value={form.feedbackMethods} onChange={(v) => update("feedbackMethods", v)} />
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">៣.២ សេវាអប់រំ</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <SelectField label="សមាជិកក្រុមប្រឹក្សាជាសមាជិកគណៈកម្មាធិការសាលា" value={form.hasCouncilMemberSchoolCommittee} onChange={(v) => update("hasCouncilMemberSchoolCommittee", v)} options={yesNoOptions} />
                  <SelectField label="សមាជិកក្រុមប្រឹក្សាក្រុង/ស្រុកជាសមាជិកគណៈកម្មាធិការសាលា" value={form.hasDistrictMemberSchoolCommittee} onChange={(v) => update("hasDistrictMemberSchoolCommittee", v)} options={yesNoOptions} />
                  <TextField label="ចំនួនកិច្ចប្រជុំសាលា" value={form.schoolMeetingCount} onChange={(v) => update("schoolMeetingCount", v)} />
                  <SelectField label="មានការគាំទ្រគ្រូបង្រៀនតំបន់លំបាក" value={form.hasTeacherSupport} onChange={(v) => update("hasTeacherSupport", v)} options={yesNoOptions} />
                  <TextAreaField label="ព័ត៌មានលម្អិតការគាំទ្រគ្រូបង្រៀន" value={form.teacherSupportDetails} onChange={(v) => update("teacherSupportDetails", v)} />
                  <TextField label="ភាគរយសិស្សទទួលអាហារូបករណ៍" value={form.scholarshipPercentage} onChange={(v) => update("scholarshipPercentage", v)} />
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">៣.៣ សេវាសុខាភិបាល</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TextField label="អ្នកទទួលសេវាថែទាំសុខភាពបឋម" value={form.primaryHealthcareRecipients} onChange={(v) => update("primaryHealthcareRecipients", v)} />
                  <SelectField label="មានមណ្ឌលសុខភាព" value={form.hasHealthCenter} onChange={(v) => update("hasHealthCenter", v)} options={yesNoOptions} />
                  <SelectField label="មានមន្ទីរពេទ្យបង្អែក" value={form.hasReferralHospital} onChange={(v) => update("hasReferralHospital", v)} options={yesNoOptions} />
                  <SelectField label="មានការលើកទឹកចិត្តគ្រូពេទ្យ" value={form.hasDoctorIncentives} onChange={(v) => update("hasDoctorIncentives", v)} options={yesNoOptions} />
                  <TextAreaField label="ព័ត៌មានលម្អិតការគាំទ្រគ្រូពេទ្យ" value={form.doctorSupportDetails} onChange={(v) => update("doctorSupportDetails", v)} />
                  <SelectField label="មានកន្លែងហាត់ប្រាណសាធារណៈ" value={form.hasPublicExerciseSpace} onChange={(v) => update("hasPublicExerciseSpace", v)} options={yesNoOptions} />
                  <TextField label="កម្មវិធីផ្សព្វផ្សាយសុខាភិបាល" value={form.healthAwarenessPrograms} onChange={(v) => update("healthAwarenessPrograms", v)} />
                  <TextField label="អ្នកចូលរួមផ្សព្វផ្សាយសុខាភិបាល" value={form.healthAwarenessParticipants} onChange={(v) => update("healthAwarenessParticipants", v)} />
                  <SelectField label="មានការចូលរួមថែទាំសុខភាពសហគមន៍" value={form.hasCommunityHealthParticipation} onChange={(v) => update("hasCommunityHealthParticipation", v)} options={yesNoOptions} />
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">៣.៤ ហេដ្ឋារចនាសម្ព័ន្ធ</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TextField label="ផ្លូវបេតុងថ្មី (ខ្សែ)" value={form.newConcreteRoads} onChange={(v) => update("newConcreteRoads", v)} />
                  <TextField label="ផ្លូវបេតុងថ្មី (គីឡូម៉ែត្រ)" value={form.newConcreteRoadKm} onChange={(v) => update("newConcreteRoadKm", v)} />
                  <TextField label="ផ្លូវកៅស៊ូថ្មី (ខ្សែ)" value={form.newAsphaltRoads} onChange={(v) => update("newAsphaltRoads", v)} />
                  <TextField label="ផ្លូវកៅស៊ូថ្មី (គីឡូម៉ែត្រ)" value={form.newAsphaltRoadKm} onChange={(v) => update("newAsphaltRoadKm", v)} />
                  <TextField label="ជួសជុលផ្លូវដី/គ្រួសក្រហម (ខ្សែ)" value={form.repairedDirtRoads} onChange={(v) => update("repairedDirtRoads", v)} />
                  <TextField label="ជួសជុលផ្លូវដី/គ្រួសក្រហម (គីឡូម៉ែត្រ)" value={form.repairedDirtRoadKm} onChange={(v) => update("repairedDirtRoadKm", v)} />
                  <TextField label="ជួសជុលផ្លូវបេតុង (ខ្សែ)" value={form.repairConcreteRoads} onChange={(v) => update("repairConcreteRoads", v)} />
                  <TextField label="ជួសជុលផ្លូវបេតុង (គីឡូម៉ែត្រ)" value={form.repairConcreteRoadKm} onChange={(v) => update("repairConcreteRoadKm", v)} />
                  <TextField label="ជួសជុលផ្លូវកៅស៊ូ (ខ្សែ)" value={form.repairAsphaltRoads} onChange={(v) => update("repairAsphaltRoads", v)} />
                  <TextField label="ជួសជុលផ្លូវកៅស៊ូ (គីឡូម៉ែត្រ)" value={form.repairAsphaltRoadKm} onChange={(v) => update("repairAsphaltRoadKm", v)} />
                  <TextField label="កសាងផ្លូវដី/គ្រួសក្រហម (ខ្សែ)" value={form.constructDirtRoads} onChange={(v) => update("constructDirtRoads", v)} />
                  <TextField label="កសាងផ្លូវដី/គ្រួសក្រហម (គីឡូម៉ែត្រ)" value={form.constructDirtRoadKm} onChange={(v) => update("constructDirtRoadKm", v)} />
                  <TextField label="ផ្លូវប្រែក្លាយទៅកៅស៊ូ/បេតុង (ខ្សែ)" value={form.upgradedRoadLines} onChange={(v) => update("upgradedRoadLines", v)} />
                  <TextField label="ផ្លូវប្រែក្លាយទៅកៅស៊ូ/បេតុង (គីឡូម៉ែត្រ)" value={form.upgradedRoadKm} onChange={(v) => update("upgradedRoadKm", v)} />
                  <TextField label="ប្រឡាយ/លូ (ខ្សែ)" value={form.drainageLines} onChange={(v) => update("drainageLines", v)} />
                  <TextField label="ប្រឡាយ/លូ (ម៉ែត្រ)" value={form.drainageMeters} onChange={(v) => update("drainageMeters", v)} />
                  <TextField label="ស្ថានីយបូមទឹក" value={form.pumpingStations} onChange={(v) => update("pumpingStations", v)} />
                  <TextField label="ប្រព័ន្ធចម្រោះទឹកកខ្វក់" value={form.waterTreatmentPlants} onChange={(v) => update("waterTreatmentPlants", v)} />
                  <TextField label="គម្រោងសហគមន៍ឯកជន/សប្បុរសជន" value={form.privateCommunityProjects} onChange={(v) => update("privateCommunityProjects", v)} />
                  <TextField label="គម្រោងសហគមន៍ឯកជន/សប្បុរសជន (គីឡូម៉ែត្រ)" value={form.privateCommunityProjectsKm} onChange={(v) => update("privateCommunityProjectsKm", v)} />
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">៣.៥-៣.១១ ទឹក ថាមពល បច្ចេកវិទ្យា ដីធ្លី បរិស្ថាន គ្រោះធម្មជាតិ</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TextField label="ភាគរយគ្រួសារមានទឹកស្អាត" value={form.cleanWaterPct} onChange={(v) => update("cleanWaterPct", v)} />
                  <TextField label="ភាគរយគ្រួសារមានទឹកបំពង់" value={form.pipedWaterPct} onChange={(v) => update("pipedWaterPct", v)} />
                  <TextField label="អាងស្តុកទឹកខ្នាតតូច" value={form.smallReservoirs} onChange={(v) => update("smallReservoirs", v)} />
                  <TextField label="ប្រភពទឹកដែលបានដកស្តារ" value={form.restoredWaterBodies} onChange={(v) => update("restoredWaterBodies", v)} />
                  <TextField label="ប្រវែងប្រភពទឹកដែលបានដកស្តារ (ម)" value={form.restoredWaterBodiesM} onChange={(v) => update("restoredWaterBodiesM", v)} />
                  <TextField label="ប្រឡាយស្រោចស្រព (ខ្សែ)" value={form.irrigationCanals} onChange={(v) => update("irrigationCanals", v)} />
                  <TextField label="ប្រឡាយស្រោចស្រព (ម)" value={form.irrigationCanalsMeters} onChange={(v) => update("irrigationCanalsMeters", v)} />
                  <TextField label="ប្រព័ន្ធបញ្ចូលទឹក" value={form.waterInletSystems} onChange={(v) => update("waterInletSystems", v)} />
                  <TextField label="វគ្គបណ្តុះបណ្តាលគ្រប់គ្រងទឹក" value={form.waterManagementTraining} onChange={(v) => update("waterManagementTraining", v)} />
                  <TextField label="សហគមន៍កសិករប្រើប្រាស់ទឹក" value={form.farmingCommunities} onChange={(v) => update("farmingCommunities", v)} />
                  <TextField label="វគ្គបណ្តុះបណ្តាលសហគមន៍ទឹក" value={form.farmingCommunityTraining} onChange={(v) => update("farmingCommunityTraining", v)} />
                  <SelectField label="មានអន្តរាគមន៍បូមទឹកសង្គ្រោះរាំងស្ងួត" value={form.hasDroughtPumping} onChange={(v) => update("hasDroughtPumping", v)} options={yesNoOptions} />
                  <TextField label="ភាគរយភូមិមានអគ្គិសនី" value={form.electricityCoveragePct} onChange={(v) => update("electricityCoveragePct", v)} />
                  <SelectField label="ឃុំសង្កាត់មានគេហទំព័រ/Apps" value={form.hasCommuneWebsite} onChange={(v) => update("hasCommuneWebsite", v)} options={yesNoOptions} />
                  <SelectField label="មណ្ឌលសុខភាពមានគេហទំព័រ/Apps" value={form.hasHealthCenterWebsite} onChange={(v) => update("hasHealthCenterWebsite", v)} options={yesNoOptions} />
                  <SelectField label="សាលារៀនមានគេហទំព័រ/Apps" value={form.hasSchoolWebsite} onChange={(v) => update("hasSchoolWebsite", v)} options={yesNoOptions} />
                  <SelectField label="ប៉ុស្តិ៍នគរបាលមានគេហទំព័រ/Apps" value={form.hasPoliceWebsite} onChange={(v) => update("hasPoliceWebsite", v)} options={yesNoOptions} />
                  <TextField label="ករណីវិវាទដីធ្លី" value={form.landDisputeCases} onChange={(v) => update("landDisputeCases", v)} />
                  <SelectField label="មានផែនការប្រើប្រាស់ដី" value={form.hasLandUsePlan} onChange={(v) => update("hasLandUsePlan", v)} options={yesNoOptions} />
                  <TextField label="សហគមន៍សន្សំប្រាក់/ជំនាញសាងសង់" value={form.targetCommunities} onChange={(v) => update("targetCommunities", v)} />
                  <SelectField label="មានយន្តការប្រមូលសំរាម" value={form.hasWasteCollection} onChange={(v) => update("hasWasteCollection", v)} options={yesNoOptions} />
                  <TextField label="កម្មវិធីផ្សព្វផ្សាយច្បាប់បរិស្ថាន" value={form.environmentalLawPrograms} onChange={(v) => update("environmentalLawPrograms", v)} />
                  <TextField label="អ្នកចូលរួមផ្សព្វផ្សាយបរិស្ថាន" value={form.environmentalLawParticipants} onChange={(v) => update("environmentalLawParticipants", v)} />
                  <TextField label="កម្មវិធីភូមិបៃតង" value={form.greenVillagePrograms} onChange={(v) => update("greenVillagePrograms", v)} />
                  <SelectField label="បញ្ចូលអភិវឌ្ឍន៍ដោយចីរភាពក្នុងផែនការ" value={form.hasGreenVillageProgram} onChange={(v) => update("hasGreenVillageProgram", v)} options={yesNoOptions} />
                  <TextField label="កម្មវិធីអប់រំគ្រោះថ្នាក់ចំណីអាហារ" value={form.foodSafetyPrograms} onChange={(v) => update("foodSafetyPrograms", v)} />
                  <TextField label="ករណីពុលចំណីអាហារ" value={form.foodPoisoningCases} onChange={(v) => update("foodPoisoningCases", v)} />
                  <SelectField label="មានយន្តការសង្គ្រោះបន្ទាន់ទឹកជំនន់" value={form.hasEmergencyResponse} onChange={(v) => update("hasEmergencyResponse", v)} options={yesNoOptions} />
                  <SelectField label="មានប្រព័ន្ធការពារគ្រោះធម្មជាតិ" value={form.hasDisasterPreparedness} onChange={(v) => update("hasDisasterPreparedness", v)} options={yesNoOptions} />
                  <SelectField label="មានការការពារសិទ្ធិមនុស្ស" value={form.hasHumanRightsProtection} onChange={(v) => update("hasHumanRightsProtection", v)} options={yesNoOptions} />
                  <TextField label="គ្រួសារទទួលអំណោយចំណីអាហារ" value={form.smallBusinessesCount} onChange={(v) => update("smallBusinessesCount", v)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "s4" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">៤. សេដ្ឋកិច្ចមូលដ្ឋាន</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextField label="សហគ្រាសខ្នាតតូចបង្កើត" value={form.smallBusinessesCount} onChange={(v) => update("smallBusinessesCount", v)} />
              <TextField label="សហគ្រាសខ្នាតតូចចុះបញ្ជី" value={form.registeredSmallBusinesses} onChange={(v) => update("registeredSmallBusinesses", v)} />
              <SelectField label="មានផ្សព្វផ្សាយព័ត៌មានហិរញ្ញវត្ថុ" value={form.hasFinancialLiteracy} onChange={(v) => update("hasFinancialLiteracy", v)} options={doneOptions} />
              <SelectField label="មានបណ្តុះបណ្តាលជំនាញយុវជន" value={form.hasYouthSkillsTraining} onChange={(v) => update("hasYouthSkillsTraining", v)} options={yesNoOptions} />
              <TextField label="ផ្សារសហគមន៍" value={form.hasCommunityMarket} onChange={(v) => update("hasCommunityMarket", v)} />
              <SelectField label="មានផ្សព្វផ្សាយបេតិកភណ្ឌ" value={form.hasCulturalPromotion} onChange={(v) => update("hasCulturalPromotion", v)} options={yesNo2Options} />
              <SelectField label="មានបណ្តុះបណ្តាលសិល្បៈ" value={form.hasArtsTraining} onChange={(v) => update("hasArtsTraining", v)} options={doneOptions} />
              <TextField label="ករណីបទល្មើសធនធានធម្មជាតិ" value={form.naturalResourceCrimeCases} onChange={(v) => update("naturalResourceCrimeCases", v)} />
              <SelectField label="មានគម្រោងបង្កើតមុខរបរថ្មី" value={form.hasNewMarketProjects} onChange={(v) => update("hasNewMarketProjects", v)} options={yesNo2Options} />
              <TextAreaField label="មុខរបរថ្មីលម្អិត" value={form.newMarketDetails} onChange={(v) => update("newMarketDetails", v)} />
              <TextField label="សហគមន៍ទេសចរណ៍" value={form.tourismCommunities} onChange={(v) => update("tourismCommunities", v)} />
              <TextField label="ចំនួនផ្សារ" value={form.marketCount} onChange={(v) => update("marketCount", v)} />
              <TextField label="ផ្សារមានគណៈកម្មការគ្រប់គ្រង" value={form.hasMarketManagement} onChange={(v) => update("hasMarketManagement", v)} />
              <SelectField label="គុណភាពគ្រប់គ្រងផ្សារ" value={form.marketManagementQuality} onChange={(v) => update("marketManagementQuality", v)} options={[
                { value: "ល្អ", label: "ល្អ" },
                { value: "មធ្យម", label: "មធ្យម" },
                { value: "មិនទាន់បានល្អ", label: "មិនទាន់បានល្អ" },
              ]} />
              <TextField label="គម្រោងហេដ្ឋារចនាសម្ព័ន្ធតំបន់ព្រំដែន" value={form.borderAreaInfrastructureProjects} onChange={(v) => update("borderAreaInfrastructureProjects", v)} />
              <TextAreaField label="ព័ត៌មានលម្អិតតំបន់ព្រំដែន" value={form.borderAreaInfrastructureDetails} onChange={(v) => update("borderAreaInfrastructureDetails", v)} />
            </div>
          </div>
        )}

        {step === "s5" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">៥. ការគាំពារសង្គម</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <SelectField label="មានសេវាថែទាំកុមារងាយរងគ្រោះ" value={form.hasDisabledChildCareServices} onChange={(v) => update("hasDisabledChildCareServices", v)} options={doneOptions} />
              <SelectField label="បញ្ចូលតម្រូវការជនជាតិដើមភាគតិច" value={form.minorityNeedsIncluded} onChange={(v) => update("minorityNeedsIncluded", v)} options={doneOptions} />
              <TextField label="គម្រោងជនជាតិដើមភាគតិចបានអនុវត្ត" value={form.minorityProjectsImplemented} onChange={(v) => update("minorityProjectsImplemented", v)} />
              <TextField label="បេក្ខជនជនជាតិដើមភាគតិច ២០២២" value={form.minorityCandidates2022} onChange={(v) => update("minorityCandidates2022", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាជនជាតិដើមភាគតិច ២០២២-២០២៦" value={form.minorityCouncilMembers2022to2026} onChange={(v) => update("minorityCouncilMembers2022to2026", v)} />
              <SelectField label="មានមូលនិធិគាំទ្រជនពិការ/ចាស់" value={form.hasSupportInfrastructureForDisabledElderly} onChange={(v) => update("hasSupportInfrastructureForDisabledElderly", v)} options={yesNo2Options} />
              <SelectField label="មានសហគមន៍ថែទាំជនពិការ/ចាស់" value={form.hasCommunityCareFacility} onChange={(v) => update("hasCommunityCareFacility", v)} options={yesNo2Options} />
              <TextField label="បេក្ខជនជនពិការ ២០២២" value={form.disabledCandidates2022} onChange={(v) => update("disabledCandidates2022", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាជនពិការ ២០២២-២០២៦" value={form.disabledCouncilMembers2022to2026} onChange={(v) => update("disabledCouncilMembers2022to2026", v)} />
              <TextField label="គ្រួសារក្រីក្រទទួលជំនួយ" value={form.poorHouseholdsReliefCount} onChange={(v) => update("poorHouseholdsReliefCount", v)} />
              <SelectField label="មានផែនការបញ្ជ្រាបយេនឌ័រ" value={form.hasGenderMainstreamingPlan} onChange={(v) => update("hasGenderMainstreamingPlan", v)} options={yesNo2Options} />
              <TextField label="សហគ្រាសដឹកនាំដោយស្ត្រី/កុមារ" value={form.womenChildrenLedSmallBusinesses} onChange={(v) => update("womenChildrenLedSmallBusinesses", v)} />
              <TextAreaField label="ព័ត៌មានលម្អិតផែនការយេនឌ័រ" value={form.genderMainstreamingPlanDetails} onChange={(v) => update("genderMainstreamingPlanDetails", v)} />
            </div>
          </div>
        )}

        {step === "s6" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">៦. លទ្ធិប្រជាធិបតេយ្យ និងយុត្តិធម៌សង្គម</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextField label="ភាគរយការវាយតម្លៃដោះស្រាយបញ្ហា" value={form.problemsAssessmentSessions} onChange={(v) => update("problemsAssessmentSessions", v)} />
              <TextField label="ប្រជាពលរដ្ឋចូលរួមប្រជុំក្រុមប្រឹក្សា" value={form.citizensParticipatingCouncilMeetings} onChange={(v) => update("citizensParticipatingCouncilMeetings", v)} />
              <TextField label="មធ្យោបាយចូលរួមប្រជាជន" value={form.citizenParticipationMechanisms} onChange={(v) => update("citizenParticipationMechanisms", v)} />
              <TextField label="ភាគរយដោះស្រាយវិវាទ" value={form.disputeResolutionRate} onChange={(v) => update("disputeResolutionRate", v)} />
              <TextField label="កម្មវិធីផ្សព្វផ្សាយច្បាប់" value={form.legalAwarenessProgramsCount} onChange={(v) => update("legalAwarenessProgramsCount", v)} />
              <TextField label="ចំនួនអធិការកិច្ចក្រុមប្រឹក្សា" value={form.councilInspectionsCount} onChange={(v) => update("councilInspectionsCount", v)} />
              <TextField label="សមាជិកក្រុមប្រឹក្សាត្រូវវិន័យ" value={form.disciplinedCouncilMembers} onChange={(v) => update("disciplinedCouncilMembers", v)} />
              <TextField label="ស្មៀនត្រូវវិន័យ" value={form.disciplinedVillageChiefs} onChange={(v) => update("disciplinedVillageChiefs", v)} />
              <TextField label="ថ្នាក់ដឹកនាំឃុំត្រូវវិន័យ" value={form.disciplinedCommuneLeaders} onChange={(v) => update("disciplinedCommuneLeaders", v)} />
              <SelectField label="ធ្លាប់ទទួលរង្វាន់លើកទឹកចិត្ត" value={form.hasReceivedIncentives} onChange={(v) => update("hasReceivedIncentives", v)} options={yesNoOptions} />
            </div>
          </div>
        )}

        {step === "s7" && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">៧. ស្វ័យភាព សិទ្ធិអំណាច មុខងារ និងធនធាន</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextField label="សំណើប្រជាពលរដ្ឋដែលបញ្ជូនឡើង" value={form.citizenRequestsEscalated} onChange={(v) => update("citizenRequestsEscalated", v)} />
              <SelectField label="ក្រុមប្រឹក្សាចូលរួមគ្រប់គ្រងសាលា" value={form.hasCouncilInSchoolManagement} onChange={(v) => update("hasCouncilInSchoolManagement", v)} options={yesNo2Options} />
              <TextField label="មត្តេយ្យសហគមន៍" value={form.communityPreschoolsCount} onChange={(v) => update("communityPreschoolsCount", v)} />
              <SelectField label="គ្រប់គ្រងតំបន់ការពារធម្មជាតិ" value={form.hasManagedProtectedArea} onChange={(v) => update("hasManagedProtectedArea", v)} options={yesNo2Options} />
              <TextField label="គម្រោងធន់នឹងប្រែប្រួលអាកាសធាតុ" value={form.climateResilienceProjects} onChange={(v) => update("climateResilienceProjects", v)} />
              <SelectField label="ផ្សព្វផ្សាយប្រែប្រួលអាកាសធាតុ" value={form.hasClimateChangeAwareness} onChange={(v) => update("hasClimateChangeAwareness", v)} options={doneOptions} />
              <SelectField label="ចូលរួមគ្រប់គ្រងមណ្ឌលសុខភាព" value={form.hasCouncilInHealthManagement} onChange={(v) => update("hasCouncilInHealthManagement", v)} options={doneOptions} />
              <SelectField label="សេវាការពារកុមារ" value={form.hasChildProtectionServices} onChange={(v) => update("hasChildProtectionServices", v)} options={doneOptions} />
              <SelectField label="គ្រប់គ្រងសំរាម/បរិស្ថាន" value={form.hasWasteManagement} onChange={(v) => update("hasWasteManagement", v)} options={doneOptions} />
              <TextAreaField label="ព័ត៌មានលម្អិតគ្រប់គ្រងសំរាម" value={form.wasteManagementDetails} onChange={(v) => update("wasteManagementDetails", v)} />
              <SelectField label="គ្រប់គ្រងផ្សារសហគមន៍" value={form.hasManagedCommunityMarket} onChange={(v) => update("hasManagedCommunityMarket", v)} options={doneOptions} />
              <TextField label="ប្រជាពលរដ្ឋរងគ្រោះធម្មជាតិ" value={form.disasterAffectedCitizens} onChange={(v) => update("disasterAffectedCitizens", v)} />
              <SelectField label="គម្រោងទឹកស្អាត/បង្គន់" value={form.hasCleanWaterSanitation} onChange={(v) => update("hasCleanWaterSanitation", v)} options={doneOptions} />
              <TextField label="គម្រោងផ្គត់ផ្គង់ទឹកស្អាត" value={form.cleanWaterProjects} onChange={(v) => update("cleanWaterProjects", v)} />
              <TextField label="គម្រោងបង្គន់អនាម័យ" value={form.toiletConstructionProjects} onChange={(v) => update("toiletConstructionProjects", v)} />
              <SelectField label="គម្រោងសមភាពយេនឌ័រ" value={form.hasGenderEqualityProjects} onChange={(v) => update("hasGenderEqualityProjects", v)} options={doneOptions} />
              <TextField label="ចំនួនគម្រោងសមភាពយេនឌ័រ" value={form.genderEqualityProjectsCount} onChange={(v) => update("genderEqualityProjectsCount", v)} />
              <TextAreaField label="មុខងារចាំបាច់ផ្សេងៗ" value={form.otherEssentialFunctions} onChange={(v) => update("otherEssentialFunctions", v)} />
              <SelectField label="កៀរគរជំនួយអភិវឌ្ឍន៍" value={form.hasMobilizedDevelopmentSupport} onChange={(v) => update("hasMobilizedDevelopmentSupport", v)} options={yesNo2Options} />
              <TextField label="ថវិកាដែលកៀរគរបាន" value={form.mobilizedBudgetAmount} onChange={(v) => update("mobilizedBudgetAmount", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិមានបរិញ្ញាបត្រ" value={form.villageLeadersWithBachelor} onChange={(v) => update("villageLeadersWithBachelor", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិមានបរិញ្ញាបត្ររង" value={form.villageLeadersWithAssociate} onChange={(v) => update("villageLeadersWithAssociate", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិមានទុតិយភូមិ" value={form.villageLeadersWithHighSchool} onChange={(v) => update("villageLeadersWithHighSchool", v)} />
              <TextField label="ថ្នាក់ដឹកនាំភូមិរងការបណ្តឹង" value={form.villageLeadersDisciplined} onChange={(v) => update("villageLeadersDisciplined", v)} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 z-20 mt-6 bg-white border-t border-slate-100 px-1 py-3 flex items-center justify-between">
        <div>
          {!isFirst && (
            <Button type="button" variant="outline" onClick={goPrev} className="gap-1">
              <ChevronLeft size={14} /> ថយក្រោយ
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">ជំហានទី {currentIdx + 1} នៃ {STEPS.length}</span>
          {!isLast ? (
            <Button type="button" onClick={goNext} className="bg-blue-600 text-white hover:bg-blue-700 gap-1">
              បន្ទាប់ <ChevronRight size={14} />
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
});

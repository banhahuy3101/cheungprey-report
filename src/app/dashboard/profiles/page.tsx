"use client";

import { useEffect, useState } from "react";
import {
  Plus, Pencil, Trash2, ChevronRight, ChevronLeft,
  User, Building2, Briefcase, Phone, Check, Save, ArrowLeft, Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Badge } from "@/components/ui/Badge";
import {
  listUserProfiles,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  defaultUserProfile,
  type UserProfile,
} from "@/lib/user-profile-service";

const MEMBERSHIP_STATUSES = [
  { value: "active", label: "សមាជិកសកម្ម" },
  { value: "pending", label: "កំពុងរង់ចាំការអនុម័ត" },
  { value: "suspended", label: "ផ្អាកសមាជិកភាព" },
  { value: "retired", label: "ចូលនិវត្តន៍" },
  { value: "removed", label: "បញ្ចប់សមាជិកភាព" },
];

const PARTY_LEVELS = [
  { value: "village", label: "ភូមិ" },
  { value: "commune", label: "ឃុំ" },
  { value: "district", label: "ស្រុក" },
  { value: "province", label: "ខេត្ត" },
  { value: "central", label: "កណ្ដាល" },
];

const STEPS = [
  { key: "personal", label: "ផ្ទាល់ខ្លួន", icon: User },
  { key: "party", label: "គណបក្ស", icon: Building2 },
  { key: "work", label: "ការងារ", icon: Briefcase },
  { key: "emergency", label: "បន្ទាន់", icon: Phone },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function StepIndicator({ current, onNavigate }: { current: StepKey; onNavigate: (key: StepKey) => void }) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-0 w-full">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex-1 flex items-center">
            <button
              type="button"
              onClick={() => onNavigate(step.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                ${active ? "bg-blue-600 text-white shadow-md" : done ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400 hover:text-slate-600"}`}
            >
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold
                ${active ? "bg-white/20" : done ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}
              >
                {done ? <Check size={12} /> : i + 1}
              </div>
              <span className="hidden sm:inline font-medium">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${i < currentIdx ? "bg-blue-500" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface UserListItem { id: string; name: string; email: string; }

function PersonalForm({ form, update, users: userList, onUserCreated, onNewUser }: {
  form: ReturnType<typeof defaultUserProfile>;
  update: <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => void;
  users: UserListItem[];
  onUserCreated?: (userId: string) => void;
  onNewUser?: (user: UserListItem) => void;
}) {
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "commune_chief" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!newUser.email || !newUser.password) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      setError("អ៊ីមែលមិនត្រឹមត្រូវ (ឧ. name@domain.com)");
      return;
    }
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser, name: userSearchQuery }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create user");
      }
      const profile = await res.json();
      const newUserItem = { id: profile.id, name: profile.name, email: profile.email };
      onNewUser?.(newUserItem);
      onUserCreated?.(profile.id);
      update("user_id", profile.id);
      setShowCreate(false);
      setUserSearchQuery("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-3">
        <div><Label required>នាមត្រកូល (ខ្មែរ)</Label><Input value={form.last_name_kh} onChange={(e) => update("last_name_kh", e.target.value)} required /></div>
        <div><Label required>នាមខ្លួន (ខ្មែរ)</Label><Input value={form.first_name_kh} onChange={(e) => update("first_name_kh", e.target.value)} required /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>នាមត្រកូល (អង់គ្លេស)</Label><Input value={form.last_name_en ?? ""} onChange={(e) => update("last_name_en", e.target.value)} /></div>
        <div><Label>នាមខ្លួន (អង់គ្លេស)</Label><Input value={form.first_name_en ?? ""} onChange={(e) => update("first_name_en", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>ភេទ</Label>
          <Select value={form.gender ?? ""} onChange={(e) => update("gender", e.target.value)}>
            <option value="">—</option><option value="male">ប្រុស</option><option value="female">ស្រី</option>
          </Select>
        </div>
        <div><Label>ថ្ងៃខែឆ្នាំកំណើត</Label><Input type="date" value={form.date_of_birth ?? ""} onChange={(e) => update("date_of_birth", e.target.value || null)} /></div>
        <div><Label>សញ្ជាតិ</Label><Input value={form.nationality ?? ""} onChange={(e) => update("nationality", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>អត្តសញ្ញាណប័ណ្ណ</Label><Input value={form.national_id ?? ""} onChange={(e) => update("national_id", e.target.value)} /></div>
        <div><Label>ទូរស័ព្ទ</Label><Input value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} /></div>
      </div>
      <div><Label>អាសយដ្ឋាន</Label><Input value={form.address ?? ""} onChange={(e) => update("address", e.target.value)} /></div>
      <div><Label>អ្នកប្រើ (ភ្ជាប់គណនី)</Label>
        <SearchSelect
          options={userList.map((u) => ({ value: u.id, label: `${u.name} (${u.email})` }))}
          value={form.user_id ?? ""}
          onChange={(val) => update("user_id", val || null)}
          placeholder="ជ្រើសរើសអ្នកប្រើ..."
          onSearch={setUserSearchQuery}
        />
        {!form.user_id && !showCreate && (
          <button
            type="button"
            onClick={() => {
              if (userSearchQuery && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userSearchQuery)) {
                setNewUser((p) => ({ ...p, email: userSearchQuery }));
              }
              setShowCreate(true);
            }}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <Plus size={14} />
            {userSearchQuery.length > 6
              ? <>បង្កើតអ្នកប្រើ <span className="font-mono">`{userSearchQuery}`</span></>
              : <>បង្កើតអ្នកប្រើថ្មី</>}
          </button>
        )}
        {showCreate && (
          <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50 p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div><Label className="text-xs">អ៊ីមែល</Label><Input type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))} /></div>
              <div><Label className="text-xs">ពាក្យសម្ងាត់</Label><Input type="password" value={newUser.password} onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))} /></div>
            </div>
            <div><Label className="text-xs">តួនាទី</Label>
              <Select value={newUser.role} onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}>
                <option value="commune_chief">ប្រធានឃុំ</option>
                <option value="super_admin">Super Admin</option>
              </Select>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={creating}>
                {creating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                បង្កើត
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowCreate(false)}>បោះបង់</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PartyForm({ form, update }: {
  form: ReturnType<typeof defaultUserProfile>;
  update: <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => void;
}) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm text-blue-700">
        ព័ត៌មានសមាជិកភាពគណបក្ស
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label required>លេខសមាជិក</Label><Input value={form.party_member_code} onChange={(e) => update("party_member_code", e.target.value)} required /></div>
        <div><Label>ថ្ងៃចូលបក្ស</Label><Input type="date" value={form.party_join_date ?? ""} onChange={(e) => update("party_join_date", e.target.value || null)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>តួនាទីក្នុងបក្ស</Label><Input value={form.party_position ?? ""} onChange={(e) => update("party_position", e.target.value)} /></div>
        <div><Label>សាខាបក្ស</Label><Input value={form.party_branch ?? ""} onChange={(e) => update("party_branch", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>កម្រិតអង្គភាព</Label>
          <Select value={form.party_level ?? ""} onChange={(e) => update("party_level", e.target.value)}>
            <option value="">—</option>
            {PARTY_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </Select>
        </div>
        <div><Label>ស្ថានភាពសមាជិក</Label>
          <Select value={form.membership_status} onChange={(e) => update("membership_status", e.target.value)}>
            {MEMBERSHIP_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>លេខប័ណ្ណសមាជិក</Label><Input value={form.membership_card_number ?? ""} onChange={(e) => update("membership_card_number", e.target.value)} /></div>
        <div><Label>ប្រភេទសមាជិក</Label><Input value={form.membership_type ?? ""} onChange={(e) => update("membership_type", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>ថ្ងៃចេញប័ណ្ណ</Label><Input type="date" value={form.membership_issue_date ?? ""} onChange={(e) => update("membership_issue_date", e.target.value || null)} /></div>
        <div><Label>ថ្ងៃផុតកំណត់</Label><Input type="date" value={form.membership_expire_date ?? ""} onChange={(e) => update("membership_expire_date", e.target.value || null)} /></div>
      </div>
    </div>
  );
}

function WorkForm({ form, update }: {
  form: ReturnType<typeof defaultUserProfile>;
  update: <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => void;
}) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>មុខរបរ</Label><Input value={form.occupation ?? ""} onChange={(e) => update("occupation", e.target.value)} /></div>
        <div><Label>ស្ថាប័ន</Label><Input value={form.organization ?? ""} onChange={(e) => update("organization", e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>តួនាទីការងារ</Label><Input value={form.position ?? ""} onChange={(e) => update("position", e.target.value)} /></div>
        <div><Label>កម្រិតអប់រំ</Label>
          <Select value={form.education_level ?? ""} onChange={(e) => update("education_level", e.target.value)}>
            <option value="">—</option>
            <option value="primary">បឋមសិក្សា</option>
            <option value="secondary">អនុវិទ្យាល័យ</option>
            <option value="high_school">វិទ្យាល័យ</option>
            <option value="associate">សញ្ញាបត្ររង</option>
            <option value="bachelor">បរិញ្ញាប័ត្រ</option>
            <option value="master">អនុបណ្ឌិត</option>
            <option value="phd">បណ្ឌិត</option>
          </Select>
        </div>
      </div>
    </div>
  );
}

function EmergencyForm({ form, update }: {
  form: ReturnType<typeof defaultUserProfile>;
  update: <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => void;
}) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-sm text-amber-700">
        ព័ត៌មានទំនាក់ទំនងបន្ទាន់
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>ឈ្មោះ</Label><Input value={form.emergency_name ?? ""} onChange={(e) => update("emergency_name", e.target.value)} /></div>
        <div><Label>ទូរស័ព្ទ</Label><Input value={form.emergency_phone ?? ""} onChange={(e) => update("emergency_phone", e.target.value)} /></div>
        <div><Label>ទំនាក់ទំនង</Label><Input value={form.emergency_relationship ?? ""} onChange={(e) => update("emergency_relationship", e.target.value)} /></div>
      </div>
      <div><Label>កំណត់សម្គាល់</Label>
        <textarea
          value={form.remark ?? ""}
          onChange={(e) => update("remark", e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none resize-none min-h-[100px] transition-all"
          placeholder="ព័ត៌មានបន្ថែម..."
        />
      </div>
    </div>
  );
}

type ProfileForm = ReturnType<typeof defaultUserProfile>;
const STEP_FORMS: Record<StepKey, React.FC<{ form: ProfileForm; update: (key: keyof ProfileForm, value: ProfileForm[keyof ProfileForm]) => void; users: UserListItem[]; onUserCreated?: (userId: string) => void; onNewUser?: (user: UserListItem) => void }>> = {
  personal: PersonalForm,
  party: PartyForm,
  work: WorkForm,
  emergency: EmergencyForm,
};

export default function ProfilesPage() {
  const [items, setItems] = useState<UserProfile[]>([]);
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultUserProfile());
  const [step, setStep] = useState<StepKey>("personal");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      listUserProfiles().then(setItems),
      fetch("/api/users").then((r) => r.json()).then(setUsers),
    ]).finally(() => setLoading(false));
  }, []);

  const refresh = () => listUserProfiles().then(setItems);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setForm(defaultUserProfile());
    setStep("personal");
    setMode(null);
    setEditId(null);
  };

  const onAdd = () => {
    reset();
    setMode("add");
  };

  const onEdit = (p: UserProfile) => {
    setForm({ ...defaultUserProfile(), ...p });
    setEditId(p.id);
    setMode("edit");
    setStep("personal");
  };

  const saveDraft = async () => {
    if (saving) return;
    setSaving(true);
    const data = { ...form, user_id: form.user_id || null };
    try {
      if (mode === "edit" && editId) {
        await updateUserProfile(editId, data);
      } else {
        const created = await createUserProfile(data);
        if (created && mode === "add") setEditId(created.id);
      }
    } finally {
      setSaving(false);
    }
  };

  const goNext = async () => {
    await saveDraft();
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
  };

  const goPrev = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) setStep(STEPS[idx - 1].key);
  };

  const finish = async () => {
    await saveDraft();
    reset();
    refresh();
  };

  const onDelete = async (id: string) => {
    if (confirm("លុបសមាជិកនេះ?")) {
      await deleteUserProfile(id);
      refresh();
    }
  };

  const stepIdx = STEPS.findIndex((s) => s.key === step);
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === STEPS.length - 1;
  const CurrentForm = STEP_FORMS[step];
  const showForm = mode !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">បញ្ជីសមាជិក</h1>
          <p className="text-sm text-slate-500">គ្រប់គ្រងព័ត៌មានសមាជិកគណបក្ស</p>
        </div>
        <Button onClick={onAdd}><Plus size={16} /> បន្ថែមសមាជិក</Button>
      </div>

      {/* Member list */}
      <Card>
        <CardHeader>
          <CardTitle>បញ្ជីសមាជិក</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-slate-500 py-8">កំពុងផ្ទុក...</div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <User size={40} className="mb-3 text-slate-300" />
              <p>មិនទាន់មានសមាជិក</p>
              <Button variant="outline" className="mt-3" onClick={onAdd}>បន្ថែមសមាជិកដំបូង</Button>
            </div>
          ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="pb-3 font-medium">ឈ្មោះ</th>
                      <th className="pb-3 font-medium">លេខសមាជិក</th>
                      <th className="pb-3 font-medium">ទូរស័ព្ទ</th>
                      <th className="pb-3 font-medium">តួនាទី</th>
                      <th className="pb-3 font-medium">ស្ថានភាព</th>
                      <th className="pb-3 font-medium">គណនី</th>
                      <th className="pb-3 font-medium w-20"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => {
                      const linkedUser = users.find((u) => u.id === p.user_id);
                      return (
                        <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                {p.first_name_kh.charAt(0)}{p.last_name_kh.charAt(0)}
                              </div>
                              <span className="font-medium text-slate-900">{p.first_name_kh} {p.last_name_kh}</span>
                            </div>
                          </td>
                          <td className="py-3 text-slate-600">{p.party_member_code || "—"}</td>
                          <td className="py-3 text-slate-600">{p.phone || "—"}</td>
                          <td className="py-3 text-slate-600">{p.party_position || p.position || "—"}</td>
                          <td className="py-3">
                            <Badge variant={p.membership_status === "active" ? "success" : p.membership_status === "pending" ? "warning" : "default"} className="text-xs">
                              {MEMBERSHIP_STATUSES.find((s) => s.value === p.membership_status)?.label ?? p.membership_status}
                            </Badge>
                          </td>
                          <td className="py-3 text-xs text-blue-600 truncate max-w-[150px]">{linkedUser?.email || "—"}</td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => onEdit(p)}><Pencil size={14} /></Button>
                              <Button size="sm" variant="ghost" onClick={() => onDelete(p.id)}><Trash2 size={14} className="text-red-500" /></Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
          )}
        </CardContent>
      </Card>

      {/* Multi-step form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] pb-8 px-4" onClick={(e) => {
          if (e.target === e.currentTarget) reset();
        }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <button type="button" onClick={reset} className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition">
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {mode === "edit" ? "កែសម្រួលសមាជិក" : "បន្ថែមសមាជិកថ្មី"}
                  </h2>
                  <p className="text-xs text-slate-400">ជំហានទី {stepIdx + 1} នៃ {STEPS.length} — {STEPS[stepIdx].label}</p>
                </div>
              </div>
            </div>

            {/* Step indicator */}
            <div className="px-6 py-4 bg-slate-50/50">
              <StepIndicator current={step} onNavigate={(key) => setStep(key)} />
            </div>

            {/* Form body */}
            <div className="px-6 py-5 max-h-[55vh] overflow-y-auto">
              <CurrentForm form={form} update={update} users={users} onNewUser={(u) => setUsers((prev) => [u, ...prev])} onUserCreated={() => { fetch("/api/users").then((r) => r.json()).then(setUsers); }} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <div>
                {!isFirst && (
                  <Button type="button" variant="outline" onClick={goPrev} className="gap-1">
                    <ChevronLeft size={14} /> ថយក្រោយ
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => { saveDraft(); reset(); refresh(); }} disabled={saving} className="gap-1">
                  <Save size={14} /> {saving ? "កំពុងរក្សា..." : "រក្សាព្រាង"}
                </Button>
                {isLast ? (
                  <Button type="button" onClick={finish} disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700 gap-1">
                    <Check size={14} /> {mode === "edit" ? "រក្សាទុក" : "បង្កើត"}
                  </Button>
                ) : (
                  <Button type="button" onClick={goNext} disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700 gap-1">
                    {saving ? "កំពុងរក្សា..." : "រក្សា និងបន្ត"} <ChevronRight size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

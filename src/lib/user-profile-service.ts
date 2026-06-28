import { createClient } from "@/utils/supabase/client";

export interface UserProfile {
  id: string;
  user_id: string | null;

  // Personal
  first_name_kh: string;
  last_name_kh: string;
  first_name_en: string | null;
  last_name_en: string | null;
  gender: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  national_id: string | null;
  photo: string | null;
  phone: string | null;
  email: string | null;

  // Address
  address: string | null;
  province_id: string | null;
  district_id: string | null;
  commune_id: string | null;
  village_id: string | null;

  // Party
  party_member_code: string;
  party_join_date: string | null;
  party_position: string | null;
  party_branch: string | null;
  party_level: string | null;

  // Membership
  membership_status: string;
  membership_type: string | null;
  membership_card_number: string | null;
  membership_issue_date: string | null;
  membership_expire_date: string | null;

  // Work
  occupation: string | null;
  organization: string | null;
  position: string | null;
  education_level: string | null;

  // Emergency
  emergency_name: string | null;
  emergency_phone: string | null;
  emergency_relationship: string | null;

  // Other
  remark: string | null;

  created_at: string;
  updated_at: string;
}

export function defaultUserProfile(): Omit<UserProfile, "id" | "created_at" | "updated_at"> {
  return {
    user_id: null,
    first_name_kh: "",
    last_name_kh: "",
    first_name_en: "",
    last_name_en: "",
    gender: "",
    date_of_birth: null,
    nationality: "ខ្មែរ",
    national_id: "",
    photo: "",
    phone: "",
    email: "",
    address: "",
    province_id: "",
    district_id: "",
    commune_id: "",
    village_id: "",
    party_member_code: "",
    party_join_date: null,
    party_position: "",
    party_branch: "",
    party_level: "",
    membership_status: "active",
    membership_type: "",
    membership_card_number: "",
    membership_issue_date: null,
    membership_expire_date: null,
    occupation: "",
    organization: "",
    position: "",
    education_level: "",
    emergency_name: "",
    emergency_phone: "",
    emergency_relationship: "",
    remark: "",
  };
}

export async function listUserProfiles(): Promise<UserProfile[]> {
  const supabase = createClient();
  const { data } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getUserProfile(id: string): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data } = await supabase.from("user_profiles").select("*").eq("id", id).single();
  return data;
}

export async function createUserProfile(input: Omit<UserProfile, "id" | "created_at" | "updated_at">): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data } = await supabase.from("user_profiles").insert(input).select().single();
  return data;
}

export async function updateUserProfile(id: string, patch: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data } = await supabase.from("user_profiles").update(patch).eq("id", id).select().single();
  return data;
}

export async function deleteUserProfile(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from("user_profiles").delete().eq("id", id);
  return !error;
}

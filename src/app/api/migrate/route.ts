import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const sql = `
create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  first_name_kh text not null default '',
  last_name_kh text not null default '',
  first_name_en text default '',
  last_name_en text default '',
  gender text default '',
  date_of_birth date default null,
  nationality text default '',
  national_id text default '',
  photo text default '',
  phone text default '',
  email text default '',
  address text default '',
  province_id text default '',
  district_id text default '',
  commune_id text default '',
  village_id text default '',
  party_member_code text unique default '',
  party_join_date date default null,
  party_position text default '',
  party_branch text default '',
  party_level text default '',
  membership_status text default 'active',
  membership_type text default '',
  membership_card_number text default '',
  membership_issue_date date default null,
  membership_expire_date date default null,
  occupation text default '',
  organization text default '',
  position text default '',
  education_level text default '',
  emergency_name text default '',
  emergency_phone text default '',
  emergency_relationship text default '',
  remark text default '',
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

do $$ begin
  create policy "Allow all" on public.user_profiles
    for all to authenticated, anon using (true) with check (true);
exception when duplicate_object then null;
end $$;

drop trigger if exists user_profiles_updated_at on public.user_profiles;
create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();
`;

  const { error } = await supabase.rpc("exec_sql", { query: sql });

  if (error) {
    return Response.json({ ok: false, error });
  }

  return Response.json({ ok: true });
}

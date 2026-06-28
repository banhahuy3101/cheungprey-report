create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,

  -- Personal Information
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

  -- Address
  address text default '',
  province_id text default '',
  district_id text default '',
  commune_id text default '',
  village_id text default '',

  -- Party Information
  party_member_code text unique default '',
  party_join_date date default null,
  party_position text default '',
  party_branch text default '',
  party_level text default '',

  -- Membership
  membership_status text default 'active',
  membership_type text default '',
  membership_card_number text default '',
  membership_issue_date date default null,
  membership_expire_date date default null,

  -- Work Information
  occupation text default '',
  organization text default '',
  position text default '',
  education_level text default '',

  -- Emergency Contact
  emergency_name text default '',
  emergency_phone text default '',
  emergency_relationship text default '',

  -- Other
  remark text default '',
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

create policy "Allow all" on public.user_profiles
  for all
  to authenticated, anon
  using (true)
  with check (true);

drop trigger if exists user_profiles_updated_at on public.user_profiles;
create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

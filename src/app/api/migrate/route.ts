import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const sql = `
-- Create exec_sql function if not exists
create or replace function public.exec_sql(query text)
returns void
language plpgsql
security definer
as $$
begin
  execute query;
end;
$$;

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

create table if not exists public.role_permissions (
  role text primary key,
  permissions jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.role_permissions enable row level security;

do $$ begin
  create policy "Allow all" on public.role_permissions
    for all to authenticated, anon using (true) with check (true);
exception when duplicate_object then null;
end $$;

drop trigger if exists role_permissions_updated_at on public.role_permissions;
create trigger role_permissions_updated_at
  before update on public.role_permissions
  for each row execute function public.set_updated_at();

create table if not exists public.roles (
  key text primary key,
  label_kh text not null default '',
  label_en text not null default '',
  level integer not null default 0,
  description text not null default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.roles enable row level security;

do $$ begin
  create policy "Allow all" on public.roles
    for all to authenticated, anon using (true) with check (true);
exception when duplicate_object then null;
end $$;

drop trigger if exists roles_updated_at on public.roles;
create trigger roles_updated_at
  before update on public.roles
  for each row execute function public.set_updated_at();

insert into public.roles (key, label_kh, label_en, level, description)
values
  ('super_admin', 'Super Admin', 'Super Admin', 100, 'សិទ្ធិពេញលេញ គ្រប់គ្រងប្រព័ន្ធទាំងមូល'),
  ('district_chief', 'ប្រធានបក្សស្រុក', 'District Chief', 80, 'ប្រធានបក្សស្រុក អនុម័តប្រតិបត្តិការ និងគ្រប់គ្រងឃុំ'),
  ('district_admin', 'មន្ត្រីរដ្ឋបាលស្រុក', 'District Admin', 60, 'មន្ត្រីរដ្ឋបាលស្រុក គ្រប់គ្រងប្រតិបត្តិការប្រចាំថ្ងៃ'),
  ('commune_chief', 'ប្រធានបក្សឃុំ', 'Commune Chief', 40, 'ប្រធានបក្សឃុំ គ្រប់គ្រងប្រតិបត្តិការឃុំ'),
  ('commune_staff', 'សមាជិកបក្សឃុំ', 'Commune Staff', 20, 'សមាជិកបក្សឃុំ ធ្វើប្រតិបត្តិការឃុំ'),
  ('finance_viewer', 'Finance Viewer', 'Finance Viewer', 10, 'មើលទិន្នន័យហិរញ្ញវត្ថុបានតែអាន')
on conflict (key) do nothing;

-- UDF: check_permission
create or replace function public.check_permission(role text, permission text)
returns boolean
language sql
stable
as $$
  select coalesce(
    (select (rp.permissions ->> permission)::boolean
     from public.role_permissions rp
     where rp.role = check_permission.role),
    false
  );
$$;

-- UDF: user_has_permission
create or replace function public.user_has_permission(user_id uuid, permission text)
returns boolean
language sql
stable
as $$
  select coalesce(
    (select (rp.permissions ->> permission)::boolean
     from public.role_permissions rp
     join public.profiles p on p.role = rp.role
     where p.id = user_id),
    false
  );
$$;

-- UDF: get_user_permissions
create or replace function public.get_user_permissions(user_id uuid)
returns jsonb
language sql
stable
as $$
  select coalesce(
    (select rp.permissions
     from public.role_permissions rp
     join public.profiles p on p.role = rp.role
     where p.id = user_id),
    '{}'::jsonb
  );
$$;
`;

  const { error } = await supabase.rpc("exec_sql", { query: sql });

  if (error) {
    return Response.json({ ok: false, error });
  }

  return Response.json({ ok: true });
}

-- Create roles table
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

-- Trigger for updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists roles_updated_at on public.roles;
create trigger roles_updated_at
  before update on public.roles
  for each row execute function public.set_updated_at();

-- Seed roles
insert into public.roles (key, label_kh, label_en, level, description) values
  ('super_admin', 'Super Admin', 'Super Admin', 100, 'សិទ្ធិពេញលេញ គ្រប់គ្រងប្រព័ន្ធទាំងមូល'),
  ('district_chief', 'ប្រធានបក្សស្រុក', 'District Chief', 80, 'ប្រធានបក្សស្រុក អនុម័តប្រតិបត្តិការ និងគ្រប់គ្រងឃុំ'),
  ('district_admin', 'មន្ត្រីរដ្ឋបាលស្រុក', 'District Admin', 60, 'មន្ត្រីរដ្ឋបាលស្រុក គ្រប់គ្រងប្រតិបត្តិការប្រចាំថ្ងៃ'),
  ('commune_chief', 'ប្រធានបក្សឃុំ', 'Commune Chief', 40, 'ប្រធានបក្សឃុំ គ្រប់គ្រងប្រតិបត្តិការឃុំ'),
  ('commune_staff', 'សមាជិកបក្សឃុំ', 'Commune Staff', 20, 'សមាជិកបក្សឃុំ ធ្វើប្រតិបត្តិការឃុំ'),
  ('finance_viewer', 'Finance Viewer', 'Finance Viewer', 10, 'មើលទិន្នន័យហិរញ្ញវត្ថុបានតែអាន')
on conflict (key) do nothing;

-- Create role_permissions table if not exists
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

-- Seed default permissions
insert into public.role_permissions (role, permissions) values
  ('super_admin', '{"canWriteTransaction":true,"canReadTransactions":true,"canWriteBudget":true,"canExportPdf":true,"canManageUsers":true,"canDownloadReceipt":true,"canApproveTransaction":true,"canSendToProvince":true,"canManageSystem":true}'),
  ('district_chief', '{"canWriteTransaction":true,"canReadTransactions":true,"canWriteBudget":true,"canExportPdf":true,"canManageUsers":true,"canDownloadReceipt":true,"canApproveTransaction":true,"canSendToProvince":true,"canManageSystem":false}'),
  ('district_admin', '{"canWriteTransaction":true,"canReadTransactions":true,"canWriteBudget":true,"canExportPdf":true,"canManageUsers":true,"canDownloadReceipt":true,"canApproveTransaction":true,"canSendToProvince":false,"canManageSystem":false}'),
  ('commune_chief', '{"canWriteTransaction":true,"canReadTransactions":true,"canWriteBudget":true,"canExportPdf":true,"canManageUsers":false,"canDownloadReceipt":true,"canApproveTransaction":true,"canSendToProvince":false,"canManageSystem":false}'),
  ('commune_staff', '{"canWriteTransaction":true,"canReadTransactions":true,"canWriteBudget":false,"canExportPdf":false,"canManageUsers":false,"canDownloadReceipt":true,"canApproveTransaction":false,"canSendToProvince":false,"canManageSystem":false}'),
  ('finance_viewer', '{"canWriteTransaction":false,"canReadTransactions":true,"canWriteBudget":false,"canExportPdf":true,"canManageUsers":false,"canDownloadReceipt":false,"canApproveTransaction":false,"canSendToProvince":false,"canManageSystem":false}')
on conflict (role) do nothing;

-- ============================================================
-- UDFs: Permission check functions for feature-level access control
-- ============================================================

-- Check if a role has a specific permission
-- Usage: select check_permission('district_chief', 'canManageSystem');
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

-- Check if a user (by profile id) has a specific permission
-- Usage: select user_has_permission('some-uuid', 'canManageUsers');
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

-- Get all permissions for a user as a JSON object
-- Usage: select get_user_permissions('some-uuid');
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

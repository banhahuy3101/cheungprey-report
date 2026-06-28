-- Features table for feature-level management
create table if not exists public.features (
  key text primary key,
  label_kh text not null default '',
  label_en text not null default '',
  description text not null default '',
  icon text not null default 'FileText',
  route text not null default '',
  permission_key text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.features enable row level security;

do $$ begin
  create policy "Allow all" on public.features
    for all to authenticated, anon using (true) with check (true);
exception when duplicate_object then null;
end $$;

drop trigger if exists features_updated_at on public.features;
create trigger features_updated_at
  before update on public.features
  for each row execute function public.set_updated_at();

-- Seed features
insert into public.features (key, label_kh, label_en, description, icon, route, permission_key, sort_order) values
  ('dashboard', 'ផ្ទាំងគ្រប់គ្រង', 'Dashboard', 'ទិន្នន័យសង្ខេប និងស្ថិតិ', 'LayoutDashboard', '/dashboard', '', 1),
  ('transactions', 'ប្រតិបត្តិការ', 'Transactions', 'គ្រប់គ្រងចំណូល-ចំណាយ', 'Receipt', '/dashboard/transactions', 'canReadTransactions', 2),
  ('budgets', 'ថវិកា', 'Budgets', 'គ្រប់គ្រងថវិកាប្រចាំឆ្នាំ', 'Wallet', '/dashboard/budgets', 'canWriteBudget', 3),
  ('reports', 'របាយការណ៍', 'Reports', 'បង្កើត និងនាំចេញរបាយការណ៍', 'FileText', '/dashboard/reports', 'canExportPdf', 4),
  ('commune-evaluation', 'វាយតម្លៃឃុំ/សង្កាត់', 'Commune Evaluation', 'វាយតម្លៃប្រចាំខែ', 'ClipboardCheck', '/dashboard/commune-evaluation', '', 5),
  ('users', 'អ្នកប្រើប្រាស់', 'Users', 'គ្រប់គ្រងអ្នកប្រើប្រាស់', 'Users', '/dashboard/users', 'canManageUsers', 6),
  ('profiles', 'បញ្ជីសមាជិក', 'Profiles', 'គ្រប់គ្រងទិន្នន័យសមាជិក', 'UserCheck', '/dashboard/profiles', '', 7),
  ('audit', 'កំណត់ត្រាសកម្មភាព', 'Audit', 'មើលប្រវត្តិសកម្មភាព', 'History', '/dashboard/audit', '', 8),
  ('permissions', 'សិទ្ធិអំណាច', 'Permissions', 'កំណត់សិទ្ធិតាមតួនាទី', 'Shield', '/dashboard/settings/permissions', 'canManageSystem', 9),
  ('settings', 'ការកំណត់', 'Settings', 'ការកំណត់ប្រព័ន្ធ', 'Settings', '/dashboard/settings', 'canManageSystem', 10)
on conflict (key) do nothing;

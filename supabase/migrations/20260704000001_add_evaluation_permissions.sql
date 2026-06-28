-- Add mandate metadata columns to commune_evaluations
alter table public.commune_evaluations
  add column if not exists mandate_number text default '5',
  add column if not exists mandate_year_start text default '2022',
  add column if not exists mandate_year_end text default '2027';

-- Add commune evaluation permission flags to role_permissions
update public.role_permissions
set permissions = permissions::jsonb || '{"canViewEvaluation":true,"canCreateEvaluation":true,"canEditEvaluation":true,"canDeleteEvaluation":true}'::jsonb
where role in ('super_admin', 'district_chief', 'district_admin');

update public.role_permissions
set permissions = permissions::jsonb || '{"canViewEvaluation":true,"canCreateEvaluation":true,"canEditEvaluation":true,"canDeleteEvaluation":false}'::jsonb
where role = 'commune_chief';

update public.role_permissions
set permissions = permissions::jsonb || '{"canViewEvaluation":true,"canCreateEvaluation":true,"canEditEvaluation":false,"canDeleteEvaluation":false}'::jsonb
where role = 'commune_staff';

update public.role_permissions
set permissions = permissions::jsonb || '{"canViewEvaluation":true,"canCreateEvaluation":false,"canEditEvaluation":false,"canDeleteEvaluation":false}'::jsonb
where role = 'finance_viewer';

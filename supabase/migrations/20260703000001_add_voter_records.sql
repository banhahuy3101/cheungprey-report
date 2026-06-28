alter table public.commune_evaluations
  add column if not exists voter_records jsonb default '[]'::jsonb;

-- Junction table: many-to-many between profiles and roles
create table if not exists public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null references public.roles(key) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, role)
);

alter table public.user_roles enable row level security;

do $$ begin
  create policy "Allow all" on public.user_roles
    for all to authenticated, anon using (true) with check (true);
exception when duplicate_object then null;
end $$;

-- Migrate existing single-role assignments from profiles.role
insert into public.user_roles (user_id, role)
  select id, role from public.profiles
  where role is not null and role != ''
on conflict do nothing;

-- ============================================================
-- Updated UDFs: now aggregate permissions across ALL user roles
-- ============================================================

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

create or replace function public.user_has_permission(user_id uuid, permission text)
returns boolean
language sql
stable
as $$
  select coalesce(
    bool_or((rp.permissions ->> permission)::boolean),
    false
  )
  from public.role_permissions rp
  join public.user_roles ur on ur.role = rp.role
  where ur.user_id = user_id;
$$;

create or replace function public.get_user_permissions(user_id uuid)
returns jsonb
language sql
stable
as $$
  select coalesce(
    (
      select jsonb_object_agg(key, val)
      from (
        select e.key, bool_or((e.value)::boolean) as val
        from public.role_permissions rp
        join public.user_roles ur on ur.role = rp.role
        cross join lateral jsonb_each(rp.permissions) as e(key, value)
        where ur.user_id = user_id
        group by e.key
      ) t
    ),
    '{}'::jsonb
  );
$$;

-- UDFs for permission-based feature control

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

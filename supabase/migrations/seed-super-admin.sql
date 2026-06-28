CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'commune_staff',
  district_id text NOT NULL DEFAULT '',
  commune_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.create_admin_user(admin_email text, admin_password text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
    RETURN;
  END IF;
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, confirmation_sent_at, raw_app_meta_data, created_at, updated_at)
  VALUES (gen_random_uuid(), admin_email, crypt(admin_password::text, gen_salt('bf'::text)), now(), now(), '{"provider":"email","providers":["email"]}', now(), now());
  INSERT INTO public.profiles (id, email, name, role, district_id)
  SELECT id, admin_email, split_part(admin_email, '@', 1), 'super_admin', ''
  FROM auth.users WHERE email = admin_email;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_admin_user TO anon;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Seed initial users so login works without signup.
-- Default password for all seeded users: skitm@123

create extension if not exists pgcrypto;

create or replace function public.seed_auth_user(
  p_email text,
  p_password text,
  p_metadata jsonb
)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid;
  v_user auth.users%rowtype;
  v_role public.app_role;
  v_enrollment text;
begin
  select id into v_user_id
  from auth.users
  where lower(email) = lower(p_email)
  limit 1;

  if v_user_id is null then
    v_user_id := gen_random_uuid();

    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      lower(p_email),
      crypt(p_password, gen_salt('bf')),
      now(),
      now(),
      jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
      p_metadata,
      now(),
      now()
    );

    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    )
    values (
      gen_random_uuid()::text,
      v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', lower(p_email)),
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    )
    on conflict do nothing;
  else
    update auth.users
    set
      encrypted_password = crypt(p_password, gen_salt('bf')),
      email_confirmed_at = coalesce(email_confirmed_at, now()),
      confirmed_at = coalesce(confirmed_at, now()),
      raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || p_metadata,
      updated_at = now()
    where id = v_user_id;
  end if;

  select * into v_user from auth.users where id = v_user_id;
  v_role := coalesce((v_user.raw_user_meta_data ->> 'role')::public.app_role, 'student');
  v_enrollment := nullif(v_user.raw_user_meta_data ->> 'enrollment_number', '');

  insert into public.profiles (
    id,
    full_name,
    email,
    enrollment_number,
    faculty_id,
    branch_code,
    department,
    admission_year
  )
  values (
    v_user.id,
    coalesce(nullif(v_user.raw_user_meta_data ->> 'full_name', ''), split_part(v_user.email, '@', 1)),
    v_user.email,
    v_enrollment,
    nullif(v_user.raw_user_meta_data ->> 'faculty_id', ''),
    nullif(v_user.raw_user_meta_data ->> 'branch_code', ''),
    nullif(v_user.raw_user_meta_data ->> 'department', ''),
    nullif(v_user.raw_user_meta_data ->> 'admission_year', '')::smallint
  )
  on conflict (id) do update
  set
    full_name = excluded.full_name,
    email = excluded.email,
    enrollment_number = excluded.enrollment_number,
    faculty_id = excluded.faculty_id,
    branch_code = excluded.branch_code,
    department = excluded.department,
    admission_year = excluded.admission_year,
    updated_at = now();

  insert into public.user_roles (user_id, role, department)
  values (
    v_user.id,
    v_role,
    nullif(v_user.raw_user_meta_data ->> 'department', '')
  )
  on conflict (user_id) do update
  set
    role = excluded.role,
    department = excluded.department,
    updated_at = now();

  if v_role = 'student' and v_enrollment is not null then
    insert into public.class_students (
      enrollment_number,
      student_id,
      student_name,
      department
    )
    values (
      v_enrollment,
      v_user.id,
      coalesce(nullif(v_user.raw_user_meta_data ->> 'full_name', ''), split_part(v_user.email, '@', 1)),
      nullif(v_user.raw_user_meta_data ->> 'department', '')
    )
    on conflict (enrollment_number) do update
    set
      student_id = excluded.student_id,
      student_name = excluded.student_name,
      department = excluded.department,
      updated_at = now();
  end if;
end;
$$;

select public.seed_auth_user(
  'superadmin@skitm.in',
  'skitm@123',
  jsonb_build_object(
    'full_name', 'Super Admin',
    'role', 'super_admin',
    'department', 'ADMIN'
  )
);

select public.seed_auth_user(
  'hod.cs@skitm.in',
  'skitm@123',
  jsonb_build_object(
    'full_name', 'CS HOD',
    'role', 'hod',
    'department', 'CS',
    'faculty_id', 'HODCS01'
  )
);

select public.seed_auth_user(
  'faculty.cs@skitm.in',
  'skitm@123',
  jsonb_build_object(
    'full_name', 'CS Faculty',
    'role', 'teacher',
    'department', 'CS',
    'faculty_id', 'FCS1001'
  )
);

select public.seed_auth_user(
  '0875CS241001@student.skitm.in',
  'skitm@123',
  jsonb_build_object(
    'full_name', 'Student CS 1001',
    'role', 'student',
    'department', 'CS',
    'enrollment_number', '0875CS241001',
    'branch_code', 'CS',
    'admission_year', 24
  )
);

select public.seed_auth_user(
  '0875CS241002@student.skitm.in',
  'skitm@123',
  jsonb_build_object(
    'full_name', 'Student CS 1002',
    'role', 'student',
    'department', 'CS',
    'enrollment_number', '0875CS241002',
    'branch_code', 'CS',
    'admission_year', 24
  )
);

select public.seed_auth_user(
  '0875CS241003@student.skitm.in',
  'skitm@123',
  jsonb_build_object(
    'full_name', 'Student CS 1003',
    'role', 'student',
    'department', 'CS',
    'enrollment_number', '0875CS241003',
    'branch_code', 'CS',
    'admission_year', 24
  )
);

drop function if exists public.seed_auth_user(text, text, jsonb);

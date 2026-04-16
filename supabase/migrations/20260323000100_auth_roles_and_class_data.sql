-- Core auth + role model for College Compass
-- No public signup: users are created by super admin/admin through edge function.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('super_admin', 'hod', 'teacher', 'student');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  enrollment_number text unique,
  faculty_id text unique,
  branch_code text,
  department text,
  admission_year smallint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enrollment_format_chk check (
    enrollment_number is null
    or enrollment_number ~ '^0875[A-Z]{2}[0-9]{2}[0-9]{4}$'
  ),
  constraint staff_email_domain_chk check (
    email is null
    or email ~* '^[A-Z0-9._%+-]+@(skitm\.in|student\.skitm\.in)$'
  )
);

create table if not exists public.user_roles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role public.app_role not null,
  department text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Per-student core class representation requested by product owner.
create table if not exists public.class_students (
  enrollment_number text primary key,
  student_id uuid unique references public.profiles(id) on delete cascade,
  student_name text not null,
  department text,
  attendance_percent numeric(5,2) not null default 0,
  marks_percent numeric(5,2) not null default 0,
  fees_status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint class_students_enrollment_chk check (
    enrollment_number ~ '^0875[A-Z]{2}[0-9]{2}[0-9]{4}$'
  ),
  constraint class_students_attendance_chk check (
    attendance_percent >= 0 and attendance_percent <= 100
  ),
  constraint class_students_marks_chk check (
    marks_percent >= 0 and marks_percent <= 100
  ),
  constraint class_students_fees_status_chk check (
    fees_status in ('pending', 'partial', 'paid')
  )
);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

drop trigger if exists user_roles_updated_at on public.user_roles;
create trigger user_roles_updated_at
before update on public.user_roles
for each row execute function public.handle_updated_at();

drop trigger if exists class_students_updated_at on public.class_students;
create trigger class_students_updated_at
before update on public.class_students
for each row execute function public.handle_updated_at();

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.user_roles where user_id = auth.uid();
$$;

create or replace function public.current_user_department()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select department from public.user_roles where user_id = auth.uid();
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_role public.app_role;
  enrollment text;
begin
  new_role := coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'student');
  enrollment := nullif(new.raw_user_meta_data ->> 'enrollment_number', '');

  insert into public.profiles (
    id,
    full_name,
    email,
    enrollment_number,
    faculty_id,
    branch_code,
    department,
    admission_year
  ) values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
    new.email,
    enrollment,
    nullif(new.raw_user_meta_data ->> 'faculty_id', ''),
    nullif(new.raw_user_meta_data ->> 'branch_code', ''),
    nullif(new.raw_user_meta_data ->> 'department', ''),
    nullif(new.raw_user_meta_data ->> 'admission_year', '')::smallint
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role, department)
  values (new.id, new_role, nullif(new.raw_user_meta_data ->> 'department', ''))
  on conflict (user_id) do nothing;

  if new_role = 'student' and enrollment is not null then
    insert into public.class_students (enrollment_number, student_id, student_name, department)
    values (
      enrollment,
      new.id,
      coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
      nullif(new.raw_user_meta_data ->> 'department', '')
    )
    on conflict (enrollment_number) do update set
      student_id = excluded.student_id,
      student_name = excluded.student_name,
      department = excluded.department;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.class_students enable row level security;

drop policy if exists profiles_select_policy on public.profiles;
create policy profiles_select_policy
on public.profiles
for select
using (
  auth.uid() = id
  or public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() in ('hod', 'teacher')
    and department is not null
    and department = public.current_user_department()
  )
);

drop policy if exists profiles_update_policy on public.profiles;
create policy profiles_update_policy
on public.profiles
for update
using (
  auth.uid() = id
  or public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() = 'hod'
    and department is not null
    and department = public.current_user_department()
  )
)
with check (
  auth.uid() = id
  or public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() = 'hod'
    and department is not null
    and department = public.current_user_department()
  )
);

drop policy if exists roles_select_policy on public.user_roles;
create policy roles_select_policy
on public.user_roles
for select
using (
  auth.uid() = user_id
  or public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() = 'hod'
    and department is not null
    and department = public.current_user_department()
  )
);

drop policy if exists class_students_select_policy on public.class_students;
create policy class_students_select_policy
on public.class_students
for select
using (
  public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() in ('hod', 'teacher')
    and department is not null
    and department = public.current_user_department()
  )
  or (
    public.current_user_role() = 'student'
    and student_id = auth.uid()
  )
);

drop policy if exists class_students_update_policy on public.class_students;
create policy class_students_update_policy
on public.class_students
for update
using (
  public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() in ('hod', 'teacher')
    and department is not null
    and department = public.current_user_department()
  )
)
with check (
  public.current_user_role() = 'super_admin'
  or (
    public.current_user_role() in ('hod', 'teacher')
    and department is not null
    and department = public.current_user_department()
  )
);

-- Inserts/deletes are reserved for service role / edge functions.
grant usage on schema public to authenticated;
grant select on public.profiles, public.user_roles, public.class_students to authenticated;
grant update on public.profiles, public.class_students to authenticated;

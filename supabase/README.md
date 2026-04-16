# Supabase Backend Setup

This project uses no public signup. New accounts are created by `super_admin` or `hod` using the `manage-user` edge function.

## 1) Link project

```bash
npm run supabase -- login
npm run supabase -- link --project-ref qtwakmfaxwpwjafodtip
```

## 2) Run migrations

```bash
npm run supabase -- db push
```

## 3) Set function secrets

```bash
npm run supabase -- secrets set SUPABASE_URL=https://qtwakmfaxwpwjafodtip.supabase.co
npm run supabase -- secrets set SUPABASE_ANON_KEY=<your-anon-key>
npm run supabase -- secrets set SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## 4) Deploy function

```bash
npm run supabase -- functions deploy manage-user
```

## 5) Seed initial users

The migration `20260416000100_seed_initial_users.sql` creates starter accounts.

Default password for all: `skitm@123`

- Super Admin: `superadmin@skitm.in`
- HOD (CS): `hod.cs@skitm.in`
- Faculty (CS): `faculty.cs@skitm.in`
- Student: enrollment `0875CS241001`
- Student: enrollment `0875CS241002`
- Student: enrollment `0875CS241003`

## Login Rules

- Student login identifier: enrollment number (`0875CS241000` format)
- Student auth email is internally generated as `<enrollment>@student.skitm.in`
- Faculty/HOD/Super Admin login identifier: `@skitm.in` email
- Default password for newly created users: `skitm@123`
- Users can change password in Settings.

-- App role enum
do $$ begin
  create type public.app_role as enum ('admin', 'moderator', 'user');
exception when duplicate_object then null; end $$;

-- user_roles table
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer role checker (avoids recursive RLS)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Policies for user_roles: only admins can manage
drop policy if exists "Admins manage roles" on public.user_roles;
create policy "Admins manage roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Users can read own roles" on public.user_roles;
create policy "Users can read own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

-- Reusable updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Class enrollments
create table if not exists public.class_enrollments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  course text not null,
  experience_level text not null,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint full_name_len check (char_length(full_name) between 1 and 120),
  constraint email_len check (char_length(email) between 3 and 255),
  constraint course_len check (char_length(course) between 1 and 120),
  constraint level_len check (char_length(experience_level) between 1 and 40),
  constraint message_len check (message is null or char_length(message) <= 2000)
);

alter table public.class_enrollments enable row level security;

-- Anyone can submit an enrollment (public sign-up form)
drop policy if exists "Anyone can enroll" on public.class_enrollments;
create policy "Anyone can enroll"
on public.class_enrollments
for insert
to anon, authenticated
with check (true);

-- Only admins can read/update/delete enrollments
drop policy if exists "Admins read enrollments" on public.class_enrollments;
create policy "Admins read enrollments"
on public.class_enrollments
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins update enrollments" on public.class_enrollments;
create policy "Admins update enrollments"
on public.class_enrollments
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins delete enrollments" on public.class_enrollments;
create policy "Admins delete enrollments"
on public.class_enrollments
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
drop trigger if exists set_class_enrollments_updated_at on public.class_enrollments;
create trigger set_class_enrollments_updated_at
before update on public.class_enrollments
for each row execute function public.update_updated_at_column();

create index if not exists idx_class_enrollments_created_at on public.class_enrollments (created_at desc);
create index if not exists idx_class_enrollments_course on public.class_enrollments (course);
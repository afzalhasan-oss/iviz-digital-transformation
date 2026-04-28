-- Tighten public insert policy on class_enrollments
drop policy if exists "Anyone can enroll" on public.class_enrollments;
create policy "Anyone can enroll"
on public.class_enrollments
for insert
to anon, authenticated
with check (
  char_length(trim(full_name)) between 1 and 120
  and char_length(trim(course)) between 1 and 120
  and char_length(trim(experience_level)) between 1 and 40
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and char_length(email) <= 255
  and (message is null or char_length(message) <= 2000)
);

-- Lock down the role-check helper: only used internally by RLS (which runs as definer)
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
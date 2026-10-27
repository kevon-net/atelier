-- supabase/migrations/20261025111350_create_profile_trigger.sql

create or replace function savour.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into savour.profiles (
    id,
    email,
    name,
    avatar,
    created_at,
    updated_at
  )
  values (
    new.id,
    new.email,
    -- Fallback order: 'name' then 'full_name' from metadata
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name'),
    -- Fallback order: 'avatar_url' then 'picture' from metadata
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture'),
    now(),
    now()
  );
  return new;
end;
$$;

-- Drop and recreate the trigger to ensure it uses the latest function definition
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure savour.handle_new_user();

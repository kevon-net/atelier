create or replace function savour.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into savour.profiles (id, email, created_at, updated_at)
  values (new.id, new.email, now(), now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure savour.handle_new_user();

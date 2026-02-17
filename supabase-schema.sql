-- ─────────────────────────────────────────────────────────────
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────

-- GUESTBOOK TABLE (main feature — used by all 4 CRUD endpoints)
create table if not exists guestbook (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  message     text not null,
  emoji       text default '👋',
  created_at  timestamptz default now(),
  updated_at  timestamptz
);

-- Allow public read access (so the frontend can fetch entries)
alter table guestbook enable row level security;

create policy "Public read" on guestbook
  for select using (true);

create policy "Public insert" on guestbook
  for insert with check (true);

create policy "Public update" on guestbook
  for update using (true);

create policy "Public delete" on guestbook
  for delete using (true);

-- CONTACTS TABLE (optional — stores contact form submissions)
create table if not exists contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz default now()
);

alter table contacts enable row level security;

create policy "Public insert contacts" on contacts
  for insert with check (true);

-- Seed a welcome entry so the guestbook isn't empty on first load
insert into guestbook (name, message, emoji) values
  ('Breneth', 'Welcome to my guestbook! Leave a message. 🐱', '🐱');

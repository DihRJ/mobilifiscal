-- 1) SHIFTS (turnos)
create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references users(id),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  lat_start double precision,
  lon_start double precision,
  lat_end double precision,
  lon_end double precision,
  device_battery integer,
  created_at timestamptz default now()
);
create index if not exists idx_shifts_org_time on shifts(organization_id, started_at desc);

-- 2) INCIDENTS (ocorrências)
create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  type text not null,
  description text,
  lat double precision,
  lon double precision,
  created_at timestamptz default now(),
  created_by uuid not null references users(id)
);
create index if not exists idx_incidents_org_time on incidents(organization_id, created_at desc);

-- 3) CHECKLISTS (catálogo) - items JSON parametrizável
create table if not exists checklists (
  id serial primary key,
  organization_id uuid references organizations(id) on delete cascade,
  name text not null,
  items jsonb not null
);

-- 4) ACTIONS (ações corretivas ligadas ao auto)
create table if not exists actions (
  id uuid primary key default gen_random_uuid(),
  infraction_id uuid references infractions(id) on delete cascade,
  description text,
  due_date date,
  status text default 'pendente',
  created_at timestamptz default now(),
  created_by uuid not null references users(id)
);
create index if not exists idx_actions_infraction on actions(infraction_id);

-- 5) RLS (segue padrão org_id + vínculo). Ajuste conforme suas funções de sessão.
alter table shifts enable row level security;
alter table incidents enable row level security;
alter table checklists enable row level security;
alter table actions enable row level security;

drop policy if exists shifts_rls on shifts;
create policy shifts_rls on shifts
  using (
    organization_id::text = current_setting('app.current_org_id', true)
    and app_can_access_org(organization_id, app_current_user_id())
  )
  with check (
    organization_id::text = current_setting('app.current_org_id', true)
    and app_can_access_org(organization_id, app_current_user_id())
  );

drop policy if exists incidents_rls on incidents;
create policy incidents_rls on incidents
  using (
    organization_id::text = current_setting('app.current_org_id', true)
    and app_can_access_org(organization_id, app_current_user_id())
  )
  with check (
    organization_id::text = current_setting('app.current_org_id', true)
    and app_can_access_org(organization_id, app_current_user_id())
  );

drop policy if exists checklists_rls on checklists;
create policy checklists_rls on checklists
  using (
    (organization_id is null or organization_id::text = current_setting('app.current_org_id', true))
    and (organization_id is null or app_can_access_org(organization_id, app_current_user_id()))
  )
  with check (
    (organization_id is null or organization_id::text = current_setting('app.current_org_id', true))
    and (organization_id is null or app_can_access_org(organization_id, app_current_user_id()))
  );

drop policy if exists actions_rls on actions;
create policy actions_rls on actions
  using (
    exists (select 1 from infractions i
            where i.id = actions.infraction_id
            and i.organization_id::text = current_setting('app.current_org_id', true)
            and app_can_access_org(i.organization_id, app_current_user_id()))
  )
  with check (
    exists (select 1 from infractions i
            where i.id = actions.infraction_id
            and i.organization_id::text = current_setting('app.current_org_id', true)
            and app_can_access_org(i.organization_id, app_current_user_id()))
  );

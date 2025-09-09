# MobiliFiscal — v4 (tudo dos 8 passos)

Inclui:
- Tabelas para **turnos (shifts)**, **ocorrências (incidents)**, **checklists**, **ações corretivas** com RLS.
- APIs: `/api/shifts`, `/api/incidents`, `/api/checklists`, `/api/actions` (além de inspections/infractions já existentes).
- Páginas: `/shifts`, `/incidents`, `/reports/otd` e navegação na home.
- **OTD** simples via view `v_infractions_daily` e endpoint `/api/reports/otd`.
- **Offline** básico: `public/sw.js` + fila de sincronização `lib/queue.ts`.
- SQL de upgrade em `packages/db/sql/003_full_features.sql`.

## Como aplicar
1. Aplique as migrações na ordem: `001_init.sql` → `002_upgrade_v3.sql` → `003_full_features.sql`.
2. Faça commit/push no seu repositório Render.
3. Redeploy do serviço web (e worker, se necessário).
4. Teste: `/shifts`, `/incidents`, `/reports/otd`, `/mapa`.

> Ajuste o RLS conforme a autenticação que você adotar (NextAuth etc.).

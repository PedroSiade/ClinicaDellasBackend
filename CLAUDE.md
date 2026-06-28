# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

REST API for Clínica Dellas, a medical clinic management system. Express + TypeScript + Prisma (PostgreSQL). Manages professionals/staff, services, blog posts, banners, and JWT-based auth. Images are stored in Supabase Storage.

## Commands

```bash
# Development
npm run dev                # ts-node-dev with hot reload, entry: src/index.ts (port 4000)
npm run build               # tsc -> dist/
npm start                   # run compiled dist/index.js

# Prisma
npm run prisma:generate     # regenerate Prisma client (run after editing schema.prisma)
npm run prisma:migrate      # prisma migrate dev --name update_schema (creates + applies a migration)
npm run prisma:deploy       # prisma migrate deploy (applies pending migrations, no prompts)
npm run prisma:studio       # Prisma Studio GUI
npm run prisma:reset        # prisma migrate reset --force (drops and recreates the db)
npm run seed                 # ts-node prisma/seed/workers.ts (seeds professionals only — see note below)

# Docker
docker compose up --build   # starts postgres + api; api container runs `prisma migrate deploy` then `npm run seed` then starts the server
```

There is no configured lint or test command/framework in this repo.

### Seed scripts caveat

`prisma/seed/` has four independent seed scripts (`workers.ts`, `posts.ts`, `service.ts`, `userAuth.ts`) but `prisma/seed/index.ts` is empty and the `seed` npm script only runs `workers.ts`. If you need to seed posts, services, or the auth user, run the relevant file directly with `ts-node prisma/seed/<file>.ts` rather than assuming `npm run seed` covers it.

## Architecture

Layered/clean-architecture style, with dependencies flowing inward (`routes` → `controller` → `useCases` → `prisma`/`services`). Cursor rules in `.cursor/rules/generalrule.mdc` describe the intended shape; the actual layout differs slightly (see below) — follow what's on disk, not the idealized doc.

- **`src/index.ts`** — app bootstrap. Exports the shared `prisma` client singleton (`PrismaClient`) used everywhere via `import { prisma } from "../../index"`. CORS is locked to `http://localhost:3000`. Port is hardcoded to `4000` (not read from `PORT` env despite `.env.example` defining it).
- **`src/routes/index.ts`** — single `createMainRouter()` wires every endpoint. Public routes (GET) vs protected routes (POST/PUT/DELETE behind `authenticateToken`) are interleaved per resource — check this file to see the full route table rather than guessing from controller names.
- **`src/controller/<resource>/index.ts`** — HTTP layer only. Parses/validates `req.body` with a Zod schema from `src/schemas/<resource>/`, delegates to a `useCase`, and maps results/errors to a consistent JSON shape: `{ data, hasError: false }` on success, `{ hasError: true, message }` (plus `issues` for `ZodError`) on failure.
- **`src/useCases/<resource>/<action>.ts`** — one file per action (`create`, `update`, `delete`, `getOne`, `getMany`, sometimes `getManyPage` for pagination). Pure business logic; talks directly to `prisma` and to the storage service. No Express types here.
- **`src/middleware/auth.ts`** — `authenticateToken` (hard-fails 401/403) and `optionalAuth`. JWT verify/sign helpers live in `src/config/auth.ts` (`jwtUtils`, `passwordUtils`), with a default `JWT_SECRET` fallback for local dev.
- **`src/middleware/upload.ts`** — Multer configured with memory storage; `uploadPhoto` (single field `photo`) and `uploadServiceImages` (fields `icon` + `image`) for service create/update.
- **File storage abstraction** (`src/services/storage/`): `FileUploadService` is composed from a `StorageProvider` (currently `SupabaseStorageProvider` in `src/services/providers/`), a `FileProcessor`, a `FileNameGenerator`, and a `FileValidator` (composite of size + extension validators in `src/services/validators/`). `FileUploadServiceFactory.createDefault()`/`createCustom()` assemble these; useCases call the convenience functions exported from `src/services/storage/index.ts` (`uploadFile`, `getPublicUrl`, ...) rather than constructing the service themselves. Supabase client (`src/lib/supabase.ts`) is `null` when `SUPABASE_URL`/`SUPABASE_ANON_KEY` are unset, and upload calls fail gracefully with an explicit error instead of throwing.
- **Prisma schema** (`prisma/schema.prisma`): models `UserAuth`, `Professional` (has many `Post`), `Banner`, `Service`, `Post` (belongs to `Professional`, cascade delete). All tables use explicit `@@map` snake_case names. `Role` enum (`DOCTOR`, `NUTRITIONIST`, `PSYCHOLOGIST`, `PHYSIOTHERAPIST`, `THERAPY_TECHNICIAN`, `OWNER`) drives professional types.

## Conventions (from `.cursor/rules/generalrule.mdc`)

- File names: `camelCase`. Types/Classes/Interfaces: `PascalCase`. Env vars/constants: `UPPER_SNAKE_CASE`.
- Prefer arrow functions, `async/await` everywhere, object destructuring for params.
- Avoid `any`; for new validated input types prefer a Zod schema and `z.infer<typeof schema>` over a hand-written interface.
- No comments unless explaining genuinely non-obvious logic.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, etc.), imperative short title.
- `useCases` must stay framework-free — no `req`/`res`, no Express types.

## Environment

Required: `DATABASE_URL`. Optional with safe fallbacks: `JWT_SECRET` (defaults to an insecure dev value — set it explicitly outside local dev), `SUPABASE_URL`/`SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_KEY` (uploads fail gracefully if unset), `PORT`, `NODE_ENV`. See `.env.example`.

When running via `docker compose`, the `api` service's `DATABASE_URL` is built automatically from `POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_DB` against the `db` service — don't hand-edit it in `docker-compose.yml`; override the `POSTGRES_*` vars in a root `.env` instead.

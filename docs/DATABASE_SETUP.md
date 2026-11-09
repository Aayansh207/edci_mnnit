# PostgreSQL + Docker + Prisma 7 Backend Foundation Guide

This document is the definitive operational and architectural reference for the database and backend foundation in this project.

---

## 1. Architecture Overview

### Current Development Architecture (Local-First Hybrid)

During development, the Next.js application runs natively on macOS to maximize hot-reload speed and debugger support, while PostgreSQL runs inside an isolated Docker container with persistent storage:

```text
================================ macOS HOST (Your MacBook) ================================
|                                                                                         |
|   Next.js Application (Port 3000)                                                       |
|   ├── App Router (`src/app/`)                                                           |
|   ├── Route Handlers (`src/app/api/.../route.js`)                                       |
|   ├── Prisma Client Singleton (`src/lib/prisma.js` via `server-only`)                   |
|   ├── pg Connection Pool (`node-postgres`)                                              |
|   └── Prisma 7 Driver Adapter (`@prisma/adapter-pg`)                                    |
|              |                                                                          |
|              | Connects via TCP to `localhost:5432`                                     |
|              v                                                                          |
|   Host Port Forwarding (macOS -> Docker Engine Proxy)                                   |
|              |                                                                          |
======================================== DOCKER VM =======================================
|              v                                                                          |
|   Docker Bridge Network (`edci_mnnit_default`)                                          |
|              v                                                                          |
|   Container: `edci-postgres` (Port 5432 inside container)                               |
|   └── PostgreSQL Daemon (Alpine Linux, user: `edci_user`, db: `edci_mnnit`)            |
|              |                                                                          |
|              v Writes data to disk                                                      |
|   Named Docker Volume: `edci_postgres_data`                                             |
|   (Persists across container stops, restarts, and recreations)                          |
===========================================================================================
```

### Future Production / Containerized Architecture

When the entire application is containerized, both Next.js and PostgreSQL will live on the same internal Docker network:

```text
Browser (HTTP: 3000)
    |
    v
Next.js Container (`web`)
    |
    v (Internal Docker DNS Network: `db:5432`)
PostgreSQL Container (`db`)
    |
    v
Named Docker Volume (`edci_postgres_data`)
```

> **Crucial Network Distinction**:
> - When running Next.js on macOS: Connect via `localhost:5432`.
> - When running Next.js inside Docker: Connect via `db:5432` (Docker internal service name).

---

## 2. Prerequisites

- **Node.js**: `v20.0.0` or later (tested on Node `v24.x`)
- **npm**: `v10.0.0` or later (tested on npm `v11.x`)
- **Docker & Docker Compose**: Docker Desktop or Docker Engine with Compose V2+ installed and running.

---

## 3. Environment Configuration

### Files
- `.env`: Real credentials for your local machine (strictly ignored by Git).
- `.env.example`: Committed template with placeholder credentials.

### Environment Variables Reference

| Variable | Purpose | Example Value |
| :--- | :--- | :--- |
| `POSTGRES_USER` | Superuser username for PostgreSQL in Docker | `edci_user` |
| `POSTGRES_PASSWORD` | Password for PostgreSQL user in Docker | `development_password` |
| `POSTGRES_DB` | Default database catalog name in Docker | `edci_mnnit` |
| `POSTGRES_PORT` | Host port exposed on your MacBook | `5432` |
| `DATABASE_URL` | RFC 3986 connection string used by Prisma & pg | `postgresql://edci_user:development_password@localhost:5432/edci_mnnit?schema=public` |

---

## 4. Docker Compose Operations

The complete stack (Next.js App Router + PostgreSQL Database) is orchestrated via `compose.yaml`.

### Start the Complete Application (Next.js + PostgreSQL)
Runs both the database and the web application containers in the background:
```bash
npm run docker:up
# Or directly:
docker compose up -d --build
```
This automatically:
1. Builds the production standalone Next.js image (`edci-web`).
2. Starts the PostgreSQL container (`edci-postgres`).
3. Waits for PostgreSQL's health check (`pg_isready`) to pass.
4. Starts the Next.js container connected directly to `db:5432`.
5. Exposes the app at `http://localhost:3000` and database at `localhost:5432`.

### Stop the Entire Stack
Stops all application containers while preserving database volume data:
```bash
npm run docker:down
# Or:
docker compose down
```

### View Live Logs Across All Services
Follows live logs from both the Next.js app and PostgreSQL:
```bash
npm run docker:logs
# Or:
docker compose logs -f
```

### Start Only the Database (for Local Development: `npm run dev`)
If you want to run Next.js directly on your MacBook using `npm run dev`, start only the database:
```bash
docker compose up -d db
```

### Stop the Database
Stops the container without removing its state:
```bash
docker compose stop db
```

### Restart a Stopped Container
Re-starts an existing stopped container:
```bash
docker compose start db
```

### Check Container Status & Health
Inspects the container lifecycle status and Docker health check:
```bash
docker compose ps
```

### View Live Database Logs
Follows PostgreSQL server output and initialization logs:
```bash
docker compose logs -f db
```

### Verify PostgreSQL Readiness from CLI
Executes the native `pg_isready` binary directly inside the container:
```bash
docker exec edci-postgres pg_isready -U edci_user -d edci_mnnit
```

### Access PostgreSQL Interactive Shell (`psql`)
Opens an interactive SQL terminal inside the running container:
```bash
docker exec -it edci-postgres psql -U edci_user -d edci_mnnit
```

> [!CAUTION]
> **Data Loss Warning: `docker compose down -v`**
> - `docker compose down` safely stops and removes containers and internal networks while **preserving** database data in the named volume.
> - `docker compose down -v` (or `--volumes`) will **permanently delete the named volume and all database records**. Never run `docker compose down -v` unless you intentionally want to delete all stored data.

---

## 5. Prisma 7 Workflow & Commands

Prisma 7 uses a modern architecture:
- Schema configuration is located in `prisma/schema.prisma`.
- CLI database connection is configured in `prisma7.config.ts`.
- Client artifacts are generated into `src/generated/prisma`.

### Validate the Schema
Validates the syntax and structure of `prisma/schema.prisma`:
```bash
npx prisma validate
```

### Create and Apply a Migration (Development)
Compares `schema.prisma` against PostgreSQL, creates a versioned SQL file in `prisma/migrations/`, executes it, and regenerates Prisma Client:
```bash
npx prisma migrate dev --name <migration_name>
```

### Apply Pending Migrations (Production / CI-CD)
Applies pending migrations without generating new ones or prompting interactively:
```bash
npx prisma migrate deploy
```

### Generate Prisma Client
Generates the type-safe client files into `src/generated/prisma`:
```bash
npx prisma generate
```

> [!WARNING]
> Do not use `npx prisma db push` in place of migrations during development. `db push` does not generate version-controlled SQL files and can cause schema drift across team members.

---

## 6. Application Integration & Backend Conventions

### 6.1 Prisma Client Singleton (`src/lib/prisma.js`)
All database access must import the shared singleton:
```javascript
import { prisma } from '@/lib/prisma';
```

**Key Implementation Features**:
- **`server-only` Guard**: Halts build if accidentally imported in Client Components.
- **Connection Pool**: Uses `node-postgres` (`pg.Pool`) capped at 10 clients with connection timeouts.
- **Driver Adapter**: Connects Prisma 7 to `pg` via `@prisma/adapter-pg`.
- **Global Caching**: Caches the instance on `globalThis` in development to prevent connection pool exhaustion during Next.js hot module reloads.

### 6.2 Health Check Endpoint (`GET /api/health`)
A dedicated health check endpoint verifies application runtime and active database connectivity:
```bash
curl -i http://localhost:3000/api/health
```

**Success Response (HTTP 200)**:
```json
{
  "status": "healthy",
  "timestamp": "2026-11-09T13:07:20.601Z",
  "services": {
    "application": "up",
    "database": "connected"
  },
  "latency": {
    "databaseMs": 15
  }
}
```

**Failure Response (HTTP 503)**:
```json
{
  "status": "unhealthy",
  "timestamp": "2026-11-09T13:07:11.379Z",
  "services": {
    "application": "up",
    "database": "disconnected"
  },
  "error": "Database service is currently unreachable"
}
```

### 6.3 Backend Coding Guidelines
1. **JavaScript Only**: All application logic, API route handlers, and utilities must be written in `.js`. Do not convert application code to TypeScript.
2. **App Router Structure**: API endpoints reside in `src/app/api/<endpoint>/route.js`.
3. **Database Access Encapsulation**: Keep queries organized in `src/lib/` or service modules; never write inline queries inside React frontend components.
4. **Input Validation**: Use Zod for validating request bodies, query params, and environment variables.
5. **Safe Error Handling**: Never expose raw database exceptions or stack traces to clients. Return standardized JSON payloads with accurate HTTP status codes.

---

## 7. Troubleshooting Common Errors

### Error: `bind: address already in use` on Port 5432
- **Cause**: Another service on macOS (such as Homebrew PostgreSQL or Postgres.app) is occupying port 5432.
- **Diagnosis**: Run `lsof -i :5432` to find the process ID.
- **Solution**: Stop the competing service:
  ```bash
  brew services stop postgresql@15
  # Or kill the specific PID
  kill -9 <PID>
  ```

### Error: `Connection refused` connecting to PostgreSQL
- **Cause**: The Docker container is stopped or still initializing.
- **Solution**:
  ```bash
  docker compose ps
  docker compose logs db
  ```
  Ensure status displays `Up ... (healthy)`.

### Error: `This module cannot be imported from a Client Component module`
- **Cause**: A file marked with `'use client'` imported `@/lib/prisma`.
- **Solution**: Database access must occur in Server Components or API route handlers. Remove the import from the Client Component and fetch data via API or pass data down as serializable props from a Server Component.

---

## 8. Security Best Practices

1. **Never commit `.env`**: `.gitignore` is configured with `.env*` and `!.env.example`.
2. **Never expose secrets with `NEXT_PUBLIC_`**: Database credentials must remain private server environment variables.
3. **Least Privilege Principle**: In production, do not use the superuser account for application queries. Create a dedicated application user with restricted DDL permissions.
4. **Connection Pool Limits**: Always set `max` connections in `pg.Pool` to prevent accidental database denial of service.


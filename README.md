# Grocery Order System

Startup-grade grocery commerce platform built in implementation phases.

## Phase 1 Scope

- Customer website in Next.js 15
- Admin dashboard in Next.js 15
- NestJS modular monolith backend
- PostgreSQL schema and seed data
- Redis-backed auth/session/cart foundation
- Razorpay-ready checkout flow
- Email and SMS notification surfaces

## Repository Layout

- `apps/customer-web`
- `apps/admin-dashboard`
- `backend`
- `shared`
- `database`
- `infrastructure`
- `docs`

## Run Locally

1. Copy `.env.example` to `.env` and fill in secrets.
2. Install dependencies with `pnpm install`.
3. Start individual packages with `pnpm dev:customer`, `pnpm dev:admin`, and `pnpm dev:backend`.
4. Or run all package dev scripts together with `pnpm dev`.

## Implementation Roadmap

See [docs/PRD/roadmap.md](docs/PRD/roadmap.md) and [docs/Architecture/software-architecture-document.md](docs/Architecture/software-architecture-document.md).

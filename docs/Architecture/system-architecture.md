# System Architecture

## Platform Overview

The platform is a phased, startup-grade grocery commerce system built to remain deployable after every phase.

## Primary Stack

- Frontend: Next.js for `customer-web` and `admin-dashboard`
- Backend: NestJS modular services
- Database: PostgreSQL
- Cache: Redis
- Infra: Docker, NGINX, GitHub Actions

## High-Level Domain Boundaries

- Identity and access: authentication, users, roles, permissions, sessions, OTP
- Commerce catalog: categories, products, brands, inventory, images, search
- Shopping: cart, wishlist, saved-for-later states
- Orders and payment: checkout, coupons, payments, invoices, order lifecycle
- Operations: admin dashboard, audit logs, reports, support actions
- Growth: newsletter, referral, SEO, campaign surfaces
- Observability: analytics, metrics, logging, alerting

## Frontend Structure

- `apps/customer-web`: public store, account pages, checkout, commerce flows
- `apps/admin-dashboard`: admin authentication, management, reporting, moderation
- `shared/ui`: reusable design system primitives
- `shared/types`: cross-app contracts and DTO types
- `shared/utils`: shared helpers and formatting utilities

## Backend Structure

- `backend/auth`: JWT, refresh tokens, OTP, login, reset password
- `backend/users`: profiles, roles, permissions, sessions
- `backend/products`: product catalog and details
- `backend/categories`: category navigation and taxonomy
- `backend/inventory`: stock state and availability
- `backend/cart`: cart and wishlist state
- `backend/orders`: checkout, order lifecycle, invoices
- `backend/payments`: payment orchestration and provider callbacks
- `backend/coupons`: discounts and promotion rules
- `backend/notifications`: email and transactional notifications

## Data Flow

1. Customer browser renders Next.js page.
2. Frontend calls backend API through typed service clients.
3. Backend validates input, applies business rules, and persists to PostgreSQL.
4. Redis is used for short-lived state such as sessions and rate-limited workflows.
5. Notifications, jobs, and payment callbacks update eventual state.

## Deployment Shape

- Next.js apps run behind NGINX or platform routing.
- NestJS services expose versioned HTTP APIs.
- PostgreSQL stores durable commerce data.
- Redis stores low-latency ephemeral data.
- GitHub Actions builds, tests, and deploys the system.

## SAD Coverage

The full software architecture document lives in [software-architecture-document.md](software-architecture-document.md) and expands this blueprint into frontend, backend, database, security, DevOps, and scaling detail.

# Software Architecture Document (SAD)

## 1. Purpose

This document defines the architecture blueprint for the Grocery Order System. It is intended to keep the platform intentionally phased, always deployable, and safe to evolve from MVP to enterprise scale.

## 2. Product Vision

The platform is a grocery commerce system that starts with a narrow, reliable MVP and grows through controlled implementation phases.

Principles:
- Every phase must be independently deployable.
- Core commerce flows must stay usable even if optional features are incomplete.
- Business rules belong in the backend, not in the UI.
- Shared contracts should be typed and versioned.
- Observability and security are baseline requirements, not phase-9 extras.

## 3. Scope

In scope:
- Customer shopping experience
- Authentication and account management
- Product catalog and inventory visibility
- Cart, wishlist, checkout, payments, and orders
- Admin operations and reporting
- Marketing, analytics, and production hardening
- Future AI-assisted commerce features

Out of scope for MVP:
- Marketplace multi-vendor support
- Complex subscription billing
- Full OMS/WMS integrations
- Internationalized tax engines unless required later

## 4. Implementation Phases

See [roadmap.md](../PRD/roadmap.md) for the phase schedule. The architecture is designed to allow each phase to ship a complete product slice.

## 5. System Context

### External actors
- Customer
- Admin
- Support operator
- Payment provider
- Email provider
- Analytics provider

### Core services
- Customer web app
- Admin dashboard
- API backend
- PostgreSQL database
- Redis cache
- Background jobs and notifications

## 6. Frontend Architecture

### Applications
- `apps/customer-web`
- `apps/admin-dashboard`

### Routing model
- Public routes for browsing and conversion
- Authenticated customer routes for account and checkout
- Admin-only routes for operations

### UI architecture
- Shared component primitives in `shared/ui`
- Shared domain types in `shared/types`
- Shared utilities in `shared/utils`
- Server components where beneficial, client components only when state or browser APIs require them

### Frontend principles
- Keep commerce flows fast and low-friction
- Keep layouts stable and mobile-first
- Make critical states explicit: loading, empty, error, out-of-stock, payment pending
- Avoid duplicating business logic in multiple apps

## 7. Backend Architecture

### Module strategy
The backend is organized around bounded contexts:
- auth
- users
- categories
- products
- inventory
- cart
- orders
- payments
- coupons
- notifications

### Layering
- Controller layer: HTTP routing and request validation
- Service layer: business rules and orchestration
- Repository/data-access layer: persistence and query logic
- Integration layer: external APIs, payment callbacks, email delivery

### Backend principles
- Keep domain rules deterministic and testable
- Validate every input at the boundary
- Emit events for state transitions that matter to other modules
- Prefer explicit state machines for order and payment lifecycle

## 8. Database Architecture

### Primary datastore
- PostgreSQL for transactional commerce data

### Supporting store
- Redis for sessions, OTP, caching, and transient workflow state

### Data design principles
- One source of truth per domain entity
- Soft delete only where operationally required
- Audit-sensitive actions should be traceable
- Write operations should be idempotent where possible

### Key entity groups
- Identity: User, Role, Permission, OTP, Session
- Catalog: Category, Product, Brand, Inventory, ProductImage
- Shopping: Cart, CartItem, Wishlist
- Commerce: Order, OrderItem, Payment, Coupon
- Account: Address, Review
- Marketing: Newsletter, Referral, Campaign
- Operations: AuditLog, AdminActivity

## 9. API Architecture

### API style
- RESTful JSON endpoints with versioning
- Swagger/OpenAPI documentation from the first module
- Shared DTOs between frontend and backend where practical

### API design rules
- Resource-oriented names
- Stable response shapes
- Clear error codes
- Pagination for collection endpoints
- Authentication required only where needed

### Cross-cutting concerns
- Authentication
- Authorization
- Input validation
- Rate limiting
- Logging
- Metrics

## 10. Authentication and Authorization

### Authentication methods
- Email/password login
- OTP verification
- JWT access tokens
- Refresh tokens
- Session persistence

### Authorization model
- Roles determine coarse access
- Permissions gate sensitive actions
- Customer and admin access are separated

### Security expectations
- Password hashing with a modern adaptive algorithm
- Token rotation where needed
- Protected routes on both client and server
- Verification before account activation

## 11. Checkout and Order Lifecycle

### Order states
- Draft
- Pending payment
- Confirmed
- Packed
- Shipped
- Delivered
- Cancelled
- Refunded

### Payment states
- Initiated
- Pending
- Succeeded
- Failed
- Refunded

### Rules
- Orders must be created from a validated cart snapshot
- Payment confirmation must reconcile with order state
- Inventory should be reserved or revalidated during checkout

## 12. Infrastructure and Deployment

### Runtime topology
- Next.js frontend apps
- NestJS API services
- PostgreSQL database
- Redis cache
- NGINX reverse proxy
- Dockerized builds
- GitHub Actions CI/CD

### Environments
- Local development
- Preview/staging
- Production

### Delivery goals
- Repeatable builds
- Environment-specific configuration
- Safe migrations
- Easy rollback path

## 13. Security Architecture

### Baseline controls
- HTTPS everywhere
- Helmet
- CORS policy
- Rate limiting
- Input validation
- Safe secrets handling
- Audit logging
- Backups

### Operational controls
- Least-privilege access
- Separate admin and customer surfaces
- Logged sensitive actions
- Production secrets outside source control

## 14. Observability

### Signals
- Application logs
- Error tracking
- Request latency
- Business metrics
- Payment and order state transitions

### Tools
- Analytics: PostHog
- Monitoring: Grafana-compatible stack
- Alerts: provider-specific or platform-native alerting

## 15. Testing Strategy

### Test layers
- Unit tests for business rules
- Integration tests for backend boundaries
- End-to-end tests for user journeys

### Critical flows to test
- Register and verify OTP
- Login and refresh session
- Browse catalog and search
- Add to cart and update quantity
- Checkout and payment confirmation
- Admin product and order management

## 16. UI/UX Design System

### Design goals
- Clear hierarchy
- Fast scanning
- Strong state visibility
- Accessible color contrast
- Mobile-first behavior

### Shared UI categories
- Navigation
- Forms
- Buttons
- Cards
- Tables
- Status indicators
- Empty states
- Error states
- Skeletons

## 17. Coding Standards

- Prefer feature modules aligned to domains
- Keep functions small and deterministic
- Avoid duplicated validation logic
- Use typed interfaces for shared contracts
- Favor explicit names over clever abstractions
- Document non-obvious domain rules in code or docs

## 18. Git Strategy

### Branching
- `main` for production-ready code
- short-lived feature branches for implementation work
- pull requests for review and CI validation

### Commit discipline
- Small, reviewable commits
- One logical change per commit where practical

## 19. CI/CD Pipeline

### Pipeline stages
- Install dependencies
- Lint and typecheck
- Run tests
- Build apps
- Publish artifacts
- Deploy to target environment

### Safety checks
- Block merges on failed tests
- Run migrations explicitly
- Separate preview from production deployment

## 20. Scaling Roadmap

### MVP scale
- Single-region deployment
- Monolith-first backend modules
- Shared PostgreSQL and Redis

### Growth scale
- Split read-heavy endpoints
- Add background workers for notifications and reporting
- Improve caching and search indexing

### Enterprise scale
- Service extraction where justified
- Event-driven workflows for high-volume domains
- More advanced observability and resilience controls

## 21. Documentation Index

- [roadmap.md](../PRD/roadmap.md)
- [system-architecture.md](system-architecture.md)
- [openapi-plan.md](../API/openapi-plan.md)
- [schema-overview.md](../Database/schema-overview.md)

## 22. Next Step

After this document, the next practical artifact is a full module-by-module API contract and a page-by-page wireframe inventory for Phase 1 and Phase 2.

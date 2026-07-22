# API Documentation Plan

Swagger/OpenAPI documentation will be generated for every backend module and kept in sync with implementation.

## API Standards

- REST JSON over HTTPS
- Versioned routes such as `/api/v1/...`
- Consistent success and error envelopes
- Pagination for list endpoints
- Validation at the API boundary
- Authentication via bearer JWT where required

## Module Coverage

- auth
- users
- products
- categories
- inventory
- cart
- orders
- payments
- coupons
- notifications

## Planned Endpoint Groups

### Auth
- register
- login
- verify OTP
- resend OTP
- forgot password
- reset password
- refresh token
- logout

### Users
- get profile
- update profile
- manage roles
- manage permissions
- list sessions

### Products and Categories
- list products
- get product detail
- list categories
- filter by category
- search products

### Inventory
- check stock
- reserve stock
- release stock
- reconcile inventory

### Cart and Wishlist
- add item
- update item quantity
- remove item
- save for later
- get current cart

### Orders and Payments
- create order
- get order detail
- list customer orders
- initiate payment
- confirm payment
- handle provider callbacks

### Coupons and Notifications
- validate coupon
- apply coupon
- remove coupon
- send transactional email
- send OTP email

## OpenAPI Outputs

- Swagger UI for developers
- JSON schema output for automated tooling
- Example requests and responses for critical flows

## Documentation Priority

1. Phase 1 auth endpoints
2. Phase 2 catalog endpoints
3. Phase 3 cart endpoints
4. Phase 4 checkout and payment endpoints
5. Admin and account endpoints after core commerce flows are stable

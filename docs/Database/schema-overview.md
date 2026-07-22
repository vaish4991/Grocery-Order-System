# Database Schema Overview

This document is a planning-level map of the database. Detailed migrations and constraints should be added with each implementation phase.

## Phase 1 - Identity

- User
- Role
- Permission
- OTP
- Session

## Phase 2 - Catalog

- Category
- Product
- Brand
- Inventory
- ProductImage

## Phase 3 - Shopping

- Cart
- CartItem
- Wishlist

## Phase 4 - Commerce

- Order
- OrderItem
- Payment
- Coupon

## Phase 5 - Admin Operations

- AuditLog
- AdminActivity

## Phase 6 - Customer Account

- Address
- Review

## Phase 7 - Marketing

- Newsletter
- Referral
- Campaign

## Design Notes

- Use foreign keys for all core relationships.
- Index lookups used by search, checkout, and order history.
- Keep immutable history for completed orders and payments.
- Store timestamps and status transitions for auditability.
- Avoid stuffing unrelated business concepts into generic JSON blobs unless there is a clear operational reason.

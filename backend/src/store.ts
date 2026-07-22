import { categories, products } from "@shared/data/catalog";
import type { Address, Cart, CartItem, Coupon, Order, Payment, Product, Review, User } from "@shared/types";

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export const store: {
  users: User[];
  addresses: Address[];
  categories: typeof categories;
  products: Product[];
  carts: Cart[];
  cartItems: CartItem[];
  orders: Order[];
  payments: Payment[];
  reviews: Review[];
  coupons: Coupon[];
} = {
  users: [
    {
      id: "user-admin",
      name: "Admin User",
      email: "admin@grocery.local",
      phone: "9999999999",
      role: "ADMIN",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "user-customer",
      name: "Demo Customer",
      email: "customer@grocery.local",
      phone: "8888888888",
      role: "CUSTOMER",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  addresses: [],
  categories,
  products: [...products],
  carts: [{ id: "cart-demo", userId: "user-customer" }],
  cartItems: [],
  orders: [],
  payments: [],
  reviews: [],
  coupons: [
    {
      id: "coupon-welcome",
      code: "WELCOME10",
      discountType: "percent",
      discountValue: 10,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()
    }
  ]
};

export { id };

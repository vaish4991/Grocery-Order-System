export type RoleName = "CUSTOMER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: RoleName;
  status: "active" | "pending" | "blocked";
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  brand: string;
  status: "draft" | "active" | "archived";
  rating?: number;
  reviewsCount?: number;
  images?: ProductImage[];
}

export interface Cart {
  id: string;
  userId: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: "draft" | "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: string;
  orderId: string;
  transactionId: string;
  amount: number;
  status: "initiated" | "pending" | "succeeded" | "failed" | "refunded";
  method: "razorpay" | "cod";
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percent" | "flat";
  discountValue: number;
  startDate: string;
  endDate: string;
}
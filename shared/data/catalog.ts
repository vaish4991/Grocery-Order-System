import type { Category, Product } from "@shared/types";

export const categories: Category[] = [
  {
    id: "cat-fruits",
    name: "Fruits",
    slug: "fruits",
    description: "Fresh seasonal fruit.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat-vegetables",
    name: "Vegetables",
    slug: "vegetables",
    description: "Farm-fresh vegetables.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cat-dairy",
    name: "Dairy",
    slug: "dairy",
    description: "Milk, yogurt, and cheese.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80"
  }
];

export const products: Product[] = [
  {
    id: "prd-apples",
    categoryId: "cat-fruits",
    name: "Kashmiri Apples",
    slug: "kashmiri-apples",
    description: "Crisp, sweet apples sourced from premium orchards.",
    price: 180,
    discountPrice: 149,
    stock: 120,
    sku: "APL-001",
    brand: "FreshFarm",
    status: "active",
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: "prd-tomato",
    categoryId: "cat-vegetables",
    name: "Organic Tomatoes",
    slug: "organic-tomatoes",
    description: "Juicy tomatoes for everyday cooking.",
    price: 60,
    discountPrice: 49,
    stock: 250,
    sku: "TMT-014",
    brand: "GreenBasket",
    status: "active",
    rating: 4.6,
    reviewsCount: 89
  },
  {
    id: "prd-milk",
    categoryId: "cat-dairy",
    name: "Whole Milk",
    slug: "whole-milk",
    description: "Daily dairy staple in a sealed pack.",
    price: 72,
    discountPrice: 68,
    stock: 80,
    sku: "MLK-008",
    brand: "DairyPure",
    status: "active",
    rating: 4.7,
    reviewsCount: 64
  }
];
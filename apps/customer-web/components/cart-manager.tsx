"use client";

import { useEffect, useState } from "react";
import { products } from "@shared/data/catalog";
import type { CartItem } from "@shared/types";
import { Button, Card, CardBody } from "@shared/ui";

interface CartPayload {
  cart: { id: string; userId: string } | null;
  items: CartItem[];
}

interface CartManagerProps {
  userId: string;
}

export function CartManager({ userId }: CartManagerProps) {
  const [payload, setPayload] = useState<CartPayload>({ cart: null, items: [] });
  const [status, setStatus] = useState<string>("Loading cart...");

  async function loadCart() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/${userId}`);
      const data = (await response.json()) as CartPayload;
      setPayload(data);
      setStatus(data.items.length ? "" : "Your cart is empty.");
    } catch {
      setStatus("Unable to load cart.");
    }
  }

  useEffect(() => {
    void loadCart();
  }, [userId]);

  async function add(productId: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/${userId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    await loadCart();
  }

  async function update(itemId: string, quantity: number) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantity })
    });
    await loadCart();
  }

  async function remove(itemId: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/items/${itemId}`, {
      method: "DELETE"
    });
    await loadCart();
  }

  const itemCards = payload.items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return (
      <Card key={item.id} className="border-slate-200/70">
        <CardBody className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-950">{product?.name ?? item.productId}</h3>
              <p className="text-sm text-slate-500">{product?.brand ?? "Selected product"}</p>
            </div>
            <p className="text-sm font-semibold text-slate-950">Qty {item.quantity}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => update(item.id, item.quantity + 1)}>
              +
            </Button>
            <Button type="button" variant="ghost" onClick={() => update(item.id, Math.max(item.quantity - 1, 1))}>
              -
            </Button>
            <Button type="button" variant="ghost" onClick={() => remove(item.id)}>
              Remove
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  });

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <Card className="border-slate-200/70">
          <CardBody className="space-y-3 p-6">
            <h2 className="text-xl font-semibold text-slate-950">Cart items</h2>
            <p className="text-sm text-slate-600">Current cart is backed by the API and can be updated from this page.</p>
          </CardBody>
        </Card>
        <div className="space-y-4">{itemCards.length ? itemCards : <Card className="border-slate-200/70"><CardBody className="p-6 text-sm text-slate-600">{status}</CardBody></Card>}</div>
      </div>

      <Card className="border-slate-200/70 bg-slate-50">
        <CardBody className="space-y-4 p-6">
          <h2 className="text-xl font-semibold text-slate-950">Quick add</h2>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-950">{product.name}</p>
                  <p className="text-xs text-slate-500">₹{product.discountPrice ?? product.price}</p>
                </div>
                <Button type="button" onClick={() => add(product.id)}>
                  Add
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

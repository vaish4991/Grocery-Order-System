"use client";

import { useState } from "react";
import { Button } from "@shared/ui";

interface AddToCartButtonProps {
  userId: string;
  productId: string;
}

export function AddToCartButton({ userId, productId }: AddToCartButtonProps) {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/${userId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, quantity: 1 })
      });
      if (!response.ok) {
        setStatus("Unable to add item to cart.");
        return;
      }
      setStatus("Added to cart.");
    } catch {
      setStatus("Cart service unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add to cart"}
      </Button>
      {status ? <p className="text-xs text-slate-500">{status}</p> : null}
    </div>
  );
}

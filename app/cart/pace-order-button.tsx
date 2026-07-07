"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlaceOrderButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function placeOrder() {
    setLoading(true);

    const res = await fetch("/api/cart/place-order", {
      method: "POST",
    });

    setLoading(false);

    if (!res.ok) {
      console.error("Failed to place order");
      return;
    }

    router.refresh();
    router.push("/cart/submitted");
  }

  return (
    <button
      onClick={placeOrder}
      disabled={loading}
      className="rounded-md bg-black px-6 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  );
}
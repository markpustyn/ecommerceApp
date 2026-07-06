// app/product/[id]/AddToCartButton.tsx

"use client";

type product = {
  id: string;
  name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export default function AddToCartButton({ product }: { product: product }) {
  async function addToCart() {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  }

  return (
    <button
      onClick={addToCart}
      className="mt-8 rounded-md bg-black px-8 py-3 text-white"
    >
      Add to Cart
    </button>
  );
}
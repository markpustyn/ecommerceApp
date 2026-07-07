"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
  const router = useRouter();
  

  async function createProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")) * 100,
      imageUrl: formData.get("imageUrl"),
    };

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      form.reset();
      router.push("/admin");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Create Product</h1>

      <form
        onSubmit={createProduct}
        className="space-y-6 rounded-lg border p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Nike Hoodie"
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>
          <input
            name="description"
            type="text"
            required
            placeholder="Product description..."
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Price
          </label>
          <input
            name="price"
            type="number"
            required
            placeholder="49.99"
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <input
            name="imageUrl"
            type="text"
            required
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-md border px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-black px-6 py-2 text-white"
        >
          Add Product
        </button>
      </form>
    </main>
  );
}
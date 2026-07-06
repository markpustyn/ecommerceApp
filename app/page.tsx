import { db } from "@/db/client";
import { itemsTable } from "@/drizzle/schema";
import Image from "next/image";
import Navbar from "./ui/navbar";
import Link from "next/link";


export default async function Home() {
  const products = await db.select().from(itemsTable);

  return (
    <div>
      <Navbar />
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            >
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow bg-white text-black"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={400}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-4">
              {product.name}
            </h2>

            <p>{product.description}</p>

            <p className="font-bold mt-2">
              ${(product.price / 100).toFixed(2)}
            </p>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
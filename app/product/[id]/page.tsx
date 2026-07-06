
import { db } from "@/db/client";
import { itemsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/ui/cartBtn";
import Navbar from "@/app/ui/navbar";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product] = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.id, id));

  if (!product) {
    notFound();
  }

  const newPrice = (product.price / 100).toFixed(2);


  return (
    <div>
<Navbar />
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-3xl font-semibold">
            ${newPrice}
          </p>

          <p className="mt-6 text-gray-600">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
    </div>
  );
}
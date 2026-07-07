import { auth } from "@/auth";
import { db } from "@/db/client";
import { itemsTable, ordersTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import Image from "next/image";
import PlaceOrderButton from "./pace-order-button";
import Navbar from "../ui/navbar";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const cartItems = await db
    .select({
      orderId: ordersTable.id,
      quantity: ordersTable.quantity,
      totalPrice: ordersTable.totalPrice,
      status: ordersTable.status,
      itemName: itemsTable.name,
      description: itemsTable.description,
      price: itemsTable.price,
      imageUrl: itemsTable.imageUrl,
    })
    .from(ordersTable)
    .innerJoin(itemsTable, eq(ordersTable.itemId, itemsTable.id))
    .where(
      and(
        eq(ordersTable.userId, session.user.id),
        eq(ordersTable.status, "cart")
      )
    );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div>
        <Navbar />        
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.orderId}
                className="flex gap-4 rounded-lg border p-4"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.itemName}
                width={100}
                height={100}
                  className="h-24 w-24 rounded-md object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.itemName}</h2>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                  <p className="mt-2">Quantity: {item.quantity}</p>
                  <p className="font-medium">
                    ${(item.totalPrice / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <h2 className="text-xl font-bold">
              Total: ${(cartTotal / 100).toFixed(2)}
            </h2>

            <PlaceOrderButton />
          </div>
        </>
      )}
    </main>
    </div>
  );
}
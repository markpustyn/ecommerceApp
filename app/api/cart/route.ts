import { db } from "@/db/client";
import { ordersTable } from "@/drizzle/schema";

export async function POST(request: Request) {
    const { id, price } = await request.json();
    const userId = 1;


    try{
        await db.insert(ordersTable).values({
            userId, 
            itemId: id,
            quantity: 1,
            totalPrice: price,
            status: "cart",
            
        });
        return new Response("Item added to cart", { status: 200 });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return new Response("Error adding item to cart", { status: 500 });
    }

}
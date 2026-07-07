import { db } from "@/db/client";
import { itemsTable } from "@/drizzle/schema";




export async function POST(request: Request) {

    const { name, description, price, imageUrl , userId} = await request.json();




    if(!name || !description || !price || !imageUrl || !userId) {
        return new Response("Missing required fields", { status: 400 });
    }

    try{
      await db.insert(itemsTable).values({
        name,
        description,
        price,
        imageUrl,
        merchantId: userId,
      });

      return Response.json("Product created successfully", { status: 201 });
    } catch (error) {
      console.error("Error inserting product:", error);
      return new Response("Internal Server Error", { status: 500 });
    }

}
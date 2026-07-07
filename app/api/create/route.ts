import { db } from "@/db/client";
import { itemsTable } from "@/drizzle/schema";




export async function POST(request: Request) {

    const { name, description, price, imageUrl } = await request.json();

    console.log("Received data:", { name, description, price, imageUrl });

    const merchantId = "f667739c-b133-49e9-be5d-70137379eb7e";

    if(!name || !description || !price || !imageUrl) {
        return new Response("Missing required fields", { status: 400 });
    }

    try{
      await db.insert(itemsTable).values({
        name,
        description,
        price,
        imageUrl,
        merchantId,
      });

      return Response.json("Product created successfully", { status: 201 });
    } catch (error) {
      console.error("Error inserting product:", error);
      return new Response("Internal Server Error", { status: 500 });
    }

}
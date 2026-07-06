import { db } from "@/db/client";
import { usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";


export default async function getUserFromDb(email: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)

    const userEmail = user?.email;
    const userPassword = user?.password;

    if(!userEmail || !userPassword) {
      return null;
    }

  return user ?? null
}
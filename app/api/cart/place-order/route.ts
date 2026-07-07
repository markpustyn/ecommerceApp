import { auth } from "@/auth";
import { db } from "@/db/client";
import { ordersTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await db
    .update(ordersTable)
    .set({
      status: "submitted",
    })
    .where(
      and(
        eq(ordersTable.userId, session.user.id),
        eq(ordersTable.status, "cart")
      )
    );

  return NextResponse.json({
    success: true,
  });
}
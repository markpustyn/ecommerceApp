import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const itemsTable = pgTable("items", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: integer().notNull(), // price in cents
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  merchantId: integer("merchant_id")
    .notNull()
    .references(() => usersTable.id),
});

export const ordersTable = pgTable("orders", {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  itemId: uuid("item_id")
    .notNull()
    .references(() => itemsTable.id),
  quantity: integer().notNull(),
  totalPrice: integer("total_price").notNull(),
  status: varchar({ length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
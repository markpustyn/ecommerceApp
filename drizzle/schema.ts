import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 50 }).notNull().default("user"),
});

export const itemsTable = pgTable("items", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  merchantId: uuid("merchant_id")
    .notNull()
    .references(() => usersTable.id),
});

export const ordersTable = pgTable("orders", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
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
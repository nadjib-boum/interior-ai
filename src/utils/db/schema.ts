import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const roomsTable = pgTable("roomsTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roomType: varchar("roomType", { length: 255 }).notNull(),
  designType: varchar("designType", { length: 255 }).notNull(),
  details: varchar("details", { length: 255 }), // Nullable by default
  originalImage: varchar("originalImage", { length: 255 }).notNull(),
  newImage: varchar("newImage", { length: 255 }).notNull(),
  userId: integer()
});

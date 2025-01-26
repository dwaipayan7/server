import { pgTable, uuid, text, timestamp, integer} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    // age: integer("age").notNull().default(18),
});


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
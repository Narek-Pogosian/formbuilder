import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => name);

export const forms = createTable(
  "form",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 256 }).notNull(),
    description: d.text(),
    content: d.json().notNull(),
    cancelled: d.boolean().default(false).notNull(),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("created_by_idx").on(t.createdById)],
);

export type Response = typeof responses.$inferSelect;
export const responses = createTable(
  "response",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    answers: d.json().notNull(),
    cancelled: d.boolean().default(false).notNull(),
    formId: d
      .integer()
      .notNull()
      .references(() => forms.id, { onDelete: "cascade" }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [index("formId_idx").on(t.formId)],
);

export const users = createTable(
  "user",
  (d) => ({
    id: d
      .varchar({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: d.varchar({ length: 255 }).notNull(),
    email: d.varchar({ length: 255 }).notNull().unique(),
    hashedPassword: d.varchar({ length: 255 }).notNull(),
    image: d.varchar({ length: 255 }),
    emailVerified: d
      .timestamp({
        mode: "date",
        withTimezone: true,
      })
      .default(sql`CURRENT_TIMESTAMP`),
  }),
  (t) => [index("email_idx").on(t.email)],
);

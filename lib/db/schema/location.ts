import type { z } from 'zod';

import { relations } from 'drizzle-orm';
import { int, real, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

import { user } from './auth';
import { locationLog } from './location-log';

export const location = sqliteTable('location', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, table => [
  unique().on(table.name, table.userId),
]);

export const locationRelations = relations(location, ({ many }) => ({
  locationLogs: many(locationLog),
}));

export const locationInsertSchema = createInsertSchema(location, {
  name: schema => schema.min(1).max(100),
  description: schema => schema.max(1000),
  lat: schema => schema.min(-90).max(90),
  long: schema => schema.min(-180).max(180),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof locationInsertSchema>;

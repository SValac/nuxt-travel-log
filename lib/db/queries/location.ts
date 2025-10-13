import { and, eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

import type { InsertLocation } from '../schema/location';

import db from '..';
import { location } from '../schema/location';

const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 5);

export async function findLocationsBySlugAndUserId(slug: string, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.slug, slug),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationsByUserId(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),

    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlug(slug: string): Promise<string> {
  let existingSlug = !!(await findLocationBySlug(slug));

  /*
    TODO: This while loop is a temporary solution to ensure slug uniqueness.
    In a high-concurrency environment (like a web application with many users), this could lead to race conditions.
    A more robust solution would involve database-level constraints or
    a different strategy for generating unique slugs.

    Before implementing a more robust solution, this approach should suffice for most use cases. But be aware of its limitations.
    Additionally, consider implementing a retry mechanism or a more sophisticated slug generation strategy if you expect high traffic.

    The loop checks if the generated slug already exists in the database. If it does, it appends a random string to the slug
    using nanoid until a unique slug is found.
    This ensures that even if two locations have the same name, they will have different slugs.
  */
  while (existingSlug) {
    const id = nanoId();
    const slugId = `${slug}-${id}`;
    existingSlug = !!(await findLocationBySlug(slugId));
    if (!existingSlug) {
      return slugId;
    }
  }
  return slug;
}

export async function insertLocation(insertable: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();
  return created;
}

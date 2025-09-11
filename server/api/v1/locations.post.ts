import type { LibsqlError } from '@libsql/client';
import type { DrizzleError } from 'drizzle-orm';

import db from '~~/lib/db';
import { location, locationInsertSchema } from '~~/lib/db/schema';
import slug from 'slug';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }));
  }

  const response = await readValidatedBody(event, locationInsertSchema.safeParse);

  if (!response.success) {
    const statusMessage = response
      .error
      .issues
      .map(issue => `${issue.path.join('')}: ${issue.message}`)
      .join(';');

    const data = response
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join('')] = issue.message;

        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  try {
    const [created] = await db.insert(location).values({
      ...response.data,
      slug: slug(response.data.name),
      userId: event.context.user?.id,
    }).returning();

    return created;
  }
  catch (e) {
    const drizzleError = e as DrizzleError;
    const errorMessage = drizzleError.cause as LibsqlError;
    if (errorMessage.message === 'SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug') {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'Slug must be unique (the location name is used to generate the slug)',
      }));
    }
    throw drizzleError;
  }
});

import type { LibsqlError } from '@libsql/client';
import type { DrizzleError } from 'drizzle-orm';

import { findLocationByName, findUniqueSlug, insertLocation } from '~~/lib/db/queries/location';
import { locationInsertSchema } from '~~/lib/db/schema';
import defineAuthenticatedEventHandler from '~~/server/utils/define-authenticated-event-handler';
import sendZodError from '~~/server/utils/send-zod-error';
import slugify from 'slug';

export default defineAuthenticatedEventHandler(async (event) => {
  const response = await readValidatedBody(event, locationInsertSchema.safeParse);

  if (!response.success) {
    return sendZodError(event, response.error);
  }

  const existingLocation = await findLocationByName(response.data, event.context.user.id);

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: 'Location with this name already exists',
    }));
  }

  const slug = await findUniqueSlug(slugify(response.data.name));

  try {
    return insertLocation(response.data, slug, event.context.user.id);
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

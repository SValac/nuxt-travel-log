import db from '~~/lib/db';
import { location, locationInsertSchema } from '~~/lib/db/schema';

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

  const [created] = await db.insert(location).values({
    ...response.data,
    slug: response.data.name.toLowerCase().replace(/\s+/g, '-'),
    userId: event.context.user?.id,
  }).returning();

  return created;
});

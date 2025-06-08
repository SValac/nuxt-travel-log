import { locationInsertSchema } from '~~/lib/db/schema';

export default defineEventHandler(async (event) => {
  const response = await readValidatedBody(event, locationInsertSchema.safeParse);

  if (!response.success) {
    const statusMessage = response
      .error
      .issues
      .map(issue => `${issue.path.join('')}: ${issue.message}`)
      .join(';');

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
    }));
  }

  return response.data;
});

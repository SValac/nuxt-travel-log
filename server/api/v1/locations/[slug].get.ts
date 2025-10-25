import { findLocationsBySlugAndUserId } from '~~/lib/db/queries/location';
import defineAuthenticatedEventHandler from '~~/server/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string;
  const location = await findLocationsBySlugAndUserId(slug, event.context.user.id);

  if (!location) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'Location not found',
    }));
  }

  return location;
});

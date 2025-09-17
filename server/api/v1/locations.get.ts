import { findLocationsByUserId } from '~~/lib/db/queries/location';
import defineAuthenticatedEventHandler from '~~/server/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event) => {
  return findLocationsByUserId(event.context.user.id);
});

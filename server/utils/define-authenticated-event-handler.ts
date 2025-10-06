import type { UserWithId } from '~~/lib/auth';
import type { H3Event, H3EventContext } from 'h3';

/*
  This type ensures that the event handler passed to defineAuthenticatedEventHandler
  has access to event.context.user, which is guaranteed to be present if the user is authenticated.
  If the user is not authenticated, a 401 error is returned before reaching the handler.
*/
type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: UserWithId;
  };
};

export default function defineAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      }));
    }
    return handler(event as AuthenticatedEvent);
  });
}

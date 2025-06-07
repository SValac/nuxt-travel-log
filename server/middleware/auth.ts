import { auth } from '~~/lib/auth';

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/dashboard')) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });
    if (!session) {
      console.log('No session found, redirecting to home');
      return sendRedirect(event, '/', 302);
    }
  }
});

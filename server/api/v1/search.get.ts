import sendZodError from '~~/server/utils/send-zod-error';
import { string, z } from 'zod';

const searchSchema = z.object({
  q: string().min(1),
});

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await getValidatedQuery(event, searchSchema.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${result.data.q}&format=json`, {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'valac-nuxt-travel-log | shiro.valac@gmail.com',
      },
    });

    if (!response.ok) {
      return sendError(event, createError({
        statusCode: 504,
        statusMessage: 'unable to reach search api',
      }));
    }
    const results = await response.json();
    return results;
  }
  catch {
    return sendError(event, createError({
      statusCode: 504,
      statusMessage: 'unable to reach search api',
    }));
  }
});

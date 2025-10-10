import { SearchSchema } from '~~/lib/zod-schemas';
import sendZodError from '~~/server/utils/send-zod-error';

export default defineAuthenticatedEventHandler(
  defineCachedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, SearchSchema.safeParse);

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
  }, {
    maxAge: 60 * 60 * 24, // 24 hours
    name: 'search-nominatim',
    getKey: async (event) => {
      const query = await getQuery(event);
      return query.q?.toString() || '';
    },
  }),
);

import { client } from '$services/redis';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		// get cached route from Redis
		return client.get('pagecache#' + route);
	}

	return null;
};

export const setCachedPage = (route: string, page: string) => {
  if (cacheRoutes.includes(route)) {
    // set key and value pair with expiration for 2 seconds
    return client.set('pagecache#' + route, page, {
      EX: 2
    });
  }
  return null;
};

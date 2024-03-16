import { client } from '$services/redis';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		// get cached route from Redis
		return client.get('pagecache#' + route);
  }
  
  return null;
};

export const setCachedPage = (route: string, page: string) => {};

import type { CreateItemAttrs } from '$services/types';
import { attr } from 'svelte/internal';

export const serialize = (attrs: CreateItemAttrs) => {
	return {
		...attrs,
		// override created and updated with with unix time
		createdAt: attrs.createdAt.toMillis(),
		endingAt: attrs.endingAt.toMillis()
	};
};

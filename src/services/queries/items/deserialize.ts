import type { Item } from '$services/types';
import { DateTime } from 'luxon';

export const deserialize = (id: string, item: { [key: string]: string }): Item => {
	return {
		// convert Redis string back to numbers and unix date Millis to date time format
		id,
		name: item.name,
		description: item.description,
		imageUrl: item.imageUrl,
		highestBidUserId: item.highestBidUserId,
		ownerId: item.ownerId,
		createdAt: DateTime.fromMillis(parseInt(item.createdAt)),
		endingAt: DateTime.fromMillis(parseInt(item.endingAt)),
		views: parseInt(item.views),
		likes: parseInt(item.likes),
		bids: parseInt(item.bids),
		price: parseFloat(item.price)
	};
};

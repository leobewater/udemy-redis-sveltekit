import { itemsKey } from '$services/keys';
import { deserialize } from '$services/queries/items/deserialize';
import { serialize } from '$services/queries/items/serialize';
import { client } from '$services/redis';
import type { CreateItemAttrs } from '$services/types';
import { genId } from '$services/utils';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemsKey(id));

	// If no items found, Redis returns an empty {}
	if (Object.keys(item).length === 0) {
		return null;
	}

	return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {
	const commands = ids.map((id) => {
		return client.hGetAll(itemsKey(id));
	});
	const results = await Promise.all(commands);

	return results.map((result, i) => {
		if (Object.keys(result).length === 0) {
			return null;
		}

		return deserialize(ids[i], result);
	});
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();

	const serialized = serialize(attrs);

	await client.hSet(itemsKey(id), serialized);

	return id;
};

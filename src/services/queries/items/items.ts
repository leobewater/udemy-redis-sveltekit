import { itemsKey } from '$services/keys';
import { serialize } from '$services/queries/items/serialize';
import { client } from '$services/redis';
import type { CreateItemAttrs } from '$services/types';
import { genId } from '$services/utils';

export const getItem = async (id: string) => {};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();

	const serialized = serialize(attrs);
	
  await client.hSet(itemsKey(id), serialized);
	
  return id;
};

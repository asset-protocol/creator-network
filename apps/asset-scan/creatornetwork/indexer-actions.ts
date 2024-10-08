'use server';

import { revalidateTag } from 'next/cache';
import { FETCH_ASSETS_TAG, FETCH_ASSET_BY_ID_TAG } from './indexer';

export async function revalidateAssets() {
  revalidateTag(`${FETCH_ASSETS_TAG}`);
  return Promise.resolve(`${FETCH_ASSETS_TAG}`);
}

export async function revalidateAssetById(id: string) {
  revalidateTag(`${FETCH_ASSET_BY_ID_TAG}_${id}`);
  return Promise.resolve(`${FETCH_ASSET_BY_ID_TAG}_${id}`);
}

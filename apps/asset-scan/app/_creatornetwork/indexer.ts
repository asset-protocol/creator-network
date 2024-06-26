import {
  GetAssetHubAssetsInput,
  IndexerClient,
} from '@creator-network/indexer-js';
import { revalidateTag, unstable_cache } from 'next/cache';

export const indexerClient = new IndexerClient(
  '/api/graphql'
);

export const FETCH_ASSET_BY_BIZID_TAG = 'fetchAssetByBizId';
export function fetchAssetByBizId(hub: string, assetId: string) {
  const action = unstable_cache(
    (hub: string, assetId: string) =>
      indexerClient.assets.fetchAssetByBizId(hub, assetId),
    [FETCH_ASSET_BY_BIZID_TAG],
    { tags: [`${FETCH_ASSET_BY_BIZID_TAG}_${hub}_${assetId}`] }
  );
  return action(hub, assetId);
}

export const FETCH_ASSET_BY_ID_TAG = 'fetchAssetById';
export function fetchAssetById(id: string) {
  const action = unstable_cache(
    (id: string) => indexerClient.assets.fetchAssetById(id),
    [FETCH_ASSET_BY_ID_TAG],
    { tags: [`${FETCH_ASSET_BY_ID_TAG}_${id}`] }
  );
  return action(id);
}

export const FETCH_ASSETS_TAG = 'fetchAssets';
export function fetchAssets(
  args?: Omit<GetAssetHubAssetsInput, 'fetchPolicy'>
) {
  const action = unstable_cache(
    (args?: Omit<GetAssetHubAssetsInput, 'fetchPolicy'>) =>
      indexerClient.assets.fetchAssets({ ...args, fetchPolicy: 'no-cache' }),
    [FETCH_ASSETS_TAG],
    { tags: [`${FETCH_ASSETS_TAG}`] }
  );
  return action(args);
}

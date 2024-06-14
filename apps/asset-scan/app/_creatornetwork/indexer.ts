import { GetAssetHubAssetsInput, IndexerClient } from "@creator-network/indexer-js";
import { revalidateTag, unstable_cache } from "next/cache";

export const indexerClient = new IndexerClient("http://3.87.189.32:3000/graphql");

export const FETCH_ASSET_BY_ID_TAG = "fetchAssetById";
export function fetchAssetById(hub: string, assetId: string) {
  const action = unstable_cache(
    (hub: string, assetId: string) => indexerClient.assets.fetchAssetById(hub, assetId),
    [FETCH_ASSET_BY_ID_TAG],
    { tags: [`${FETCH_ASSET_BY_ID_TAG}_${hub}_${assetId}`] }
  );
  return action(hub, assetId);
}


export const FETCH_ASSETS_TAG = "fetchAssets";
export function fetchAssets(args?: GetAssetHubAssetsInput) {
  const action = unstable_cache(
    (args?: GetAssetHubAssetsInput) => indexerClient.assets.fetchAssets(args),
    [FETCH_ASSETS_TAG],
    { tags: [`${FETCH_ASSETS_TAG}`] }
  );
  return action(args);
}

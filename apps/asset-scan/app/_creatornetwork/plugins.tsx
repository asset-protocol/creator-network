import { creatorNetwork } from "@creator-network/core";
import allAssetTypePlugin from "@creator-network/react/plugins/all-asset";

export function registePlugins() {
  return creatorNetwork.use(allAssetTypePlugin);
}
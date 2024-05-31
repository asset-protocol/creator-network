import { EtherAddress } from "@creator-network/core";
import { FeeCollectModule } from "./FeeCollectModule";
import { CollectModuleConfig, configureCollect } from "../../collect";

export default function feeCollectModulePlugin(feeCollectContract: EtherAddress) {
  return configureCollect((config: CollectModuleConfig) => {
    return config.registerCollectModule(FeeCollectModule(feeCollectContract));
  });
}

export * from './FeeCollectModule';
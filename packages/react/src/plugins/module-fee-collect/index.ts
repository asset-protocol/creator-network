import { EtherAddress } from "@creator-network/core";
import { FeeCollectModule } from "./FeeCollectModule";
import { CollectModuleConfig, CollectModuleInputProps, configureCollect } from "../../collect";
import { ReactElement } from "react";

export default function feeCollectModulePlugin(
  feeCollectContract: EtherAddress,
  inputNode?: ReactElement<CollectModuleInputProps>) {
  return configureCollect((config: CollectModuleConfig) => {
    return config.registerCollectModule(FeeCollectModule(feeCollectContract, inputNode));
  });
}

export * from './FeeCollectModule';
export * from './parsedata';
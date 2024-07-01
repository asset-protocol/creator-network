import { ReactElement, ReactNode } from "react";
import { BytesLike } from "ethers";
import { PayableOverrides } from "@creator-network/web3";
import { Asset, AssetModule, CreatorNetwork, EtherAddress, creatorNetwork } from "@creator-network/core";

export type BeforeCollectFunc = (assetId: bigint, options: PayableOverrides) => boolean | Promise<boolean>;

export type CollectModuleContentProps = {
  module: string;
  value?: BytesLike;
  onChange?: (v?: BytesLike) => void;
};

export type CollectModuleInputProps = {
  value?: BytesLike;
  onChange?: (v?: BytesLike) => void;
}

export type UseCollectModule = {
  viewNode?: ReactNode;
  collectButtonText?: ReactNode;
  errorText?: ReactNode;
  beforeCollect?: BeforeCollectFunc;
}

export interface ICollectModule {
  // module contract address
  moduleContract: EtherAddress;
  // module label
  label: string;
  inputNode: ReactElement<CollectModuleInputProps>;
  useCollect(asset: Asset, collectModule: AssetModule): UseCollectModule;
}

export class CollectModuleConfig {
  private _collectModules: ICollectModule[] = [];

  get collectModules(): Readonly<ICollectModule[]> {
    return this._collectModules;
  }

  public registerCollectModule(module: ICollectModule) {
    const collectModules = this._collectModules;
    collectModules.push(module);
    return () => {
      collectModules.splice(collectModules.indexOf(module), 1);
    };
  }
}

const COLLECT_MODULE = "__collect_modules";
export function configureCollect(configure: (config: CollectModuleConfig) => void | (() => void)) {
  return (cn: CreatorNetwork) => {
    let config = cn.get<CollectModuleConfig>(COLLECT_MODULE);
    if (!config) {
      config = new CollectModuleConfig();
      cn.set(COLLECT_MODULE, config);
    }
    return configure(config);
  }
}

export function collectModules() {
  let config = creatorNetwork.get<CollectModuleConfig>(COLLECT_MODULE);
  return config?.collectModules ?? []
}
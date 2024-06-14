import { useContext, useState, createContext, useMemo } from "react";
import { StorageScheme, creatorNetwork, getStorage } from "@creator-network/core";
import { getInjectedProviders } from "./provider-inject";
import { ContractRunner } from "ethers";
import { AssetHubManagerInfo, IndexerClient } from "@creator-network/indexer-js";


export type ChainInfo = {
  id: number,
  name: string
  nativeCurrency: { name: string, symbol: string, decimals: number },
}

export interface AssetContractRunner extends ContractRunner {
  isMulti?: boolean
  getAddress(): Promise<string>;
}

export type AccountInfo = {
  address: string;
  channel?: string;
  channelName?: string;
  channelAvatar?: string;
};

export type AssetContextData = {
  storage?: StorageScheme;
  setStorage: (storage: string | undefined) => void;

  account?: AccountInfo;
  requireLogin: () => void;
  contractRunner?: AssetContractRunner;
  chain: ChainInfo;

  apiClient: IndexerClient;
  manager?: AssetHubManagerInfo;
};

const AssetContext = createContext<AssetContextData>({} as never);
export type AssetProviderProps = {
  manager?: AssetHubManagerInfo;
  storage?: StorageScheme;
  contractRunner?: AssetContractRunner;
  account?: AccountInfo;
  requireLogin: () => void;
  chain: ChainInfo;
  apiClient: IndexerClient;
  children?: React.ReactNode;
};

export function AssetProvider(props: AssetProviderProps) {
  const [storage, setStorage] = useState<StorageScheme | undefined>(props.storage);
  const value = {
    storage,
    setStorage,
    account: props.account,
    manager: props.manager,
    requireLogin: props.requireLogin,
    contractRunner: props.contractRunner,
    chain: props.chain,
    apiClient: props.apiClient
  };
  let children = props.children;
  getInjectedProviders()?.forEach(
    (p) => (children = p({ children: props.children }))
  );
  return (
    <AssetContext.Provider value={value} children={children}>
    </AssetContext.Provider>
  );
}

export function useAssetHub() {
  const ctx = useContext(AssetContext);
  return { ...ctx };
}

export function useAssetStorage() {
  const { storage } = useAssetHub();
  return useMemo(() => {
    if (!storage) {
      return
    }
    return getStorage(storage);
  }, [storage])
}

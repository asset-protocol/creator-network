import { useContext, useState, createContext, useMemo } from 'react';
import {
  CreatorNetwork,
  StorageScheme,
  getStorage,
} from '@creator-network/core';
import { getInjectedProviders } from './provider-inject';
import { ContractRunner } from 'ethers';
import {
  AssetHubManagerInfo,
  IndexerClient,
} from '@creator-network/indexer-js';

export type ChainInfo = {
  id: number;
  name: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
};

export interface AssetContractRunner extends ContractRunner {
  getAddress(): Promise<string>;
}

export type AccountInfo = {
  address: string;
  isSafe?: boolean;
  studio?: string;
  studioName?: string;
  studioAvatar?: string;
};

export type AssetContextData = {
  services: CreatorNetwork;
  storage?: StorageScheme;
  setStorage: (storage: string | undefined) => void;

  account?: AccountInfo;
  contractRunner?: AssetContractRunner;
  chain: ChainInfo;

  apiClient: IndexerClient;
  manager?: AssetHubManagerInfo;
};

const AssetContext = createContext<AssetContextData>({} as never);
export type AssetProviderProps = {
  services: CreatorNetwork;
  manager?: AssetHubManagerInfo;
  storage?: StorageScheme;
  contractRunner?: AssetContractRunner;
  account?: AccountInfo;
  chain: ChainInfo;
  apiClient: IndexerClient;
  children?: React.ReactNode;
};

export function AssetProvider(props: AssetProviderProps) {
  const [storage, setStorage] = useState<StorageScheme | undefined>(
    props.storage
  );
  const value = {
    services: props.services,
    storage,
    setStorage,
    account: props.account,
    manager: props.manager,
    contractRunner: props.contractRunner,
    chain: props.chain,
    apiClient: props.apiClient,
  };
  let children = props.children;
  getInjectedProviders()?.forEach(
    (p) => (children = p({ children: props.children }))
  );
  return (
    <AssetContext.Provider
      value={value}
      children={children}
    ></AssetContext.Provider>
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
      return;
    }
    return getStorage(storage);
  }, [storage]);
}

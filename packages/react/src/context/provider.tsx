import { useContext, useState, createContext, useMemo } from "react";
import { Signer } from "ethers";
import { StorageScheme, creatorNetwork, getStorage } from "@creator-network/core";
import { HubInfoContext, HubInfoProvider } from "./hub-info";
import { getInjectedProviders } from "./provider-inject";
import { ApolloClient, ApolloProvider } from "@apollo/client";

export type AccountInfo = {
  address: string;
  name?: string;
  avatar?: string;
};

export type AssetContextData = {
  storage?: StorageScheme;
  setStorage: (storage: string | undefined) => void;

  account?: AccountInfo;
  requireLogin: () => void;
};

const AssetContext = createContext<AssetContextData>({} as never);
export type AssetProviderProps = {
  storage?: StorageScheme;
  signer: Signer;
  account?: AccountInfo;
  requireLogin: () => void;
  grapqlClient: ApolloClient<unknown>;

  children?: React.ReactNode;
};

export function AssetProvider(props: AssetProviderProps) {
  const [storage, setStorage] = useState<StorageScheme | undefined>(props.storage);
  const value = {
    storage,
    setStorage,
    account: props.account,
    requireLogin: props.requireLogin,
  };
  let children = props.children;
  getInjectedProviders()?.forEach(
    (p) => (children = p({ children: props.children }))
  );
  return (
    <AssetContext.Provider value={value}>
      <ApolloProvider client={props.grapqlClient}>
        <HubInfoProvider
          signer={props.signer}
          children={children}
        />
      </ApolloProvider>
    </AssetContext.Provider>
  );
}

export function useAssetHub() {
  const ctx = useContext(AssetContext);
  const infoCtx = useContext(HubInfoContext);
  return { ...ctx, ...infoCtx };
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

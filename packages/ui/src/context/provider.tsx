import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { useContext, useState, createContext } from "react";
import { Signer } from "ethers";
import { AssetHubConfig, AssetHubPlugin, globalConfig } from "../core/plugin";
import { HubInfoContext, HubInfoProvider } from "./hub-info";
import { IStorage, StorageScheme } from "../core/storage";

export type AccountInfo = {
  address: string;
  name?: string;
  avatar?: string;
};

export type AssetContextData = {
  ctx: AssetHubConfig;
  storage: IStorage;
  setStorage: (storage: IStorage) => void;
  changeHub: (hub?: string) => void;

  account?: AccountInfo;
  requireLogin: () => void;
};

const AssetContext = createContext<AssetContextData>({} as never);

const queryClient = new QueryClient();

export type AssetProviderProps = {
  hub?: string;
  storage: StorageScheme;
  plugins?: AssetHubPlugin[];

  grapqlClient: ApolloClient<unknown>;

  signer: Signer;
  account?: AccountInfo;
  requireLogin: () => void;

  children?: React.ReactNode;
};

export function AssetProvider(props: AssetProviderProps) {
  const [hub, setHub] = useState<string | undefined>(props.hub);
  const config = globalConfig;
  if (props.plugins) {
    props.plugins.forEach((p) => p(config));
  }
  const ctx = config;
  const [storage, setStorage] = useState<IStorage | undefined>(ctx.storages[props.storage]);
  if (!storage) throw new Error("storage not found: " + props.storage);
  const value = {
    ctx,
    storage,
    setStorage,
    changeHub: setHub,
    account: props.account,
    requireLogin: props.requireLogin,
  };
  let children = props.children;
  config.configProviders.forEach(
    (p) => (children = p({ children: props.children }))
  );
  return (
    <AssetContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={props.grapqlClient}>
          <HubInfoProvider
            signer={props.signer}
            hub={hub}
            children={children}
          />
        </ApolloProvider>
      </QueryClientProvider>
    </AssetContext.Provider>
  );
}

export function useAssetHub() {
  const ctx = useContext(AssetContext);
  const infoCtx = useContext(HubInfoContext);
  return { ...ctx, ...infoCtx };
}

import { CreatorNetwork, creatorNetwork } from "@creator-network/core";
import { ApolloClient, InMemoryCache, InMemoryCacheConfig } from '@apollo/client';

export class IndexerClientConfig {
  private _apolloClient?: ApolloClient<unknown>;

  get apolloClient() {
    return this._apolloClient;
  }

  constructor() { }

  setApolloClient<TCache>(client: ApolloClient<TCache>) {
    this._apolloClient = client;
    return this;
  }

  useApolloClientWithCache(uri: string, options?: InMemoryCacheConfig) {
    this._apolloClient = new ApolloClient({
      uri: uri,
      cache: new InMemoryCache(options)
    })
    return this;
  }

  static config(cn: CreatorNetwork) {
    let config = cn.get<IndexerClientConfig>(INDEXER_CLIENT);
    if (!config) {
      config = new IndexerClientConfig();
      cn.set(INDEXER_CLIENT, config);
    }
    return config;
  }
}

const INDEXER_CLIENT = "__indexer_client"
export function configureIndexerClient(configure: (config: IndexerClientConfig) => void) {
  return (cn: CreatorNetwork) => {
    return configure(IndexerClientConfig.config(cn));
  }
}

export function clientConfig() {
  return IndexerClientConfig.config(creatorNetwork);
}

export function apolloClient() {
  const c = IndexerClientConfig.config(creatorNetwork).apolloClient;
  if (c === undefined) {
    throw new Error("apolloClient is not set");
  }
  return c;
}
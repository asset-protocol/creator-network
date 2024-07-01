import { ApolloClient, InMemoryCache, InMemoryCacheConfig } from '@apollo/client';
import { AssetsAPI } from "./asset";
import { AssetHubAPI } from "./assethub";
import { ManagerAPI } from "./manager";
import { CurationAPI } from "./curation";
import { BlobAPI } from "./blob";

export class IndexerClient {
  private _apolloClient: ApolloClient<unknown>;

  get assets() {
    return new AssetsAPI(this._apolloClient);
  }

  get assetHubs() {
    return new AssetHubAPI(this._apolloClient);
  }

  get manager() {
    return new ManagerAPI(this._apolloClient);
  }

  get curations() {
    return new CurationAPI(this._apolloClient);
  }
  get blobs() {
    return new BlobAPI(this._apolloClient);
  }

  constructor(uri: string, options?: InMemoryCacheConfig) {
    this._apolloClient = new ApolloClient({
      uri: uri,
      cache: new InMemoryCache(options)
    })
  }
}

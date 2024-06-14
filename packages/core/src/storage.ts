import { CreatorNetwork, creatorNetwork } from "./core";

export type UploadObject = {
  name?: string
  data: string | Blob;
  onProgress?: (percent: number) => void;
  contentType?: string;
}

export type StorageScheme = string;

export interface IStorage {
  scheme: { name: string, label: string };
  upload(args: UploadObject): Promise<string>;
  getUrl(uri: string): string;
}

export class StorageConfig {
  private _storages: { [key: string]: IStorage };
  constructor(slot: { [key: string]: IStorage }) {
    this._storages = slot;
  }

  get storages() {
    return Object.values(this._storages)
  }

  registerStorage(storage: IStorage) {
    const stoarges = this._storages;
    const pre = stoarges[storage.scheme.name];
    stoarges[storage.scheme.name] = storage;
    if (pre) {
      return () => stoarges[storage.scheme.name] = pre;
    } else {
      return () => delete stoarges[storage.scheme.name];
    }
  }
}

export function configureStorage(configure: (config: StorageConfig) => void) {
  return (cn: CreatorNetwork) => {
    let strageConfig = cn.get<StorageConfig>("__sotrage_config");
    if (!strageConfig) {
      strageConfig = new StorageConfig({});
      cn.set("__sotrage_config", strageConfig);
    }
    configure(strageConfig);
  }
}

export function getStorage(scheme: StorageScheme) {
  let strageConfig = creatorNetwork.get<StorageConfig>("__sotrage_config");
  if (strageConfig) {
    return strageConfig.storages.find(s => s.scheme.name === scheme);
  }
}

export function replaceUri(uri?: string, options?: { search?: Record<string, string> }) {
  if (!uri) return uri;
  let res = uri;
  const paths = uri.split("://");
  if (paths[0] && paths[0].length < 16) {
    const storage = getStorage(paths[0]);
    if (storage) {
      res = storage.getUrl(uri);
    }
  }
  if (options?.search) {
    const url = new URL(res);
    Object.keys(options.search).forEach(k => {
      if (options.search?.[k] !== undefined) {
        url.searchParams.append(k, options.search[k]!);
      }
    })
    res = url.toString();
  }
  return res;
}


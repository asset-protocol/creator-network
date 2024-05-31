import { CreatorNetwork, creatorNetwork } from "./core";

export type UploadObject = {
  name?: string
  data: string | Blob;
  onProgress?: (percent: number) => void;
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

export function replaceUri(uri?: string) {
  if (!uri) return uri;
  const paths = uri.split("://");
  if (paths[0] && paths[0].length < 16) {
    const storage = getStorage(paths[0]);
    if (storage) {
      return storage.getUrl(uri);
    }
  }
  return uri;
}


import { Asset, AssetType, CreatorNetwork, creatorNetwork } from "@creator-network/core"
import { ASSET_TYPE_UNKNOW, IEditorProvider } from "./editor"
import { IViewerProvider } from "./viewer"

export class AssetConfig {
  private _editorProviders: { [key: AssetType]: IEditorProvider[] } = {}
  private _viewerProviders: { [key: AssetType]: IViewerProvider[] } = {}

  public get editorProviders() {
    return this._editorProviders;
  }

  public get viewerProviders() {
    return this._viewerProviders;
  }

  public registerEditor(provider: IEditorProvider): void | (() => void) {
    provider.types.forEach(t => {
      if (this._editorProviders[t.value]) {
        this._editorProviders[t.value]!.push(provider);
      } else {
        this._editorProviders[t.value] = [provider];
      }
    })
  }

  public registerViewer(type: string, provider: IViewerProvider) {
    const providers = this._viewerProviders;
    if (providers[type]) {
      providers[type]!.push(provider);
    } else {
      providers[type] = [provider];
    }
    return () => { providers[type]?.splice(providers[type]!.indexOf(provider), 1) };
  }
}

const ASSET_MODULE = "__asset_module"
export function configureAsset(configure: (config: AssetConfig) => void | (() => void)) {
  return (cn: CreatorNetwork) => {
    let config = cn.get<AssetConfig>(ASSET_MODULE);
    if (!config) {
      config = new AssetConfig();
      cn.set(ASSET_MODULE, config);
    }
    return configure(config);
  }
}

export function editorProviders() {
  const config = creatorNetwork.get<AssetConfig>(ASSET_MODULE);
  return config?.editorProviders;
}

export function viewerProviders() {
  const config = creatorNetwork.get<AssetConfig>(ASSET_MODULE);
  return config?.viewerProviders;
}

export function getAssetViewer(asset: Asset) {
  const providers = viewerProviders();
  if (providers) {
    let p = providers[asset.type]?.find(p => p.selector(asset));
    if (!p) {
      p = providers[ASSET_TYPE_UNKNOW]?.find(p => p.selector(asset));
      if (!p) {
        throw new Error("viewer provider no found: " + asset.type);
      }
    }
    return p
  }
}

export function getAssetEditor(type: AssetType) {
  const providers = editorProviders();
  if (providers) {
    let p = providers[type]?.find(p => p.selector(type));
    if (!p) {
      p = providers[ASSET_TYPE_UNKNOW]?.find(p => p.selector(type));
      if (!p) {
        throw new Error("editor provider no found: " + type);
      }
    }
    return p
  }
}
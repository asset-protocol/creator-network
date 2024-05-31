import { editorProviders } from "../asset/asset";
import { ASSET_TYPE_UNKNOW, Info } from "../asset/editor";

export function useAssetTypes() {
  return () => {
    const types = new Map<string, Info>();
    Object.values(editorProviders()!).forEach(v => {
      v.forEach(p => {
        p.types.forEach(t => {
          types.set(t.value, t);
        });
      });
    });
    types.delete(ASSET_TYPE_UNKNOW);
    return Array.from(types.values());
  }
}




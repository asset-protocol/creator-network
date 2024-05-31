import { lazy, Suspense } from "react";
import { ASSET_TYPE_UNKNOW, AssetConfig } from "../../asset";

const Editor = lazy(() => import("./components/DefaultEditor"));

const defaultEditor = (config: AssetConfig) => {
  return config.registerEditor({
    types: [{ label: ASSET_TYPE_UNKNOW, value: ASSET_TYPE_UNKNOW }],
    selector: () => true,
    editor: (props) => (
      <Suspense>
        <Editor {...props} />
      </Suspense>
    ),
  });
};
export default defaultEditor;

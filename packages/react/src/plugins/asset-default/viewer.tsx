import { Suspense, lazy } from "react";
import { ASSET_TYPE_UNKNOW, AssetConfig } from "../../asset";

const Viewer = lazy(() => import("./components/DefaultViewer"));

const defaultViewer = (config: AssetConfig) => {
  return config.registerViewer(ASSET_TYPE_UNKNOW, {
    selector: () => true,
    viewer: (props) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    ),
  });
};
export default defaultViewer;

import { Suspense, lazy } from "react";
import { TYPE_VIDEO, TYPE_YOUTUBE } from "./consts";
import { Asset } from "@creator-network/core";
import { AssetConfig, IViewerProvider } from "../../asset";

const Viewer = lazy(() => import("./components/VideoViewer"));

const videoViewer = (config: AssetConfig) => {
  const p: IViewerProvider = {
    selector: (v: Asset) => v.type === TYPE_VIDEO || v.type === TYPE_YOUTUBE,
    viewer: (props) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    ),
  };
  config.registerViewer(TYPE_VIDEO, p);
  config.registerViewer(TYPE_YOUTUBE, p);
};
export default videoViewer;

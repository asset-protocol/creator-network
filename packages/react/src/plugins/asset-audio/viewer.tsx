import { Suspense, lazy } from "react";
import { TYPE_AUDIO } from "./consts";
import { Asset, CreatorNetwork } from "@creator-network/core";
import { AssetConfig, configureAsset } from "../../asset";

const Viewer = lazy(() => import("./components/AudioViewer"));

const audioViewer = (config: AssetConfig) => {
  return config.registerViewer(TYPE_AUDIO, {
    selector: (v: Asset) => v.type === TYPE_AUDIO,
    viewer: (props) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    )
  })
}

export default audioViewer;

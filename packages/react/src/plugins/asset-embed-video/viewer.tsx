import { Suspense, lazy } from "react";
import { TYPE_EMBED_VIDEO } from "./consts";
import { AssetConfig } from "../../asset";

const Viewer = lazy(() => import("./components/EmbedVideoViewer"));

const embedVideoViewer = (config: AssetConfig) => {
  config.registerViewer(TYPE_EMBED_VIDEO, {
    selector: (t) => t.type === TYPE_EMBED_VIDEO,
    viewer: (props) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    ),
  });
};
export default embedVideoViewer;

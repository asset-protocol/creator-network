import { Suspense, lazy } from "react";
import { TYPE_MARKDOWN } from "./consts";
import { Asset } from "@creator-network/core";
import { AssetConfig } from "../../asset";

const Viewer = lazy(() => import("./components/MarkdownViewer"));

const markdownViewer = (config: AssetConfig) => {
  config.registerViewer(TYPE_MARKDOWN, {
    selector: (v: Asset) => v.type === TYPE_MARKDOWN,
    viewer: (props) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    ),
  });
};
export default markdownViewer;

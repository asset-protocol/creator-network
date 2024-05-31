import { Suspense, lazy } from "react";
import { TYPE_RICH_TEXT } from "./consts";
import { AssetConfig } from "../../asset";
import { Asset } from "@creator-network/core";

const Viewer = lazy(() => import("./components/RichTextViewer"));

const richtextViewer = (config: AssetConfig) => {
  config.registerViewer(TYPE_RICH_TEXT, {
    selector: (v: Asset) => v.type === TYPE_RICH_TEXT,
    viewer: (props: any) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    ),
  });
  config.registerViewer("q-richtext", {
    selector: (v: Asset) => v.type === "q-richtext",
    viewer: (props: any) => (
      <Suspense>
        <Viewer {...props} />
      </Suspense>
    ),
  });
};
export default richtextViewer;

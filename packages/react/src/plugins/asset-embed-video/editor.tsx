import { lazy, Suspense } from "react";
import { TYPE_EMBED_VIDEO } from "./consts";
import { AssetConfig } from "../../asset";

const Editor = lazy(() => import("./components/EmbedVideoEditor"));
const embedVideoEditor = (config: AssetConfig) => {
  config.registerEditor({
    types: [{ value: TYPE_EMBED_VIDEO, label: "Embed Video" }], // Add a new type for the link editor},
    selector: (t) => t === TYPE_EMBED_VIDEO,
    editor: (props) => (
      <Suspense>
        <Editor {...props} />
      </Suspense>
    ),
  });
};
export default embedVideoEditor;

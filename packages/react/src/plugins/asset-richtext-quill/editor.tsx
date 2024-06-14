import { TYPE_RICH_TEXT } from "./consts";
import { Suspense, lazy } from "react";
import { Delta } from "quill/core";
import { AssetConfig } from "../../asset";
import { useAssetHub } from "../../context";
import { getStorage } from "@creator-network/core";

export const AssetRichTextEditor = lazy(
  () => import("./components/RichTextEditor")
);

const richtextEditor = (config: AssetConfig) => {
  config.registerEditor({
    types: [{ value: TYPE_RICH_TEXT, label: "Rich Text" }],
    selector: (t) => t === TYPE_RICH_TEXT,
    editor: (props) => (
      <Suspense>
        <AssetRichTextEditor {...props} />
      </Suspense>
    ),
    useBeforePublish() {
      const { storage } = useAssetHub();
      return async (cur) => {
        const content = new Delta(JSON.parse(cur));
        for (const op of content.ops) {
          if (op.insert && typeof op.insert === "object") {
            if (
              typeof op.insert.image === "string" &&
              op.insert.image.startsWith("blob:")
            ) {
              const data = await fetch(op.insert.image).then((res) =>
                res.blob()
              );
              const url = await getStorage(storage!)!.upload({ data });
              op.insert.image = url;
            }
            if (
              typeof op.insert.video === "string" &&
              op.insert.video.startsWith("blob:")
            ) {
              const data = await fetch(op.insert.video).then((res) =>
                res.blob()
              );
              const url = await getStorage(storage!)!.upload({ data });
              op.insert.video = url;
            }
            if (
              typeof op.insert.audio === "string" &&
              op.insert.audio.startsWith("blob:")
            ) {
              const data = await fetch(op.insert.audio).then((res) =>
                res.blob()
              );
              const url = await getStorage(storage!)!.upload({ data });
              op.insert.audio = url;
            }
          }
        }
        return JSON.stringify(content);
      };
    },
  });
};

export default richtextEditor;

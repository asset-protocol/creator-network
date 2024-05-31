import defaultEditor from "./editor";
import defaultViewer from "./viewer";
import { configureAsset } from "../../asset";
import { withDispose } from "@creator-network/core";

export default function imagePlugin() {
  return configureAsset(config =>
    withDispose(
      defaultEditor(config),
      defaultViewer(config)
    )
  )
}
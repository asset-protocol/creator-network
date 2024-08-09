import { defaultViewer } from "./viewer";
import { configureAsset } from "../../asset/asset";
import { withDispose } from "@creator-network/core";
import defaultEditor from "./editor";

export default function defaultPlugin() {
  return configureAsset(config =>
    withDispose(
      defaultEditor(config),
      defaultViewer(config)
    )
  )
  return () => { }
}

export * from "./editor";
export * from "./viewer";
import { withDispose } from "@creator-network/core";
import { configureAsset } from "../../asset";
import markdownEditor from "./editor";
import markdownViewer from "./viewer";

export * from './consts';

export default function markdownPlugin() {
  return configureAsset(config =>
    withDispose(
      markdownViewer(config),
      markdownEditor(config)
    )
  )
}
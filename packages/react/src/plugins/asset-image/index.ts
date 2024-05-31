import { withDispose } from "@creator-network/core";
import { configureAsset } from "../../asset";
import imageEditor from "./editor";
import imageViewer from "./viewer";

export * from './consts';

export default function imagePlugin() {
  return configureAsset(config => {
    return withDispose(
      imageEditor(config),
      imageViewer(config)
    );
  })
}
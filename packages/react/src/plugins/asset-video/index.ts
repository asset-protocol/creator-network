import { withDispose } from "@creator-network/core";
import { configureAsset } from "../../asset";
import videoEditor from "./editor";
import videoViewer from "./viewer";

export * from './consts';

export default function videoPlugin() {
  return configureAsset(config => withDispose(
    videoEditor(config),
    videoViewer(config)
  ));
}
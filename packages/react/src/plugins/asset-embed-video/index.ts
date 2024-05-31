import { withDispose } from "@creator-network/core";
import { configureAsset } from "../../asset";
import embedVideoEditor from "./editor";
import embedVideoViewer from "./viewer";

export * from './consts';

export default function embedVideoPlugin() {
  return configureAsset(config => {
    return withDispose(
      embedVideoEditor(config),
      embedVideoViewer(config)
    );
  })
}
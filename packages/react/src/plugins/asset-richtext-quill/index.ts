import { withDispose } from "@creator-network/core";
import { configureAsset } from "../../asset";
import richtextEditor from "./editor";
import richtextViewer from "./viewer";

export * from './consts';
export * from './editor';

export default function richTextQuillPlugin() {
  return configureAsset(config => withDispose(
    richtextEditor(config),
    richtextViewer(config)
  ))
}
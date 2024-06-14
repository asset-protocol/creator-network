import { withDispose } from "@creator-network/core";
import { configureAsset } from "../../asset";
import richtextEditor from "./editor";
import richtextViewer from "./viewer";

export * from './consts';
export { default as richtextEditor } from './editor';
export { default as richtextViewer } from './viewer';

export default function richTextQuillPlugin() {
  return configureAsset(config => withDispose(
    richtextEditor(config),
    richtextViewer(config)
  ))
}
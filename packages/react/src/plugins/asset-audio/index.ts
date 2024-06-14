import audioViewer from "./viewer";
import { configureAsset } from "../../asset";

export * from './consts';

export default function markdownPlugin() {
  return configureAsset(config => {
    return audioViewer(config);
  });
};
import { configureStorage } from "@creator-network/core";
import { ArwaveStorage } from "./arwave";

export default function arwaveStoragePlugin() {
  return configureStorage(config => {
    return config.registerStorage(new ArwaveStorage());
  })
}

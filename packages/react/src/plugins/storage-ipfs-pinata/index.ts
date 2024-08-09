import { configureStorage } from "@creator-network/core";
import { PinataStorage } from "./pinata";

export { STORAGE_SCHEMA_IPFS } from './pinata';

export default function ipfsPinataPlugin(options: { jwtToken: string, gateway: string }) {
  return configureStorage(config => {
    return config.registerStorage(new PinataStorage(options.jwtToken, options.gateway));
  });
}
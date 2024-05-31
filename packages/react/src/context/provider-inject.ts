import { creatorNetwork } from "@creator-network/core";
import { Provider, ReactNode } from "react";

export type ProviderFunc = (props: { children: ReactNode }) => ReactNode;

export function injectProvider<T>(provider: ProviderFunc) {
  let providers = creatorNetwork.get<ProviderFunc[]>("__providers")
  if (providers == undefined) {
    providers = [];
    creatorNetwork.set("__providers", providers)
  }
  providers.push(provider)
}

export function getInjectedProviders() {
  let providers = creatorNetwork.get<ProviderFunc[]>("__providers")
  if (providers == undefined) {
    providers = [];
    creatorNetwork.set("__providers", providers)
  }
  return providers;
}
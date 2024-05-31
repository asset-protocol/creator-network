import { creatorNetwork } from "@creator-network/core";
import { publicEthProvider } from "./ether";
import { NewAssetHubManager } from "@creator-network/web3";
import { configureIndexerClient, fetchHubManager } from "@creator-network/indexer-js";
import feeCollectModulePlugin from "@creator-network/react/plugins/module-fee-collect";
import tokenCollectModulePlugin from "@creator-network/react/plugins/module-token-collect";
import ipfsPinataPlugin from "@creator-network/react/plugins/storage-ipfs-pinata";
import arwaveStoragePlugin from "@creator-network/react/plugins/storage-arwave";
import allAssetTypePlugin from "@creator-network/react/plugins/all-asset";

const JWTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMjFmMjUzMi01ODMxLTRmZTgtODAwMi01ODkxMjA2MjE4MjMiLCJlbWFpbCI6IndhaXRlMXhAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2E0OWNiM2Q2OTM3NTQ4YzMzMjEiLCJzY29wZWRLZXlTZWNyZXQiOiJkNWYxZWY2NDkyMWMwMTc2YzYyNTkyYTNhNTZkMzc3MmVlYWY3NmIwZjFkZGE4Y2RhYmY1NzA2NGYyYjQ3OTYxIiwiaWF0IjoxNzEwNDg0MjIxfQ.sQp8EB2l716fjOqG8Uj2n4zitR1wBQ3-IsiKlZ6XVOo";

export async function Plugins() {
  creatorNetwork.use(configureIndexerClient(config => {
    config.useApolloClientWithCache("http://3.87.189.32:3000/graphql")
  }))
  creatorNetwork.use(ipfsPinataPlugin({ jwtToken: JWTOKEN, gateway: "https://ipfs.io" }));
  creatorNetwork.use(arwaveStoragePlugin());
  // creatorNetwork.use(allAssetTypePlugin);
  const manager = await fetchHubManager();
  const ah = NewAssetHubManager(publicEthProvider, manager.id);
  const modules = await ah.hubDefaultModules();
  // creatorNetwork.use(feeCollectModulePlugin(modules.feeCollectModule));
  // creatorNetwork.use(
  //   tokenCollectModulePlugin({
  //     moduleContract: modules.tokenCollectModule,
  //     tokens: [
  //       {
  //         label: "TestToken",
  //         name: "TST",
  //         contract: "0x36536674237634Dd5e1F4C32804567F611e88602",
  //       },
  //     ],
  //   })
  // );
  return <></>
}
'use client'
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { FeeCollectModule } from "./plugins/FeeCollectModule";
import { TokenCollectModule } from "./plugins/TokenCollectModule";
import { message } from "antd";
import { AssetProvider, useAssetHub } from "@creator-network/react";
import ipfsPinataPlugin from "@creator-network/react/plugins/storage-ipfs-pinata";
import arwaveStoragePlugin from "@creator-network/react/plugins/storage-arwave";
import allAssetTypePlugin from "@creator-network/react/plugins/all-asset";
import { creatorNetwork, withDispose } from "@creator-network/core";
import { useEthersSigner } from "./ether";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const JWTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMjFmMjUzMi01ODMxLTRmZTgtODAwMi01ODkxMjA2MjE4MjMiLCJlbWFpbCI6IndhaXRlMXhAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2E0OWNiM2Q2OTM3NTQ4YzMzMjEiLCJzY29wZWRLZXlTZWNyZXQiOiJkNWYxZWY2NDkyMWMwMTc2YzYyNTkyYTNhNTZkMzc3MmVlYWY3NmIwZjFkZGE4Y2RhYmY1NzA2NGYyYjQ3OTYxIiwiaWF0IjoxNzEwNDg0MjIxfQ.sQp8EB2l716fjOqG8Uj2n4zitR1wBQ3-IsiKlZ6XVOo";

export type HubModulesData = {
  tokenCreateModule: string;
  collectNFT: string;
  feeCollectModule: string;
  tokenCollectModule: string;
  nftGatedModule: string;
};

function Plugins() {
  const { assetHubManager } = useAssetHub();
  const [manager, setManager] = useState<HubModulesData>();

  useEffect(() => {
    if (assetHubManager) {
      try {
        assetHubManager.hubDefaultModules().then((modules) => {
          setManager(modules);
        });
      } catch (e) {
        console.error(e);
        message.error("Failed to load asset hub modules");
      }
    }
  }, [assetHubManager]);
  return (
    manager && (
      <>
        <FeeCollectModule feeCollectModule={manager.feeCollectModule} />
        <TokenCollectModule tokenCollectModule={manager.tokenCollectModule} />
      </>
    )
  );
}

const client = new ApolloClient({
  uri: "http://3.87.189.32:3000/graphql",
  cache: new InMemoryCache(),
});

export function CreatorNetworkProvider(props: { children: React.ReactNode }) {
  const signer = useEthersSigner();
  const currentAccount = useAccount();
  const { openConnectModal } = useConnectModal();

  const account = useMemo(
    () =>
      currentAccount.address && {
        address: currentAccount.address,
      },
    [currentAccount]
  );

  useEffect(() => {
    return withDispose(
      creatorNetwork.use(ipfsPinataPlugin({ jwtToken: JWTOKEN, gateway: "https://ipfs.io" })),
      creatorNetwork.use(arwaveStoragePlugin()),
      creatorNetwork.use(allAssetTypePlugin),
    );
  }, [])

  return (
    <AssetProvider
      signer={signer!}
      storage={"ipfs"}
      account={account}
      grapqlClient={client}
      requireLogin={() => openConnectModal?.()}
    >
      <Plugins />
      {props.children}
    </AssetProvider>
  );
}

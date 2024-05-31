'use client'
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { AssetProvider } from "@creator-network/react";
import { useEthersSigner } from "./ether";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export type HubModulesData = {
  tokenCreateModule: string;
  collectNFT: string;
  feeCollectModule: string;
  tokenCollectModule: string;
  nftGatedModule: string;
};
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


  return (
    <AssetProvider
      signer={signer!}
      storage={"ipfs"}
      account={account}
      grapqlClient={client}
      requireLogin={() => openConnectModal?.()}
    >
      {props.children}
    </AssetProvider>
  );
}

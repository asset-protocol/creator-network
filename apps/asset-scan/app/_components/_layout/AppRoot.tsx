'use client'
import { WagmiProvider } from "wagmi";
import { CreatorNetworkProvider } from "./_creatornetwork";
import { ReactNode } from "react";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, safeWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: "Asset Demo App",
  projectId: "17557b1e86e0cb2f1a007a122223ddbf",
  chains: [baseSepolia],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, safeWallet, metaMaskWallet, walletConnectWallet],
    },
  ]
});

export function AppProviders({ children }: { children: ReactNode }) {
  return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <CreatorNetworkProvider>{children}</CreatorNetworkProvider>
      </RainbowKitProvider>
    </QueryClientProvider >
  </WagmiProvider>


}
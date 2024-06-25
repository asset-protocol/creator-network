'use client';
import { WagmiProvider } from 'wagmi';
import { ReactNode } from 'react';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppAssetProvider } from './AppContext';
import { AssetHubManagerInfo } from '@creator-network/indexer-js';
import { useStorage } from '@/app/_creatornetwork';
import { AntThmeConfigProvider } from './AntConfig';

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: 'Asset Demo App',
  projectId: '17557b1e86e0cb2f1a007a122223ddbf',
  chains: [baseSepolia],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, safeWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
});

export function AppProviders({
  children,
  manager,
}: {
  children: ReactNode;
  manager: AssetHubManagerInfo;
}) {
  useStorage();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AntThmeConfigProvider>
          <RainbowKitProvider>
            <AppAssetProvider manager={manager}>{children}</AppAssetProvider>
          </RainbowKitProvider>
        </AntThmeConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

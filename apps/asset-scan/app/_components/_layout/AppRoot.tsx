'use client';
import { WagmiProvider } from 'wagmi';
import { ReactNode, useEffect } from 'react';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { registePlugins } from '../../_creatornetwork/plugins';
import { ConfigProvider, ThemeConfig } from 'antd';
import { AppAssetProvider } from './AppContext';
import { AssetHubManagerInfo } from '@creator-network/indexer-js';
import { useStorage } from '@/app/_creatornetwork';

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

const AntTheme: ThemeConfig = {
  token: {
    colorPrimary: '#00AAA1',
    colorPrimaryText: '#FFFFFF',
    colorBorder: '#999999',
    borderRadius: 4,
    colorBgContainer: 'transparent',
    colorLinkHover: '#00AAA1',
    fontSize: 16,
  },
  components: {
    Button: {
      paddingContentHorizontal: 20,
      paddingContentVertical: 10,
      colorLink: '#00AAA1',
    },
  },
};

export function AppProviders({
  children,
  manager,
}: {
  children: ReactNode;
  manager: AssetHubManagerInfo;
}) {
  registePlugins();
  useStorage();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={AntTheme}>
          <RainbowKitProvider>
            <AppAssetProvider manager={manager}>{children}</AppAssetProvider>
          </RainbowKitProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

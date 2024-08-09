'use client';
import { useEffect, useState } from 'react';
import { AssetProvider, ChainInfo, useAssetHub } from '@creator-network/react';
import { publicEthProvider } from './ether';
import '@rainbow-me/rainbowkit/styles.css';
import { NewAssetHubManager } from '@creator-network/web3';
import { creatorNetwork } from '@creator-network/core';
import feeCollectModulePlugin from '@creator-network/react/plugins/module-fee-collect';
import tokenCollectModulePlugin from '@creator-network/react/plugins/module-token-collect';
import { AssetHubManagerInfo } from '@creator-network/indexer-js';
import { useApp } from '../components/layout/AppContext';
import { FeeCollectModuleItem } from './components/FeeCollectModuleItem';
import { TokenCollectModuleItem } from './components/TokenCollectModuleItem';
import { indexerClient } from './indexer';

export type HubModulesData = {
  tokenCreateModule: string;
  collectNFT: string;
  feeCollectModule: string;
  tokenCollectModule: string;
  nftGatedModule: string;
};

type ModulesData = {
  tokenCreateModule: string;
  collectNFT: string;
  feeCollectModule: string;
  tokenCollectModule: string;
  nftGatedModule: string;
};

const Plugins = () => {
  const { manager } = useAssetHub();
  const [modules, setModules] = useState<ModulesData>();

  useEffect(() => {
    (async () => {
      if (manager) {
        const ah = NewAssetHubManager(publicEthProvider, manager.id);
        const res = await ah.hubDefaultModules();
        setModules(res);
      }
    })();
  }, [manager]);

  useEffect(() => {
    if (modules) {
      const tokens = [
        {
          label: 'TestToken',
          name: 'TST',
          contract: '0x36536674237634Dd5e1F4C32804567F611e88602',
        },
      ];
      return creatorNetwork.use(
        feeCollectModulePlugin(
          modules.feeCollectModule,
          <FeeCollectModuleItem module={modules.feeCollectModule} />
        ),
        tokenCollectModulePlugin({
          moduleContract: modules.tokenCollectModule,
          tokens,
          input: (
            <TokenCollectModuleItem
              tokens={tokens}
              module={modules.tokenCollectModule}
            />
          ),
        })
      );
    }
  }, [modules]);
  return <></>;
};

export function CreatorNetworkProvider(props: {
  children: React.ReactNode;
  chain: ChainInfo;
  manager: AssetHubManagerInfo;
}) {
  const { account, contractRunner } = useApp();
  return (
    <AssetProvider
      services={creatorNetwork}
      contractRunner={contractRunner}
      manager={props.manager}
      storage={'ipfs'}
      account={account}
      chain={props.chain}
      apiClient={indexerClient()}
    >
      <Plugins />
      {props.children}
    </AssetProvider>
  );
}

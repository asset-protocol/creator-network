import { CreatorNetworkProvider } from '@/app/_creatornetwork';
import { useEthersSigner } from '@/app/_creatornetwork/ether';
import { AssetHubManagerInfo } from '@creator-network/indexer-js';
import { AccountInfo, AssetContractRunner } from '@creator-network/react';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useChains } from 'wagmi';

export type AppContextData = {
  contractRunner?: AssetContractRunner;
  setContractRunner: (cr: AssetContractRunner | undefined) => void;

  account?: AccountInfo;
  setAccount: (acc: AccountInfo | undefined) => void;
};
export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppAssetProvider({
  children,
  manager,
}: {
  children: ReactNode;
  manager: AssetHubManagerInfo;
}) {
  const signer = useEthersSigner();
  const chains = useChains();
  const wallet = useAccount();

  const [runner, setRunner] = useState<AssetContractRunner | undefined>(signer);
  const [account, setAccount] = useState<AccountInfo | undefined>(() =>
    wallet.address ? { address: wallet.address } : undefined
  );

  useEffect(() => {
    if (account?.address !== wallet.address) {
      setAccount(wallet.address ? { address: wallet.address } : undefined);
    }
    if (runner !== signer) {
      setRunner(signer);
    }
  }, [wallet, signer]);

  const value: AppContextData = {
    contractRunner: runner,
    setContractRunner: setRunner,
    account,
    setAccount,
  };
  return (
    <AppContext.Provider value={value}>
      <CreatorNetworkProvider manager={manager} chain={chains[0]}>
        {children}
      </CreatorNetworkProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

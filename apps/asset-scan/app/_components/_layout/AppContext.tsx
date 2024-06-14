import { CreatorNetworkProvider } from "@/app/_creatornetwork";
import { useEthersSigner } from "@/app/_creatornetwork/ether";
import { AssetHubInfo } from "@creator-network/core";
import { AssetHubManagerInfo } from "@creator-network/indexer-js";
import { AccountInfo, AssetContractRunner } from "@creator-network/react";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAccount, useChains } from "wagmi";

export type AppContextData = {
  contractRunner?: AssetContractRunner;
  setContractRunner: (cr: AssetContractRunner | undefined) => void;

  account?: AccountInfo;
  setAccount: (acc: AccountInfo | undefined) => void;
}
export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppAssetProvider({ children, manager }: { children: ReactNode, manager: AssetHubManagerInfo }) {
  const signer = useEthersSigner();
  const chains = useChains();
  const { address } = useAccount();

  const [runner, setRunner] = useState<AssetContractRunner | undefined>(signer);
  const [account, setAccount] = useState<AccountInfo | undefined>(() => (
    address ? { address } : undefined
  ));

  useEffect(() => {
    setAccount(address ? { address } : undefined)
  }, [address])

  useEffect(() => {
    if (!runner) {
      setRunner(signer);
    }
  }, [signer])

  const value: AppContextData = {
    contractRunner: runner,
    setContractRunner: setRunner,
    account,
    setAccount,
  }
  return (
    <AppContext.Provider value={value}>
      <CreatorNetworkProvider manager={manager} chain={chains[0]}>{children}</CreatorNetworkProvider>
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext);
}
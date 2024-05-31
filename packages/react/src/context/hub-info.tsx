import { useEffect, useState, createContext, useMemo } from "react";
import { NewAssetHubManager, LiteAssetHubManager } from "@creator-network/web3";
import { AssetHubManagerInfo, useGetHubManager } from "@creator-network/indexer-js";
import { ContractRunner, Signer } from "ethers";

export type { AssetHubManagerInfo } from "@creator-network/indexer-js";

export interface AssetContractRunner extends ContractRunner {
  isMulti?: boolean
  getAddress(): Promise<string>;
}

export type HubInfoContextData = {
  contractRunner?: AssetContractRunner;
  setContractRunner: (cr?: AssetContractRunner) => void;

  assetHubManager?: LiteAssetHubManager;
  hubManagerInfo?: AssetHubManagerInfo;
};

export const HubInfoContext = createContext<HubInfoContextData>({} as never);

export type HubInfoProviderProps = {
  signer: Signer;
  children?: React.ReactNode;
};

export function HubInfoProvider(props: HubInfoProviderProps) {
  const [hubManager, setHubManager] = useState<LiteAssetHubManager>();
  const [hubManagerInfo, setHubManagerInfo] = useState<AssetHubManagerInfo>();
  const [_contractRunner, setContractRunner] = useState<AssetContractRunner>();

  const contractRunner = useMemo(() => {
    if (_contractRunner) {
      return _contractRunner;
    }
    return props.signer;
  }, [_contractRunner, props.signer])

  const value = {
    contractRunner, setContractRunner,
    assetHubManager: hubManager,
    hubManagerInfo,
  };

  const { data } = useGetHubManager();
  useEffect(() => {
    if (data && contractRunner?.provider) {
      setHubManager(NewAssetHubManager(contractRunner, data.id));
    } else {
      setHubManager(undefined);
    }
    setHubManagerInfo(data);
  }, [contractRunner, data]);

  return (
    <HubInfoContext.Provider
      value={value}
      children={props.children}
    ></HubInfoContext.Provider>
  );
}

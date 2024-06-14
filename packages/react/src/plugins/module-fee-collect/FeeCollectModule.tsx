import { FeeCollectModuleItem } from "./components/FeeCollectModuleItem";
import { FeeConfig, parseFeeInitData } from "./parsedata";
import { ZeroAddress, formatEther } from "ethers";
import { useAssetHub } from "../../context";
import { AddressLink } from "../../components";
import { Asset, AssetModule, EtherAddress } from "@creator-network/core";
import { CollectModuleInputProps, ICollectModule, UseCollectModule } from "../../collect";
import { PayableOverrides } from "@creator-network/web3";
import { ReactElement, ReactNode } from "react";

export type FeeCollectViewProps = {
  config?: FeeConfig;
  publisher: EtherAddress;
}

function FeeCollectView({ config, publisher }: FeeCollectViewProps) {
  const recipient = config?.recipient === ZeroAddress ? publisher : config?.recipient;
  return <div className="my-1">
    Recipient:
    <AddressLink address={recipient} to="" className="mx-2" />
  </div>
}

function useFeeCollect(asset: Asset, collectModule: AssetModule): UseCollectModule {
  const { contractRunner, account } = useAssetHub();
  const data = parseFeeInitData(collectModule.initData);
  async function func(_: bigint, options: PayableOverrides) {
    if (data && contractRunner?.provider && account) {
      const balance = await contractRunner.provider.getBalance(account.address);
      const amount = data.amount;
      if (amount >= balance) {
        return false;
      }
      options.value = amount;
      return true;
    }
    return false;
  }
  return {
    beforeCollect: func,
    viewNode: <FeeCollectView config={data} publisher={asset.publisher} />,
    collectButtonText: data ? `Collect for ${formatEther(data.amount)} MATIC` : undefined
  };
}

export function FeeCollectModule(contract: EtherAddress, inputNode?: ReactElement<CollectModuleInputProps>): ICollectModule {
  return {
    moduleContract: contract,
    label: "Fee Collect",
    inputNode: inputNode ?? <FeeCollectModuleItem module={contract} />,
    useCollect: useFeeCollect,
  };
}

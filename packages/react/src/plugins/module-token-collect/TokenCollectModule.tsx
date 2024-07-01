import { useAssetHub } from "../../context";
import {
  Erc20Token,
  TokenCollectModuleItem,
} from "./components/TokenCollectModuleItem";
import { parseTokenCollectInitData } from "./parsedata";
import { TokenCollectView, NoBalanceText } from "./components/TokenCollectView";
import { formatEther } from "ethers";
import { Asset, AssetModule, EtherAddress } from "@creator-network/core";
import { CollectModuleInputProps, ICollectModule, UseCollectModule } from "../../collect";
import { NewERC20 } from "@creator-network/web3";
import { ReactElement } from "react";

function useTokenCollect(
  asset: Asset,
  collectModule: AssetModule,
  tokens: Erc20Token[]
): UseCollectModule {
  const { contractRunner, account } = useAssetHub();
  const data = parseTokenCollectInitData(collectModule.initData);
  const tokenInfo = tokens.find((t) => t.contract === data?.currency);
  const amount = data?.amount ?? 0;
  async function func() {
    if (data && contractRunner?.provider && account) {
      const token = NewERC20(contractRunner, data.currency);
      const allowance = await token.allowance(
        await contractRunner.getAddress(),
        collectModule.module
      );
      if (allowance < amount) {
        const tx = await token.approve(collectModule.module, amount);
        await tx.wait();
      }
      return true;
    }
    return false;
  }
  return {
    beforeCollect: func,
    viewNode: data && <TokenCollectView config={data} tokenInfo={tokenInfo} publisher={asset.publisher} />,
    collectButtonText: data && `Collect for ${formatEther(data.amount)} ${tokenInfo?.name ? "$" + tokenInfo.name : "Token"
      }`,
    errorText: data && <NoBalanceText config={data} />,
  };
}

export type TokenCollectModuleOptions = {
  moduleContract: EtherAddress;
  tokens: Erc20Token[];
  input?: ReactElement<CollectModuleInputProps>;
};

export function TokenCollectModule(
  opts: TokenCollectModuleOptions
): ICollectModule {
  return {
    moduleContract: opts.moduleContract,
    label: "Collect for Token",
    inputNode: (opts.input ??
      <TokenCollectModuleItem
        module={opts.moduleContract}
        tokens={opts.tokens}
      />
    ),
    useCollect: (asset, module) => useTokenCollect(asset, module, opts.tokens),
  };
}

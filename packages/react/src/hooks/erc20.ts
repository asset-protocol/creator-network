import { NewERC20 } from "@creator-network/web3";
import { useAssetHub } from "../context";
import { ZeroAddress, parseEther } from "ethers";
import { useCallback } from "react";

export function useERC20BalanceOf(contract: string) {
  const { contractRunner } = useAssetHub();
  const balanceOf = useCallback((account: string) => {
    let erc20;
    if (contract && contract !== ZeroAddress) {
      erc20 = NewERC20(contractRunner!, contract);
    }
    if (erc20 === undefined) return Promise.resolve(undefined);
    return erc20.balanceOf(account);
  }, [contract, contractRunner]);
  return balanceOf;
}

export function useHubERC20Approve() {
  const { contractRunner, hubManagerInfo } = useAssetHub();
  const approve = useCallback(async (contract: string, amount: bigint) => {
    console.log("erc20", contract);
    if (contractRunner?.provider && amount > 0n && hubManagerInfo) {
      const token = NewERC20(contractRunner, contract);
      const allowance = await token.allowance(
        await contractRunner.getAddress(),
        hubManagerInfo.globalModule
      );
      if (allowance < amount) {
        const tx = await token.approve(hubManagerInfo.globalModule, parseEther("999999999"));
        await tx.wait();
      }
      return true;
    }
    return false;
  }, [contractRunner])

  return { approve };

}
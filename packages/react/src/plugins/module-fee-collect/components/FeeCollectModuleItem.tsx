import { useEffect, useMemo, useState } from "react";
import { encodeFeeInitData, parseFeeInitData } from "../parsedata";
import { ZeroAddress, formatEther, parseEther } from "ethers";
import { AddressLink } from "../../../components";
import { useAssetHub } from "../../../context";
import { CollectModuleContentProps } from "../../../collect";

export function FeeCollectModuleItem(props: CollectModuleContentProps) {
  const { account, contractRunner, chain } = useAssetHub();
  const data = useMemo(() => parseFeeInitData(props.value), [props.value]);
  const [amount, setAmount] = useState<string | null>(
    data?.amount ? formatEther(data.amount) : null
  );
  useEffect(() => {
    const recipient = data?.recipient ?? ZeroAddress;
    if (amount) {
      const initData = encodeFeeInitData({
        recipient,
        amount: parseEther(amount.toString()),
      });
      props.onChange?.(initData);
    } else {
      props.onChange?.(undefined);
    }
  }, [amount]);

  return (
    <div>
      <div className="flex flex-wrap items-center mt-2">
        <label className="input input-bordered flex items-center gap-2 w-[100px]">
          <span className="w-[64px]">Token</span>
          <input
            type="number"
            className="grow max-w-[120px]"
            placeholder="Amount"
            min={"0"}
            defaultValue={amount ?? ""}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="w-[64px]">{chain.nativeCurrency.symbol}</span>
        </label>
      </div>
      Funds will be sent to
      <AddressLink
        address={
          !data?.recipient || data.recipient === ZeroAddress
            ? account?.address
            : data.recipient
        }
      />
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { ZeroAddress, formatEther, parseEther } from "ethers";
import { CollectModuleContentProps } from "@creator-network/react/collect";
import { useAssetHub } from "@creator-network/react";
import { AddressLink } from "@/app/_components/address/AddressLink";
import { encodeFeeInitData, parseFeeInitData } from "@creator-network/react/plugins/module-fee-collect";
import { InputNumber } from "antd";

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
    <div className="flex flex-col">
      <InputNumber
        placeholder="Amount"
        addonBefore="Token"
        addonAfter={chain.nativeCurrency.symbol}
        defaultValue={amount ?? ""}
        min={"0"}
        onChange={e => setAmount(e)}
      />
      <span>Funds will be sent to
        <AddressLink
          address={
            !data?.recipient || data.recipient === ZeroAddress
              ? account?.address
              : data.recipient
          }
        /></span>
    </div>
  );
}

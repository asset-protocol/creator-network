import { useEffect, useMemo, useState } from "react";
import { encodeFeeInitData, parseFeeInitData } from "../parsedata";
import { ZeroAddress, formatEther, parseEther } from "ethers";
import { AddressLink } from "../../../components";
import { useAssetHub } from "../../../context";
import { CollectModuleContentProps } from "../../../collect";

export function FeeCollectModuleItem(props: CollectModuleContentProps) {
  const { account, contractRunner } = useAssetHub();
  const data = useMemo(() => parseFeeInitData(props.value), [props.value]);
  const [amount, setAmount] = useState<string | null>(
    data?.amount ? formatEther(data.amount) : null
  );
  contractRunner?.provider?.getNetwork().then((network) => {
    console.log(network);
    network.name;
  });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <div>
      <div className="flex flex-wrap items-center mt-2">
        <label className="input input-bordered flex items-center gap-2 w-[100px]">
          <span className="w-[64px]">Token</span>
          <input
            type="number"
            className="grow"
            placeholder="Amount"
            min={"0"}
            defaultValue={amount ?? ""}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="w-[64px]">MATIC</span>
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

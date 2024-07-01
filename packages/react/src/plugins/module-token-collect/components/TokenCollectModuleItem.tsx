import { useEffect, useMemo, useState } from "react";
import { ZeroAddress, formatEther, parseEther } from "ethers";
import { useAssetHub } from "../../../context";
import {
  encodeTokenCollectInitData,
  parseTokenCollectInitData,
} from "../parsedata";
import { CollectModuleContentProps } from "../../../collect";
import { NumberInput, Select } from "../../../ui";
import { AddressLink } from "../../../components";

export type Erc20Token = {
  label: string;
  name: string;
  contract: string;
};

export type TokenCollectModuleItemProps = CollectModuleContentProps & {
  tokens: Erc20Token[];
};

export function TokenCollectModuleItem(props: TokenCollectModuleItemProps) {
  const { account } = useAssetHub();
  const data = parseTokenCollectInitData(props.value);
  const tokenOptions = props.tokens.map((t) => ({
    label: t.label,
    value: t.contract,
  }));
  const [selectedToken, setSelectedToken] = useState<string | undefined>(
    data?.currency ?? tokenOptions[0]?.value
  );
  const [amount, setAmount] = useState<string | null>(
    data?.amount ? formatEther(data.amount) : "0"
  );

  const recipient = useMemo(() => {
    if (data?.recipient === ZeroAddress) {
      return account?.address;
    }
    return data?.recipient;
  }, [account, data]);

  useEffect(() => {
    const recipient = data?.recipient ?? ZeroAddress;
    if (recipient && selectedToken && amount) {
      const initData = encodeTokenCollectInitData({
        currency: selectedToken,
        recipient,
        amount: parseEther(amount.toString()),
      });
      props.onChange?.(initData);
    } else {
      props.onChange?.(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, selectedToken]);

  return (
    <div>
      <div className="flex flex-wrap items-center mt-2">
        <span className="w-[64px]">Token</span>
        <Select
          options={tokenOptions}
          style={{ width: 140 }}
          value={selectedToken}
          onChange={(t) => setSelectedToken(t.target.value)}
        ></Select>
        <NumberInput
          className="flex-1 ml-2 w-[100px]"
          placeholder="Amount"
          min={0}
          defaultValue={amount ?? 0}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      Funds will be sent to
      <AddressLink address={recipient} />
    </div>
  );
}

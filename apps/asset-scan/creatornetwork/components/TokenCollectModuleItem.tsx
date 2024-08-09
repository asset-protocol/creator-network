import { useEffect, useMemo, useState } from 'react';
import { ZeroAddress, formatEther, parseEther } from 'ethers';
import { useAssetHub } from '@creator-network/react';
import { CollectModuleContentProps } from '@creator-network/react/collect';
import {
  encodeTokenCollectInitData,
  parseTokenCollectInitData,
} from '@creator-network/react/plugins/module-token-collect';
import { InputNumber, Select } from 'antd';
import { AddressLink } from '@/components/address/AddressLink';

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
    key: t.contract,
  }));
  const [selectedToken, setSelectedToken] = useState<string | undefined>(
    data?.currency ?? tokenOptions[0]?.value
  );
  const [amount, setAmount] = useState<string | null>(
    data?.amount ? formatEther(data.amount) : '0'
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
      <div className="flex items-center mt-2 gap-2">
        <Select
          options={tokenOptions}
          style={{ width: 140 }}
          value={selectedToken}
          onChange={(v) => setSelectedToken(v)}
        ></Select>
        <InputNumber
          placeholder="Amount"
          className="flex-1"
          min={'0'}
          addonAfter={
            props.tokens.find((t) => t.contract === selectedToken)?.name
          }
          defaultValue={amount ?? '0'}
          onChange={(v) => setAmount(v)}
        />
      </div>
      Funds will be sent to
      <AddressLink address={recipient} />
    </div>
  );
}

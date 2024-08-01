'use client';

import { useEffect, useState } from 'react';
import SafeApiKit from '@safe-global/api-kit';
import Safe, { SafeProvider, Eip1193Provider } from '@safe-global/protocol-kit';
import { AssetContractRunner, useAssetHub } from '@creator-network/react';
import { AddressLink } from '../address/AddressLink';
import { Button, Skeleton } from 'antd';
import { Signer, ethers } from 'ethers';
import { useEthersSigner } from '@/creatornetwork/ether';
import { useApp } from '../_layout/AppContext';
import { Config, useAccount, useConnectorClient } from 'wagmi';
import { AssetHubInfo } from '@creator-network/core';
import { indexerClient } from '@/creatornetwork';
import { StudioSelectItem } from './AccountSwitch';
import Link from 'next/link';
import { ArrowRightLeft, CircleCheck } from 'lucide-react';
import useToken from 'antd/es/theme/useToken';

export class SafeSigner implements Required<AssetContractRunner> {
  constructor(
    private safe: Safe,
    private chainId: number,
    private signer: Signer
  ) {}

  get provider() {
    return this.signer.provider;
  }

  getAddress(): Promise<string> {
    return this.safe.getAddress();
  }

  estimateGas(tx: ethers.TransactionRequest): Promise<bigint> {
    return this.signer.estimateGas(tx);
  }

  async call(tx: ethers.TransactionRequest): Promise<string> {
    return this.safe.getSafeProvider().call({
      to: tx.to!.toString(),
      from: tx.from?.toString() ?? (await this.safe.getAddress()),
      data: tx.data!,
      value: tx.value?.toString(),
      gasLimit: tx.gasLimit?.toString(),
      gasPrice: tx.gasPrice?.toString(),
      maxFeePerGas: tx.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString(),
    });
  }

  resolveName(name: string): Promise<string | null> {
    return this.signer.resolveName(name);
  }

  async sendTransaction(
    tx: ethers.TransactionRequest
  ): Promise<ethers.TransactionResponse> {
    const safeTx = await this.safe.createTransaction({
      transactions: [
        {
          to: tx.to!.toString(),
          value: tx.value?.toString() ?? '0',
          data: tx.data ?? '0x',
        },
      ],
    });
    const safeTxhash = await this.safe.getTransactionHash(safeTx);
    const txSign = await this.safe.signHash(safeTxhash);
    const apiKit = new SafeApiKit({
      chainId: BigInt(this.chainId), // set the correct chainId
    });
    await apiKit.proposeTransaction({
      safeAddress: await this.safe.getAddress(),
      safeTransactionData: safeTx.data,
      safeTxHash: safeTxhash,
      senderAddress: await this.signer.getAddress(),
      senderSignature: txSign.data,
    });
    const res = await apiKit.getTransaction(safeTxhash);
    return new ethers.TransactionResponse(
      { ...res, hash: safeTxhash } as any,
      this.provider!
    );
  }
}

export type SafeAddressListProps = {};

export type SafeItem = {
  safeAddress: string;
  studios: AssetHubInfo[];
};

export function SafeAddressList(props: SafeAddressListProps) {
  const [safeItems, setSafeItems] = useState<SafeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { chain } = useAssetHub();
  const { setContractRunner, setAccount, account } = useApp();
  const { address } = useAccount();
  const [_, token] = useToken();

  const signer = useEthersSigner();
  const { data: client } = useConnectorClient<Config>();

  const fetchData = async () => {
    SafeProvider;
    let data: SafeItem[] = [];
    if (address) {
      const apiKit = new SafeApiKit({
        chainId: BigInt(chain.id), // set the correct chainId
      });
      const res = await apiKit.getSafesByOwner(address);
      if (res.safes.length > 0) {
        const hubs = await indexerClient().assetHubs.fetchAssetHubs(res.safes);
        data = res.safes.map((sa) => ({
          safeAddress: sa,
          studios: hubs.filter((h) => h.admin === sa),
        }));
      }
    }
    return data;
  };

  useEffect(() => {
    if (address) {
      setLoading(true);
      fetchData().then((res) => {
        setSafeItems(res);
        setLoading(false);
      });
    }
  }, [address, chain]);

  const handleSelectSafe = async (safeAddress: string) => {
    if (!signer || !client) {
      throw new Error('Safe init error');
    }
    if (safeAddress === account?.address) {
      return;
    }
    // Create Safe instance
    const protocolKit = await Safe.init({
      provider: client.transport,
      safeAddress: safeAddress,
    });
    const rn = new SafeSigner(protocolKit, chain.id, signer);
    setAccount({ address: safeAddress, isSafe: true });
    setContractRunner(rn);
  };

  const handleSafeStudio = async (studio: AssetHubInfo) => {
    if (!signer || !client) {
      throw new Error('Safe init error');
    }
    // Create Safe instance
    const protocolKit = await Safe.init({
      provider: client.transport,
      safeAddress: studio.admin,
    });
    const rn = new SafeSigner(protocolKit, chain.id, signer);
    setAccount({
      ...account,
      isSafe: true,
      address: studio.admin,
      studio: studio.id,
      studioAvatar: studio.metadata?.image,
      studioName: studio.name,
    });
    setContractRunner(rn);
  };

  return (
    <div>
      {loading ? (
        <Skeleton.Input active />
      ) : safeItems.length > 0 ? (
        safeItems.map((a) => (
          <div key={a.safeAddress}>
            <div className="flex">
              <AddressLink address={a.safeAddress} className="flex-1" />
              <Button
                className="px-1"
                type="text"
                title="切换账号"
                onClick={() => handleSelectSafe(a.safeAddress)}
              >
                {account?.address === a.safeAddress ? (
                  <CircleCheck size={16} color={token.colorPrimary} />
                ) : (
                  <ArrowRightLeft size={16} />
                )}
              </Button>
            </div>
            {a.studios.length > 0 ? (
              <div>
                {a.studios.map((c) => (
                  <StudioSelectItem
                    key={c.id}
                    studio={c}
                    onSelect={handleSafeStudio}
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 ml-2">
                暂无工作室，去
                <Button type="link" className="px-1 text-sm">
                  <Link href="/studio/create">创建</Link>
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <span className="ml-4 text-gray-500 text-sm">
          未找到 Safe 多签钱包, 去
          <Link
            href="https://app.safe.global"
            target="_blank"
            className="text-primary"
          >
            {' 申请'}
          </Link>
          .
        </span>
      )}
    </div>
  );
}

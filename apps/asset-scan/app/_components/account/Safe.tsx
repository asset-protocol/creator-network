'use client';

import { useEffect, useState } from 'react';
import SafeApiKit from '@safe-global/api-kit';
import Safe from '@safe-global/protocol-kit';
import { AssetContractRunner, useAssetHub } from '@creator-network/react';
import { AddressLink } from '../address/AddressLink';
import { Button, Skeleton } from 'antd';
import { Signer, ethers } from 'ethers';
import { useEthersSigner } from '@/app/_creatornetwork/ether';
import { useApp } from '../_layout/AppContext';
import { Config, useAccount, useConnectorClient } from 'wagmi';
import { AssetHubInfo } from '@creator-network/core';
import { indexerClient } from '@/app/_creatornetwork';
import { ChannelSelectItem } from './AccountSwitch';
import Link from 'next/link';
import { ArrowRightLeft, CircleCheck } from 'lucide-react';
import useToken from 'antd/es/theme/useToken';

export class SafeSigner implements Required<AssetContractRunner> {
  isMulti: boolean = true;

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

  call(tx: ethers.TransactionRequest): Promise<string> {
    return this.signer.call(tx);
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
  channels: AssetHubInfo[];
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
          channels: hubs.filter((h) => h.admin === sa),
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
    setAccount({ address: safeAddress });
    setContractRunner(rn);
  };

  const handleSafeChannel = async (channel: AssetHubInfo) => {
    if (!signer || !client) {
      throw new Error('Safe init error');
    }
    // Create Safe instance
    const protocolKit = await Safe.init({
      provider: client.transport,
      safeAddress: channel.admin,
    });
    const rn = new SafeSigner(protocolKit, chain.id, signer);
    setAccount({
      address: channel.admin,
      studio: channel.id,
      studioAvatar: channel.metadata?.image,
      studioName: channel.name,
    });
    setContractRunner(rn);
  };

  return (
    <div>
      {loading ? (
        <Skeleton.Input active />
      ) : safeItems.length > 0 ? (
        safeItems.map((a) => (
          <div>
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
            {a.channels.length > 0 ? (
              <div>
                {a.channels.map((c) => (
                  <ChannelSelectItem channel={c} onSelect={handleSafeChannel} />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 ml-2">
                暂无频道，去
                <Button type="link" className="px-1 text-sm">
                  <Link href="/channel/create">创建</Link>
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <Link
          href="https://app.safe.global"
          target="_blank"
          className="mx-auto"
        >
          Create Safe Wallet
        </Link>
      )}
    </div>
  );
}

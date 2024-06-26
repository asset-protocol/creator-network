'use client';
import { Avatar, Divider } from 'antd';
import { BookText, Check, User2Icon } from 'lucide-react';
import { AddressLink, formatAddress } from '../address/AddressLink';
import { indexerClient } from '@/app/_creatornetwork';
import { useEffect, useState } from 'react';
import { AssetHubInfo, replaceUri } from '@creator-network/core';
import { useApp } from '../_layout/AppContext';
import { SafeAddressList } from './Safe';
import { useAccount } from 'wagmi';
import { useEthersSigner } from '@/app/_creatornetwork/ether';

export function AccountSwitch() {
  const { account } = useApp();
  return (
    account && (
      <div>
        {account.studio ? (
          <div className="flex items-center gap-2 text-sm">
            <Avatar
              size={32}
              src={replaceUri(account.studioAvatar)}
              icon={!account.studioAvatar && <User2Icon />}
            />
            <div>
              <div>{account.studioName}</div>
              <div>{formatAddress(account.studio)}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-500">Not Set Channel</span>
        )}
        <WalletChannelList />
        <Divider className="bg-gray-200 my-2 py-[1px]" />
        <div className="font-semibold py-2">{'Safe{Wallet} Channels'}</div>
        <SafeAddressList />
      </div>
    )
  );
}

export type ChannelSelectItem = {
  channel: AssetHubInfo;
  onSelect?: (channel: AssetHubInfo) => void;
};

export function ChannelSelectItem({ channel, onSelect }: ChannelSelectItem) {
  const { account, setAccount } = useApp();

  const handleSelectChannel = () => {
    if (onSelect) {
      onSelect(channel);
    } else {
      setAccount({
        address: channel.admin,
        studio: channel.id,
        studioAvatar: channel.metadata?.image,
        studioName: channel.name,
      });
    }
  };

  return (
    <div
      className="flex cursor-pointer gap-2 py-2 px-2 hover:bg-gray-200 items-center"
      onClick={handleSelectChannel}
    >
      <Avatar
        src={replaceUri(channel.metadata?.image)}
        icon={!channel.metadata && <BookText className="p-[2px]" />}
      />
      <div className="flex flex-col gap-1 flex-1">
        <div>{channel.name}</div>
        <AddressLink address={channel.id} splitNum={6} splitNum2={4} />
      </div>
      {account?.studio === channel.id && <Check className="text-primary" />}
    </div>
  );
}

export function WalletChannelList() {
  const { address } = useAccount();
  const { setAccount, setContractRunner } = useApp();
  const signer = useEthersSigner();
  const [channels, setChannels] = useState<AssetHubInfo[]>([]);

  const handleSelect = (c: AssetHubInfo) => {
    setAccount({
      address: c.admin,
      studio: c.id,
      studioAvatar: c.metadata?.image,
      studioName: c.name,
    });
    setContractRunner(signer);
  };

  useEffect(() => {
    if (address) {
      indexerClient()
        .assetHubs.fetchAssetHubs([address])
        .then((res) => setChannels(res));
    } else {
      setChannels([]);
    }
  }, [address]);

  return (
    channels.length > 0 && (
      <div>
        <Divider className="bg-gray-600 my-2" />
        <div className="font-semibold">Wallet Channels</div>
        {channels.map((c) => (
          <ChannelSelectItem
            key={c.id}
            channel={c}
            onSelect={() => handleSelect(c)}
          />
        ))}
      </div>
    )
  );
}

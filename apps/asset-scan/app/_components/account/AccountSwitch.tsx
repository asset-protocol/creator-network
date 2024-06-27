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
          <span className="text-gray-500">Not Set Studio</span>
        )}
        <WalletStudioList />
        <Divider className="bg-gray-200 my-2 py-[1px]" />
        <div className="font-semibold py-2">{'Safe{Wallet} Studios'}</div>
        <SafeAddressList />
      </div>
    )
  );
}

export type StudioSelectItem = {
  studio: AssetHubInfo;
  onSelect?: (studio: AssetHubInfo) => void;
};

export function StudioSelectItem({ studio, onSelect }: StudioSelectItem) {
  const { account, setAccount } = useApp();

  const handleSelectStudio = () => {
    if (onSelect) {
      onSelect(studio);
    } else {
      setAccount({
        address: studio.admin,
        studio: studio.id,
        studioAvatar: studio.metadata?.image,
        studioName: studio.name,
      });
    }
  };

  return (
    <div
      className="flex cursor-pointer gap-2 py-2 px-2 hover:bg-gray-200 items-center"
      onClick={handleSelectStudio}
    >
      <Avatar
        src={replaceUri(studio.metadata?.image)}
        icon={!studio.metadata && <BookText className="p-[2px]" />}
      />
      <div className="flex flex-col gap-1 flex-1">
        <div>{studio.name}</div>
        <AddressLink address={studio.id} splitNum={6} splitNum2={4} />
      </div>
      {account?.studio === studio.id && <Check className="text-primary" />}
    </div>
  );
}

export function WalletStudioList() {
  const { address } = useAccount();
  const { setAccount, setContractRunner } = useApp();
  const signer = useEthersSigner();
  const [studios, setStudios] = useState<AssetHubInfo[]>([]);

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
        .then((res) => setStudios(res));
    } else {
      setStudios([]);
    }
  }, [address]);

  return (
    studios.length > 0 && (
      <div>
        <Divider className="bg-gray-600 my-2" />
        <div className="font-semibold">Wallet Studios</div>
        {studios.map((c) => (
          <StudioSelectItem
            key={c.id}
            studio={c}
            onSelect={() => handleSelect(c)}
          />
        ))}
      </div>
    )
  );
}

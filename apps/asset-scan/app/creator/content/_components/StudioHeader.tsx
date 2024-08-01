'use client';
import { useApp } from '@/components/_layout/AppContext';
import { AddressLink } from '@/components/address/AddressLink';
import { replaceUri } from '@creator-network/core';
import Image from 'next/image';

export function StudioHeader({ className }: { className?: string }) {
  const { account } = useApp();
  if (!account?.studio) {
    return null;
  }
  return (
    <div className={className}>
      <Image
        src={replaceUri(account?.studioAvatar) ?? ''}
        alt={account.studio}
        width={100}
        height={100}
      />
      <h1 className="text-lg font-semibold">{account.studioName}</h1>
      <AddressLink address={account.studio} splitNum={6} splitNum2={4}/>
    </div>
  );
}

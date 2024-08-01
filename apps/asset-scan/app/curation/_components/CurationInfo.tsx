import { AddressLink } from '@/components/address/AddressLink';
import { StudioAvatar } from '@/components/studio/StudioAvatar';
import { replaceUri } from '@creator-network/core';
import { Curation } from '@creator-network/indexer-js';
import { fromNow } from '@creator-network/react/utils';
import { Avatar, Divider } from 'antd';
import clsx from 'clsx';
import { CalendarDaysIcon, Package2, WalletIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CurationAuthorPanel(props: {
  curation: Curation;
  className?: string;
}) {
  const { curation, className } = props;
  return (
    <div className={clsx('flex items-center text-gray-500', className)}>
      <StudioAvatar hub={curation.hub}/>
      <Divider type="vertical" className=" bg-gray-400 w-[2px]" />
      <CalendarDaysIcon size={20} className="mx-1" />
      <div>{fromNow(Number.parseFloat(curation.timestamp))}</div>
      <Divider type="vertical" className=" bg-gray-400 w-[2px]" />
      <Package2 size={20} className="mx-1" />
      <div>{curation.assets.length} Assets</div>
    </div>
  );
}

export function CurationInfo(props: {
  curation: Curation;
  className?: string;
}) {
  const { curation, className } = props;
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <h1 className="text-2xl">{curation.name}</h1>
      <CurationAuthorPanel curation={curation} />
      <div className="flex-1 flex items-center text-gray-500">
        {curation.description}
      </div>
      {curation.externalUrl && (
        <Link target="_blank" href={curation.externalUrl}>
          {curation.externalUrl}
        </Link>
      )}
    </div>
  );
}

export function CurationItem(props: {
  curation: Curation;
  className?: string;
}) {
  const { curation, className } = props;
  return (
    <div className={clsx('flex items-stretch gap-4', className)}>
      <Image
        src={replaceUri(curation.image) ?? ''}
        alt={curation.name}
        width={480}
        height={480}
        className="aspect-[2/1] flex-1 rounded-xl font-semibold overflow-hidden min-w-[300px]"
      ></Image>
      <CurationInfo curation={curation} className="min-w-[300px] flex-1" />
    </div>
  );
}

import { indexerClient } from '@/app/_creatornetwork';
import { fetchCurations } from '@/app/curation/_components/api';
import { AssetHubInfo, replaceUri } from '@creator-network/core';
import { Curation } from '@creator-network/indexer-js';
import clsx from 'clsx';
import { Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function StudioCurationList({ studio }: { studio: AssetHubInfo }) {
  const manager = await indexerClient().manager.fetchHubManager();
  const res = await fetchCurations(manager.curation, studio.id);
  return (
    <div className="grid grid-cols-3 gap-6">
      {res.map((c) => (
        <StudioCurationItem key={c.id} curation={c} className="flex-col" />
      ))}
    </div>
  );
}

export function StudioCurationItem(props: {
  curation: Curation;
  className?: string;
}) {
  const { curation, className } = props;
  return (
    <div className={clsx('flex flex-col items-stretch gap-4', className)}>
      <Link href={`/curation/${curation.id}`}>
        <Image
          src={replaceUri(curation.image) ?? ''}
          alt={curation.name}
          width={480}
          height={240}
          className="aspect-[2/1] flex-1 rounded-xl font-semibold overflow-hidden min-w-[300px]"
        ></Image>
      </Link>
      <div className={clsx('flex flex-col gap-2', className)}>
        <Link href={`/curation/${curation.id}`}>
          <h1 className="text-lg font-semibold">{curation.name}</h1>
        </Link>
        <div className="flex-1 flex items-center text-gray-500">
          {curation.description}
        </div>
        {curation.externalUrl && (
          <LinkIcon target="_blank" href={curation.externalUrl}>
            {curation.externalUrl}
          </LinkIcon>
        )}
      </div>
    </div>
  );
}

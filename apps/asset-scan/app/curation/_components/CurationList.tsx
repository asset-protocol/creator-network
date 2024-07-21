import { replaceUri } from '@creator-network/core';
import { Curation } from '@creator-network/indexer-js';
import Image from 'next/image';
import { fetchCurations } from './api';
import Link, { LinkProps } from 'next/link';
import { CurationAuthorPanel } from './CurationInfo';
import { indexerClient } from '@/app/_creatornetwork';
import { notFound } from 'next/navigation';
import { HtmlHTMLAttributes } from 'react';

export async function CurationList() {
  const manager = await indexerClient().manager.fetchHubManager();
  if (!manager.curation) {
    notFound();
  }
  const curations = await fetchCurations(manager.curation);
  return (
    <div className="flex flex-col gap-6">
      {curations.map((c, i) => (
        <CurationListItem key={c.id} curation={c} reverse={i % 2 === 0} />
      ))}
    </div>
  );
}
export type CurationLinkProps = {
  curationId: string;
  externalUrl?: string;
  children?: React.ReactNode;
} & HtmlHTMLAttributes<HTMLAnchorElement>;
export function CurationLink({
  curationId,
  externalUrl,
  children,
  ...resProps
}: CurationLinkProps) {
  const des = externalUrl || `/curation/${curationId}`;
  const target = externalUrl ? '_blank' : undefined;
  return (
    <Link {...resProps} href={des} target={target}>
      {children}
    </Link>
  );
}

export function CurationListItem({
  curation,
  reverse,
}: {
  curation: Curation;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex${reverse ? ' flex-row-reverse' : ''} items-stretch gap-6 h-auto overflow-auto`}
    >
      <div className="flex flex-col flex-1 gap-2 py-8">
        <CurationLink
          externalUrl={curation.externalUrl}
          curationId={curation.id}
        >
          <h1 className="font-semibold line-clamp-3 text-xl">
            {curation.name}
          </h1>
        </CurationLink>
        <CurationAuthorPanel curation={curation} />
        <CurationLink
          curationId={curation.id}
          externalUrl={curation.externalUrl}
          className="flex-1 flex items-center text-gray-500"
        >
          {curation.description}
        </CurationLink>
      </div>
      <CurationLink
        curationId={curation.id}
        externalUrl={curation.externalUrl}
        className="relative aspect-[2/1] flex-1 flex my-2"
      >
        <div className="absolute t-0 l-0 bg-[#DFF1F0] w-[50%] h-[50%] rounded-xl"></div>
        <div className="flex-1 pt-6 pl-6 z-10 ">
          <Image
            width={400}
            height={200}
            alt={curation.name}
            src={replaceUri(curation.image) ?? ''}
            className="w-full h-full rounded-xl overflow-hidden"
          ></Image>
        </div>
      </CurationLink>
    </div>
  );
}

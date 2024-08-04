import { notFound } from 'next/navigation';
import Image from 'next/image';
import { replaceUri } from '@creator-network/core';
import { CurationTabs } from './_components/CurationTabs';
import { fetchCurationById } from '@/app/curation/_components/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ({
  params,
  children,
}: {
  params: { id: string };
  children?: React.ReactNode;
}) {
  const curation = await fetchCurationById(params.id);
  if (!curation) {
    notFound();
  }

  return (
    <div className="flex gap-6 mt-4">
      <div className="flex flex-col gap-4 w-[240px] ml-4 mr-2">
        <Link href={`/creator/studio/content/curations`}>
          <div className="w-full flex hover:bg-gray-100 px-2 py-2 rounded-lg">
            <ArrowLeft />
            <span className="ml-2 flex-1">Studio Content</span>
          </div>
        </Link>
        <Image
          src={replaceUri(curation.image) ?? ''}
          width={200}
          height={100}
          className="aspect-[2/1] rounded-xl w-full"
          alt={curation.name}
        />
        <div className="line-clamp-2 font-semibold">{curation.name}</div>
        <div className="line-clamp-3 text-gray-500 text-sm">
          {curation.description}
        </div>
        <CurationTabs curationId={curation.id} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

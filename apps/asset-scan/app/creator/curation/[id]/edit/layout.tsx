import { notFound } from 'next/navigation';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Package2 } from 'lucide-react';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { replaceUri } from '@creator-network/core';
import { fetchCurationById } from '@/app/curation/_components/api';
import { CurationTabs } from './_components/CurationTabs';

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
    <div className="max-w-[1280px] mx-auto flex gap-6 mt-10">
      <div className="max-w-[260px] flex flex-col gap-4">
        <Image
          src={replaceUri(curation.image) ?? ''}
          width={200}
          height={100}
          className="aspect-[2/1] rounded-xl w-full"
          alt={curation.name}
        />
        <div className="line-clamp-2 font-semibold">{curation.name}</div>
        <div className="line-clamp-3 text-gray-500 text-sm">
          {curation.name}
        </div>
        <CurationTabs curationId={curation.id} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

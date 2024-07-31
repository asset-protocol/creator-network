import { notFound } from 'next/navigation';
import { fetchStudioByNameOrId } from './fetch';
import Image from 'next/image';
import { replaceUri } from '@creator-network/core';
import { StudioTabs } from './_components/StudioTabs';

export default async function ({
  params,
  children,
}: {
  params: { name: string };
  children?: React.ReactNode;
}) {
  const studio = await fetchStudioByNameOrId(params.name);
  if (!studio) {
    notFound();
  }

  return (
    <div>
      <div className="px-[20px] w-full bg-[#F2F8F7] max-h-[880px] overflow-hidden">
        <div className="max-w-[1080px] mx-auto my-10 flex gap-4 flex-wrap-reverse">
          <Image
            src={replaceUri(studio.metadata?.image) ?? ''}
            alt={studio.name}
            width={200}
            height={200}
            className="w-[200px] h-[200px] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold line-clamp-2">
                {studio.metadata?.name ?? studio.name}
              </h1>
              <div className="text-gray-500">@{studio.name}</div>
            </div>
            <p className="text-gray-500 line-clamp-6">
              {studio.metadata?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1080px] mx-auto my-10">
        <StudioTabs />
        {children}
      </div>
    </div>
  );
}

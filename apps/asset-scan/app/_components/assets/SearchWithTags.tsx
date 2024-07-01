import { indexerClient } from '@/app/_creatornetwork';

export async function SearchWithTags() {
  const tags = await indexerClient().assets.fetchAssetTags(undefined, 10);

  return (
    <div className="flex flex-wrap gap-2 pr-6">
      {tags.map((t) => (
        <div
          key={t.name}
          className="badge badge-outline rounded-sm border-gray-300 px-4 py-4 text-gray-600"
        >
          {t.name}
        </div>
      ))}
    </div>
  );
}

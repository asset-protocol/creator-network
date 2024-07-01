import { AssetEditor } from '@/app/_components/assets/AssetEdtor';

export default function Page({
  searchParams,
}: {
  searchParams: { hub?: string };
}) {
  const { hub } = searchParams;

  return (
    <div className="max-w-[920px] mx-auto">
      <AssetEditor />
    </div>
  );
}

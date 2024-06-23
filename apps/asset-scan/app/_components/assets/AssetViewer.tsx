'use client';
import {
  AssetViewer,
  AssetViewerProps,
} from '@creator-network/react/asset/viewer';

export function AssetClientViewer(props: AssetViewerProps) {
  return (
    <div className="pt-6 flex w-full">
      <AssetViewer {...props} />
    </div>
  );
}

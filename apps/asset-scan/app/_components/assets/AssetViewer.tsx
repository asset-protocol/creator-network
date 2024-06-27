'use client';
import { creatorNetwork } from '@creator-network/core';
import { getAssetViewer } from '@creator-network/react/asset';
import { AssetViewerProps } from '@creator-network/react/asset/viewer';
import { richtextViewer } from '@creator-network/react/plugins/asset-richtext';
import { RichtextEditor } from './RichEditor';

creatorNetwork.use(
  richtextViewer({ viewer: (props: any) => <RichtextEditor {...props} /> })
);

export function AssetClientViewer(props: AssetViewerProps) {
  const { asset, viewerAttributes } = props;

  const ViewerSelector = asset && getAssetViewer(asset)?.viewer;
  return (
    <div className="pt-2 flex w-full">
      {asset
        ? ViewerSelector && (
            <ViewerSelector {...viewerAttributes} value={asset} />
          )
        : null}
    </div>
  );
}

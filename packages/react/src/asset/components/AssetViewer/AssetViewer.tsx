import { Asset } from "@creator-network/core";
import { getAssetViewer } from "../../asset";

export type AssetViewerProps = {
  asset: Asset;
  className?: string;
  viewerAttributes?: Record<string, unknown>;
};

export function AssetViewer(props: AssetViewerProps) {
  const { asset, viewerAttributes, ...resProps } = props;

  const ViewerSelector = asset && getAssetViewer(asset)?.viewer;
  return (
    <>
      {asset ? (
        ViewerSelector && (
          <ViewerSelector {...viewerAttributes} value={asset} />
        )
      ) : null}
    </>
  );
}

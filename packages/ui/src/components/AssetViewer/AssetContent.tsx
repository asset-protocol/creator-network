import { useViewer } from "../../hook/core";
import {
  AssetViewerProvider,
  AssetViewerProviderProps,
} from "./AssetViewerContext";
import { Asset } from "../..";

export type AssetContentProps = Omit<
  AssetViewerProviderProps,
  "asset" | "children"
> & {
  asset: Asset;
  className?: string;
  viewerAttributes?: Record<string, unknown>;
};

export function AssetContent(props: AssetContentProps) {
  const { asset, viewerAttributes, ...resProps } = props;
  const getViewer = useViewer();

  const ViewerSelector = asset && getViewer(asset).viewer;
  return (
    <>
      {asset ? (
        <AssetViewerProvider {...resProps} asset={asset} >
          {ViewerSelector && (
            <ViewerSelector {...viewerAttributes} value={asset} />
          )}
        </AssetViewerProvider>
      ) : null}
    </>
  );
}

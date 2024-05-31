import { Asset } from "@creator-network/core";
import { createContext, useContext } from "react";

export type AssetViewerProviderProps = AssetViewerContextData & {
  children: React.ReactNode;
};

export type AssetViewerContextData = {
  asset: Asset;
  onEdit?: (asset: Asset) => void;
  onRefresh?: (asset: Asset) => void;
  onCollected?: (tokenId: bigint) => void;
};

const AssetViewerContext = createContext<AssetViewerContextData>(
  {} as AssetViewerContextData
);

export function AssetViewerProvider(props: AssetViewerProviderProps) {
  const { children, ...res } = props;
  return (
    <AssetViewerContext.Provider
      value={res}
      children={children}
    ></AssetViewerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAssetViewer() {
  return useContext(AssetViewerContext);
}

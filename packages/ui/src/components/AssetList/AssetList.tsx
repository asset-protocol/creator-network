import { Asset } from "../..";
import { GetAssetHubAssetsInput, useGetAssets } from "../../client/indexer";
import { AssetItem } from "./AssetItem";
import List, { ListGridType } from "antd/es/list";

export type AssetListProps = {
  onAssetClick?: (asset: Asset) => void;
  grid?: ListGridType;
  classname?: string;
  itemClassName?: string;
  query?: GetAssetHubAssetsInput;
};

export function AssetList(props: AssetListProps) {
  console.log("AssetList ==== ", props);
  const { data, loading } = useGetAssets(props.query);
  return (
    <List
      className={props.classname}
      // pagination={{ position: "bottom", align: "center" }}
      grid={props.grid}
      loading={loading}
      dataSource={data?.assets}
      itemLayout="horizontal"
      rowKey={(item) => item.assetId}
      renderItem={(item) => (
        <List.Item
          colStyle={{ display: "flex", height: "100%" }}
          className="w-full"
        >
          <AssetItem
            value={item}
            key={item.assetId}
            onClick={(a) => props.onAssetClick?.(a)}
          />
        </List.Item>
      )}
    ></List>
  );
}

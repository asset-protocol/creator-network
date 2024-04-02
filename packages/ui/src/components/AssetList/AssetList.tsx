import 'virtual:uno.css'
import { Asset } from "../..";
import { useGetHubAssets } from "../../client/indexer";
import { AssetItem } from "./AssetItem";
import List, { ListGridType } from "antd/es/list";

export type AssetListProps = {
  onAssetClick?: (asset: Asset) => void;
  grid?: ListGridType;
  hub: string;
  classname?: string;
  itemClassName?: string;
};

export function AssetList(props: AssetListProps) {

  const { data, loading } = useGetHubAssets({
    hub: props.hub,
    first: 9999,
    fetchPolicy: "no-cache",
    orderBy: ["timestamp_DESC"],
  });
  console.log('data', data)
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


import { AssetItem } from './AssetItem';
import List, { ListGridType } from 'antd/es/list';
import { Asset } from '@creator-network/core';

export type AssetListProps = {
  assets: Asset[];
  loading?: boolean;
  onAssetClick?: (asset: Asset) => void;
  grid?: ListGridType;
  classname?: string;
  itemClassName?: string;
};

export function AssetList(props: AssetListProps) {
  return (
    <List
      className={props.classname}
      // pagination={{ position: "bottom", align: "center" }}
      grid={props.grid}
      loading={props.loading}
      dataSource={props.assets}
      itemLayout="horizontal"
      rowKey={(item) => item.id}
      renderItem={(item) => (
        <List.Item
          colStyle={{ display: 'flex', height: '100%' }}
          className="w-full"
        >
          <AssetItem value={item} />
        </List.Item>
      )}
    ></List>
  );
}

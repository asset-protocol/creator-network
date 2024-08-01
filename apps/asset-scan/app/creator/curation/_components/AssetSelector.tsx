'use client';

import { indexerClient } from '@/creatornetwork';
import { CloseOutlined } from '@ant-design/icons';
import { Asset, replaceUri } from '@creator-network/core';
import { useAssetHub } from '@creator-network/react';
import { Button, Checkbox, Divider, Input, List, Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export type AssetSelectorProps = {
  open?: boolean;
  onFinished?: (assets: Asset[]) => void | Promise<void>;
  onCancel?: () => void;
};
export function AssetSelector({
  onFinished,
  onCancel,
  ...resProps
}: AssetSelectorProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [search, setSearch] = useState<string>();
  const [selected, setSelected] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const resultHeader = useMemo(
    () => (search?.length ? '全站搜索结果' : '我的工作室'),
    [search]
  );

  const { account } = useAssetHub();

  const fetchData = async () => {
    setSearching(true);
    try {
      const args = {
        first: 20,
        hub: search ? undefined : account?.address,
        search,
      };
      const res = await indexerClient().assets.fetchAssets(args);
      setAssets(res.assets);
    } finally {
      setSearching(false);
    }
  };

  const handleItemSeleted = (v: boolean, a: Asset) => {
    console.log('handleItemSeleted', v, a);
    if (v) {
      setSelected([...selected, a]);
    } else {
      setSelected(selected.filter((s) => s.id !== a.id));
    }
  };

  const handleAddAssets = async () => {
    setLoading(true);
    try {
      await onFinished?.(selected);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [account?.studio]);

  return (
    <Modal
      {...resProps}
      destroyOnClose
      footer={null}
      title={
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">Add Assets</div>
          <div className="flex-1 flex justify-center">
            <Input
              className="max-w-[400px] mx-auto border-0 bg-gray-100 shadow-sm shaow-gray-300 focus:bg-gray-200"
              placeholder="输入关键字搜索资产"
              size="large"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={() => fetchData()}
            />
          </div>
          <Button
            className=""
            type="text"
            onClick={() => onCancel?.()}
            icon={<CloseOutlined />}
          ></Button>
        </div>
      }
      closeIcon={false}
      width={'50%'}
    >
      <div className="my-2 text-sm  text-gray-400">{resultHeader}</div>
      <Divider type="horizontal" className='h-[2px] bg-gray-100 my-2' />
      <List
        dataSource={assets}
        loading={searching}
        renderItem={(a) => (
          <AssetItem asset={a} onSelectChange={handleItemSeleted} />
        )}
        rowKey={(a) => a.id}
        split
        className="h-[500px] overflow-auto"
      />
      <div className="flex mt-4">
        <div className="flex-1"></div>
        <Button type="primary" loading={loading} onClick={handleAddAssets}>
          添加
        </Button>
      </div>
    </Modal>
  );
}

function AssetItem({
  asset,
  onSelectChange,
}: {
  asset: Asset;
  onSelectChange?: (v: boolean, asset: Asset) => void;
}) {
  return (
    <div className="flex gap-2 py-2 hover:bg-gray-100 px-2 rounded-lg">
      <Checkbox onChange={(v) => onSelectChange?.(v.target.checked, asset)} />
      <div className="flex-shrink-0 h-[60px] aspect-[2/1] rounded-lg overflow-auto">
        <Image
          src={replaceUri(asset.image) ?? ''}
          alt={asset.name}
          width={160}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="line-clamp-1">{asset.name}</div>
        <div className="line-clamp-1 text-xs text-gray-500 mt-2">
          {asset.description ?? '添加描述'}
        </div>
      </div>
    </div>
  );
}

'use client';
import { Asset, replaceUri } from '@creator-network/core';
import { Button, message, Table, TableColumnsType } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Curation } from '@creator-network/indexer-js';
import { useEffect, useState } from 'react';
import { indexerClient } from '@/creatornetwork';
import { useCurationAddAssets } from '@creator-network/react/hooks';
import { revalidateAllCurations } from '../../../create/actions';
import { TableRowSelection } from 'antd/es/table/interface';
import { AssetSelector } from '../../../_components/AssetSelector';
import { RemoveAssetButton } from '../_components/RemoveAssetButton';

export default function ({ params }: { params: { id: string } }) {
  const [curation, setCuration] = useState<Curation | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { addAssets } = useCurationAddAssets();

  const rowSelection: TableRowSelection<Curation['assets'][0]> = {
    selectedRowKeys,
    onChange: (ks) => setSelectedRowKeys(ks),
  };

  const fetchData = async () => {
    setLoading(true);
    indexerClient()
      .curations.fetchById(params.id)
      .then((c) => {
        if (!c) {
          notFound();
        }
        setCuration(c);
        setLoading(false);
      })
      .catch((e) => {
        message.error(e.message);
        setCuration(null);
      });
  };

  const handleAddAssets = async (assets: Asset[]) => {
    if (!curation) {
      return;
    }
    await addAssets(
      BigInt(curation.tokenId),
      assets.map((a) => ({ hub: a.hub.id, assetId: a.assetId }))
    );
    await fetchData();
    await revalidateAllCurations();
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: TableColumnsType<Curation['assets'][0]> = [
    {
      title: '资产',
      dataIndex: 'name',
      width: '32%',
      render: (_, row) => (
        <Link
          href={`/a/${row.asset.id}`}
          className="flex gap-2"
          title={row.asset.name}
        >
          <div className="flex-shrink-0 h-[60px] aspect-[2/1] rounded-lg overflow-auto">
            <Image
              src={replaceUri(row.asset.image) ?? ''}
              alt={row.asset.name}
              width={160}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="line-clamp-1">{row.asset.name}</div>
            <div className="line-clamp-1 text-xs text-gray-500 mt-2">
              {row.asset.description ?? '暂无描述'}
            </div>
          </div>
        </Link>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="text-2xl font-semibold flex-1">Curation Assets</div>
        {curation && (
          <RemoveAssetButton
            curationId={curation?.tokenId}
            onRemoved={() => {
              fetchData();
              revalidateAllCurations();
            }}
            assets={
              curation?.assets
                .filter((a) => selectedRowKeys.includes(a.asset.id))
                .map((a) => a.asset) ?? []
            }
          />
        )}
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Asset
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={curation?.assets ?? []}
        loading={loading}
        rowKey={(r) => r.asset.id}
        className="mt-4"
      />
      <AssetSelector
        open={open}
        onFinished={handleAddAssets}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}

'use client';

import { useApp } from '@/app/_components/_layout/AppContext';
import { indexerClient } from '@/app/_creatornetwork';
import { Asset, replaceUri } from '@creator-network/core';
import { Table, TableColumnsType, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Columns: TableColumnsType<Asset> = [
  {
    title: '资产',
    dataIndex: 'name',
    width: '32%',
    render: (_, row) => (
      <Link
        href={`/creator/asset/${row.id}/edit`}
        className="flex gap-2"
        title={row.name}
      >
        <div className="flex-shrink-0 h-[60px] aspect-[2/1] rounded-lg overflow-auto">
          <Image
            src={replaceUri(row.image) ?? ''}
            alt={row.name}
            width={160}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="line-clamp-1">{row.name}</div>
          <div className="line-clamp-1 text-xs text-gray-500 mt-2">
            {row.description ?? '添加描述'}
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

export default function () {
  const { account } = useApp();
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account?.studio) {
      setData([]);
    }
    setLoading(true);
    indexerClient()
      .assets.fetchAssets({
        hub: account?.studio,
        first: 99999,
      })
      .then((res) => {
        setData(res.assets);
        setLoading(false);
      })
      .catch((e) => {
        message.error(e.message);
        console.error(e);
        setLoading(false);
      });
  }, [account?.studio]);

  return (
    <div>
      <Table
        dataSource={data}
        columns={Columns}
        pagination={false}
        rowKey={(r) => r.id}
        loading={loading}
      />
    </div>
  );
}

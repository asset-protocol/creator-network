'use client';

import { indexerClient } from '@/app/_creatornetwork';
import { replaceUri } from '@creator-network/core';
import { Curation } from '@creator-network/indexer-js';
import { useAssetHub } from '@creator-network/react';
import { Table, TableColumnsType, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Columns: TableColumnsType<Curation> = [
  {
    title: '策展',
    dataIndex: 'name',
    width: '32%',
    render: (_, row) => (
      <Link href={`/creator/curation/${row.id}/edit`} className="flex gap-2">
        <div className="flex-shrink-0 h-[60px] aspect-[2/1] rounded-lg overflow-auto">
          <Image
            src={replaceUri(row.image) ?? ''}
            alt={row.name}
            width={200}
            height={100}
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
    title: '创建日期',
    render: (_, row) => (
      <div>
        {new Date(Number.parseFloat(row.timestamp)).toLocaleDateString()}
      </div>
    ),
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

export default function () {
  const { account, manager } = useAssetHub();
  const [data, setData] = useState<Curation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account?.studio || !manager?.curation) {
      setData([]);
      return;
    }
    setLoading(true);
    console.log('studio', account.studio);
    indexerClient()
      .curations.fetchCurations(manager.curation, account.studio)
      .then((res) => {
        setData(res);
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
        rowKey={(r) => r.id}
        dataSource={data}
        columns={Columns}
        loading={loading}
      />
    </div>
  );
}

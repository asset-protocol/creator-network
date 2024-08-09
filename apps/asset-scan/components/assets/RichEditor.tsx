'use client';
import dynamic from 'next/dynamic';

export const RichtextEditor = dynamic(
  () => import('@creator-network/react/plugins/asset-richtext/QuillEditor'),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);


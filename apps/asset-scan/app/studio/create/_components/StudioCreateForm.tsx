'use client';

import { generatAvatar } from '@/app/_components/ui/Avatar';
import { AssetHubMetadata, getStorage } from '@creator-network/core';
import { useAssetHub } from '@creator-network/react';
// import { AvatarUpload } from "@/app/_components/ui/AvatarUpload";
import { useDeployNewAssetHub } from '@creator-network/react/hooks';
import { Avatar, Button, Form, Input, Space, Upload } from 'antd';
import { ZeroAddress } from 'ethers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type StudioCreateData = {
  name: string;
  description: string;
};

export function StudioCreateForm() {
  const { deploy } = useDeployNewAssetHub();
  const { back, push } = useRouter();
  const { storage } = useAssetHub();

  const [loading, setLoading] = useState(false);

  const handleCreateStudio = async (values: StudioCreateData) => {
    if (!storage) {
      throw new Error('storage is null');
    }
    const store = getStorage(storage);
    if (!store) {
      throw new Error('storage is not found');
    }
    setLoading(true);
    try {
      const avatar = await generatAvatar({
        name: values.name,
        size: 64,
        variant: 'bauhaus',
      });
      const avatarUrl = await store.upload({
        data: new Blob([avatar], { type: 'image/svg+xml' }),
      });
      const metadata: AssetHubMetadata = {
        name: values.name,
        image: avatarUrl,
        description: values.description,
      };
      const metadataUrl = await store.upload({
        data: JSON.stringify(metadata),
      });
      const studio = await deploy({
        admin: ZeroAddress,
        name: values.name,
        createModule: ZeroAddress,
        contractURI: metadataUrl,
      });
      if (studio) {
        push('/' + studio);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form size="large" layout="vertical" onFinish={handleCreateStudio}>
      <Form.Item noStyle className="flex flex-row">
        {/* <Form.Item name="image">
          <AvatarUpload />
        </Form.Item> */}
        <Form.Item label="名称" name="name" rules={[{ max: 20 }]} required>
          <Input
            placeholder="输入频道名称"
            className="py-4"
            size="large"
            count={{
              show: true,
              max: 20,
            }}
          />
        </Form.Item>
      </Form.Item>
      <Form.Item label="描述" name="description">
        <Input.TextArea
          placeholder="输入频道描述"
          className="py-4"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Space className="w-full justify-center">
          <Button type="link" onClick={back}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            创建
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

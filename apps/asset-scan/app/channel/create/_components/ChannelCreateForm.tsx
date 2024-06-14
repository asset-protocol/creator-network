'use client'

import { AvatarUpload } from "@/app/_components/ui/AvatarUpload";
import { useDeployNewAssetHub } from "@creator-network/react/hooks";
import { Button, Form, Input, Space, Upload } from "antd"
import { ZeroAddress } from "ethers";
import { useRouter } from "next/navigation";

export type ChannelCreateData = {
  name: string
}

export function ChannelCreateForm() {
  const { deploy, isLoading } = useDeployNewAssetHub();
  const { back, push } = useRouter()

  const handleCreateChannel = async (values: ChannelCreateData) => {
    const channel = await deploy({
      admin: ZeroAddress,
      name: values.name,
      createModule: ZeroAddress
    });
    if (channel) {
      push("/" + channel);
    }
  }

  return (
    <Form size="large" layout="vertical" onFinish={handleCreateChannel}>
      <Form.Item noStyle className="flex flex-row">
        {/* <Form.Item name="image">
          <AvatarUpload />
        </Form.Item> */}
        <Form.Item name="name" rules={[{ max: 20 }]} required>
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
      <Form.Item>
        <Space className="w-full justify-center">
          <Button type="link" onClick={back}>取消</Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>创建</Button>
        </Space>
      </Form.Item>
    </Form>)
}
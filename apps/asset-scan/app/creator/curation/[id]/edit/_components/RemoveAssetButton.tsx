import { Asset } from '@creator-network/core';
import { useCurationRemoveAssets } from '@creator-network/react/hooks';
import { Button, ButtonProps, message, Modal } from 'antd';
import { useState } from 'react';

export type RemoveAssetButtonProps = ButtonProps & {
  curationId: string;
  assets: Asset[];
  onRemoved?: (assets: Asset[]) => void;
};

export function RemoveAssetButton(props: RemoveAssetButtonProps) {
  const { assets, curationId, onRemoved, ...resPorps } = props;
  const [open, setOpen] = useState(false);
  const { removeAssets, loading } = useCurationRemoveAssets();
  const handleRemove = async () => {
    await removeAssets(
      BigInt(curationId),
      assets.map((a) => ({ hub: a.hub.id, assetId: BigInt(a.assetId) }))
    );
    onRemoved?.(assets);
    setOpen(false);
  };
  return assets.length > 0 ? (
    <>
      <Button type="primary" danger onClick={() => setOpen(true)} {...resPorps}>
        移除
      </Button>
      <Modal
        open={open}
        title="移除资产"
        onOk={handleRemove}
        confirmLoading={loading}
        onCancel={() => setOpen(false)}
      >
        <p>确定从当前策展中移除这些资产吗？</p>
      </Modal>
    </>
  ) : null;
}

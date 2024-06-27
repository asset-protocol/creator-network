import { Button, Form, Modal, ModalProps, Select } from 'antd';

import { CollectModuleInput } from './collect/CollectModuleInput';
import { ZeroAddress, formatEther } from 'ethers';
import {
  PublishFromDataType,
  useAssetEditor,
  useAssetPublish,
  usePublishFormValues,
} from '@creator-network/react/asset/editor';
import { useGetHubGlobalModuleConfig } from '@creator-network/react/hooks';
import { ZERO_BYTES } from '@creator-network/core';
import { AssetCard } from './AssetCard';
import { useAssetHub } from '@creator-network/react';
import {
  revalidateAssetById,
  revalidateAssets,
} from '@/app/_creatornetwork/indexer-actions';
import { RedirectType, redirect } from 'next/navigation';

export function AssetPublishForm({ onClose }: { onClose?: () => void }) {
  const { manager, account } = useAssetHub();
  const { metadata, setPublished, asset, content } = useAssetEditor();

  const initialValues = usePublishFormValues();

  if (!manager) {
    throw new Error('manager is undefined');
  }
  if (!account || !account.studio) {
    throw new Error('account or channel is undefined');
  }
  const studio = account.studio;
  const { config: globalTokenConfig } = useGetHubGlobalModuleConfig(
    manager.globalModule,
    studio
  );
  const { publish, loading, tip } = useAssetPublish();

  const canSubmit = metadata && metadata.name && content && metadata.image;

  const handleSubmit = async (values: PublishFromDataType) => {
    console.log('values', values);
    if (!values.useCollect) {
      values.collectModule = {
        module: ZeroAddress,
        initData: ZERO_BYTES,
      };
    }

    const assetId = await publish(studio, values, globalTokenConfig);
    await revalidateAssets();
    if (asset) {
      await revalidateAssetById(asset.id);
    }
    onClose?.();
    if (assetId) {
      setPublished(BigInt(assetId));
      console.log('redirect to ', `/studio/${studio}/asset/${assetId}`);
      redirect(`/studio/${studio}/asset/${assetId}`, RedirectType.replace);
    } else {
      redirect(`/`, RedirectType.replace);
    }
  };

  return (
    metadata && (
      <div className="flex flex-wrap flex-col gap-6 text-base w-[300px]">
        <AssetCard
          name={metadata.name!}
          image={metadata.image}
          hubName={account.studioName}
        />
        <Form<PublishFromDataType>
          className="items-start flex flex-col justify-between"
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          {/* <Form.Item label="Storage" name="storage">
            <Select
              style={{ width: 180, marginLeft: "6px" }}
              options={storageOptions}
            />
          </Form.Item> */}

          <Form.Item noStyle className="w-full my-2">
            <CollectModuleInput />
          </Form.Item>
          <div className="flex-1"></div>
          {globalTokenConfig && !asset && globalTokenConfig.createFee > 0 && (
            <Form.Item noStyle label="Token Fee">
              <div>Token Fee: {formatEther(globalTokenConfig.createFee)}</div>
            </Form.Item>
          )}
          {globalTokenConfig && asset && globalTokenConfig.updateFee > 0 && (
            <Form.Item noStyle label="Token Fee">
              <div>Token Fee: {formatEther(globalTokenConfig.updateFee)}</div>
            </Form.Item>
          )}
          {<span className="text-gray-400">{tip}</span>}
          <Form.Item className="w-full my-2">
            <div className="flex items-center w-full">
              <Button type="link" onClick={() => onClose?.()}>
                Cancel
              </Button>
              <Button
                loading={loading}
                type="primary"
                className="flex-1 my-2 "
                disabled={!canSubmit}
                size="large"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  );
}

export type { ModalProps } from 'antd';
export type AssetPublishModalProps = ModalProps & {
  open?: boolean;
  onCancel?: () => void;
};

export function AssetPublishModal(props: AssetPublishModalProps) {
  return (
    <Modal
      destroyOnClose
      centered
      footer={null}
      title="Pulbish Asset"
      width={700}
      transitionName=""
      maskClosable={false}
      maskTransitionName=""
      className="h-[max-content]"
      wrapClassName="backdrop-blur-md"
      {...props}
    >
      <AssetPublishForm />
    </Modal>
  );
}

import { CollectModuleInput } from "./CollectModuleInput";
import { ZeroAddress, formatEther } from "ethers";
import { AssetCard, PublishFromDataType, useAssetEditor, useAssetPublish, usePublishFormValues } from "@creator-network/react/asset";
import { useAssetHub } from "@creator-network/react";
import { useGetHubGlobalModuleConfig } from "@creator-network/react/hooks";
import { useGetAssetHubs } from "@creator-network/indexer-js";
import { ZERO_BYTES } from "@creator-network/core";
import { Button, Form, Modal, Select } from "antd";

export function AssetPublishForm() {
  const { account } = useAssetHub();
  const { metadata, setPublished, asset, hub, setHub } = useAssetEditor();

  const initialValues = usePublishFormValues();
  const { config: globalTokenConfig } = useGetHubGlobalModuleConfig(hub);
  const { publish, loading, tip } = useAssetPublish();
  const { data } = useGetAssetHubs();

  const onValuesChanged = (changeValues: PublishFromDataType) => {
    if (changeValues.hub && changeValues.hub !== hub) {
      setHub(changeValues.hub);
    }
  }

  const handleSubmit = (values: PublishFromDataType) => {
    console.log("values", values);
    if (!values.useCollect) {
      values.collectModule = {
        module: ZeroAddress,
        initData: ZERO_BYTES,
      };
    }
    publish(values, globalTokenConfig).then((assetId) => {
      if (assetId) {
        setPublished(assetId);
      }
    });
  };

  return (
    metadata &&
    account && (
      <div className="flex flex-wrap gap-6 text-base">
        <div className="flex-1 min-w-[100px] items-center">
          <AssetCard name={metadata.name} image={metadata.image} />
        </div>
        <Form<PublishFromDataType>
          className="flex-1 items-start flex flex-col"
          onFinish={e => handleSubmit(e)}
          onValuesChange={e => onValuesChanged(e)}
          initialValues={initialValues}
        >
          <Form.Item label="Sutdio" name="hub">
            <Select
              style={{ width: 180, marginLeft: "6px" }}
              options={data.map((hub) => ({ label: hub.name, value: hub.id }))}
              disabled={!!asset}
            />
          </Form.Item>
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
            <Button
              loading={loading}
              className="w-full my-2"
              size="large"
              htmlType="submit"
            >
              Publish
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
}

export type AssetPublishModalProps = {
  open?: boolean;
  onCancel?: () => void;
};

export function AssetPublishModal(props: AssetPublishModalProps) {
  return (
    <Modal
      footer={null}
      title="Pulbish Asset"
      className="h-[max-content] w-[700px]"
      {...props}
    >
      <AssetPublishForm />
    </Modal>
  );
}

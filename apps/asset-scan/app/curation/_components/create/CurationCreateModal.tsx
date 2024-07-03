import { FormInstance, Modal, ModalProps, message } from 'antd';
import { CurationCreateForm, CurationFormData } from './CurationCreateForm';
import { useRef, useState } from 'react';
import { useAssetHub } from '@creator-network/react';
import { useCreateCuration } from '@creator-network/react/hooks';
import { getStorage } from '@creator-network/core';
import { CurationStatus } from '@creator-network/indexer-js';

export type CurationCreateModalProps = Pick<ModalProps, 'open' | 'onCancel'> & {
  onFinish?: (curationId: bigint) => void;
};

export function CurationCreateModal(props: CurationCreateModalProps) {
  const { storage } = useAssetHub();
  const { create } = useCreateCuration();

  const formRef = useRef<FormInstance<CurationFormData>>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const handleSubmit = async (values: CurationFormData) => {
    setCreateLoading(true);
    try {
      let image = values.image;
      const storageImpl = getStorage(storage!);
      if (!storageImpl) {
        throw new Error('No storage implementation found');
      }
      if (image && image.startsWith('blob:')) {
        const imageBlob = await fetch(values.image).then((res) => res.blob());
        image = await storageImpl.upload({
          data: imageBlob,
        });
      }
      const content = JSON.stringify({
        name: values.name,
        description: values.description,
        image: image,
      });
      const contentURI = await storageImpl.upload({
        data: content,
      });
      const curationId = await create({
        contentURI,
        status: CurationStatus.Public,
        assets: [],
        expiry: 0,
      });
      console.log('curationId', curationId);
      if (curationId) {
        props.onFinish?.(curationId);
      }
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <Modal
      {...props}
      destroyOnClose
      centered
      maskClosable={false}
      onOk={() => formRef.current?.submit()}
      confirmLoading={createLoading}
      title="Create Curation"
      transitionName=""
      maskTransitionName=""
    >
      <CurationCreateForm
        formRef={formRef}
        onSubmit={handleSubmit}
      ></CurationCreateForm>
    </Modal>
  );
}

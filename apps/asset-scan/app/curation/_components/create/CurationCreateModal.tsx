'use client';
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
export function useCurationFormCreate() {
  const { storage } = useAssetHub();
  const { create } = useCreateCuration();

  const [loading, setLoading] = useState(false);

  const createCuration = async (values: CurationFormData) => {
    setLoading(true);
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
      return curationId;
    } catch (e: any) {
      message.error(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };
  return {
    create: createCuration,
    loading,
  };
}

export function CurationCreateModal(props: CurationCreateModalProps) {
  const formRef = useRef<FormInstance<CurationFormData>>(null);
  const { create, loading } = useCurationFormCreate();

  const handleSubmit = async (values: CurationFormData) => {
    const curationId = await create(values);
    if (curationId) {
      props.onFinish?.(curationId);
    }
  };
  return (
    <Modal
      {...props}
      destroyOnClose
      centered
      maskClosable={false}
      onOk={() => formRef.current?.submit()}
      confirmLoading={loading}
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

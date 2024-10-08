'use client';
import { Button, FormInstance, message } from 'antd';
import { Curation } from '@creator-network/indexer-js';
import { useRef, useState } from 'react';
import { useSetCurationURI } from '@creator-network/react/hooks';
import { useAssetHub } from '@creator-network/react';
import { revalidateAllCurations } from '../../../create/actions';
import { getStorage } from '@creator-network/core';
import { revalidateAssetById } from '@/creatornetwork/indexer-actions';
import {
  CurationCreateForm,
  CurationFormData,
} from '../../../create/_components/CurationCreateForm';

export function DetailEdit({ curation }: { curation: Curation }) {
  const formRef = useRef<FormInstance<CurationFormData>>(null);
  const initialValues: CurationFormData = {
    name: curation.name,
    description: curation.description,
    image: curation.image,
    externalUrl: curation.externalUrl,
  };
  const [loading, setLoading] = useState<boolean>(false);

  const { storage } = useAssetHub();
  const { setCurationURI } = useSetCurationURI();

  const handleSubmit = async (values: CurationFormData) => {
    try {
      let image = values.image;
      const storageImpl = getStorage(storage!);
      if (!storageImpl) {
        throw new Error('No storage implementation found');
      }
      setLoading(true);
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
      await setCurationURI(BigInt(curation.tokenId), contentURI);
      await revalidateAssetById(curation.id);
      await revalidateAllCurations();
    } catch (e: any) {
      message.error('set curation URI error: ' + (e.shortMessage || e.message));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center flex-wrap gap-2">
        <div className="flex-1 text-2xl font-semibold">Curation Detail</div>
        <Button onClick={() => formRef.current?.resetFields()}>Reset</Button>
        <Button
          onClick={() => formRef.current?.submit()}
          loading={loading}
          type="primary"
        >
          Save
        </Button>
      </div>
      <div className="mt-4">
        <CurationCreateForm
          initialValues={initialValues}
          formRef={formRef}
          onSubmit={handleSubmit}
        ></CurationCreateForm>
      </div>
    </div>
  );
}

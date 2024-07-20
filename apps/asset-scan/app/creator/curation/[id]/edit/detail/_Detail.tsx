'use client';

import {
  CurationCreateForm,
  CurationFormData,
} from '@/app/creator/curation/create/_components/CurationCreateForm';
import { Button, FormInstance, message } from 'antd';
import { Curation } from '@creator-network/indexer-js';
import { useRef, useState } from 'react';
import { useSetCurationURI } from '@creator-network/react/hooks';
import { useAssetHub } from '@creator-network/react';
import { getStorage } from '@/app/_creatornetwork';
import { revalidateCurationById, revalidateCurations } from '../../../create/actions';

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
      setLoading(false);
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
      await setCurationURI(BigInt(curation.id), contentURI);
      await revalidateCurationById(curation.id);
      await revalidateCurations();
    } catch (e: any) {
      message.error('set curation URI error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center flex-wrap gap-2">
        <div className="flex-1 font-semibold">Curation Detail</div>
        <Button onClick={() => formRef.current?.resetFields()}>
          Undo Changes
        </Button>
        <Button onClick={() => formRef.current?.submit()} loading={loading}>
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

'use client';

import { Button, message } from 'antd';
import { useCurationFormCreate } from './CurationCreateModal';
import { revalidateCurations } from '../actions';
import { CurationCreateForm, CurationFormData } from './CurationCreateForm';
import { useRouter } from 'next/navigation';
import { useAssetHub } from '@creator-network/react';

export function Create() {
  const { loading, create } = useCurationFormCreate();
  const { push } = useRouter();
  const { manager } = useAssetHub();
  const handleSubmit = async (values: CurationFormData) => {
    if (!manager?.curation) {
      message.error('curation is undefined');
      return;
    }
    const curationId = await create(values);
    await revalidateCurations(manager.curation);
    if (curationId) {
      push('/curation/' + curationId.toString());
    }
  };
  return (
    <CurationCreateForm onSubmit={handleSubmit}>
      <Button loading={loading} type="primary" htmlType="submit">
        提交
      </Button>
    </CurationCreateForm>
  );
}

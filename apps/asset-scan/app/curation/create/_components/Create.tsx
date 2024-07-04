'use client';

import { Button } from 'antd';
import {
  CurationCreateForm,
  CurationFormData,
} from '../../_components/create/CurationCreateForm';
import { useCurationFormCreate } from '../../_components/create/CurationCreateModal';
import { revalidateCurations } from '../../_components/actions';
import { redirect } from 'next/navigation';

export function Create() {
  const { loading, create } = useCurationFormCreate();
  const handleSubmit = async (values: CurationFormData) => {
    const curationId = await create(values);
    await revalidateCurations();
    if (curationId) {
      redirect('/curation/' + curationId.toString());
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

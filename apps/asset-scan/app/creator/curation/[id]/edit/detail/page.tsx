import { fetchCurationById } from '@/app/curation/_components/api';
import { CurationCreateForm } from '@/app/creator/curation/create/_components/CurationCreateForm';
import { Button } from 'antd';
import { notFound } from 'next/navigation';
import { DetailEdit } from './_Detail';

export default async function ({ params }: { params: { id: string } }) {
  const curation = await fetchCurationById(params.id);
  if (!curation) {
    notFound();
  }
  return <DetailEdit curation={curation} />;
}

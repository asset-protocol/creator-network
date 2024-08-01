import { notFound } from 'next/navigation';
import { DetailEdit } from './_Detail';
import { fetchCurationById } from '@/app/curation/_components/api';

export default async function ({ params }: { params: { id: string } }) {
  const curation = await fetchCurationById(params.id);
  if (!curation) {
    notFound();
  }
  return <DetailEdit curation={curation} />;
}

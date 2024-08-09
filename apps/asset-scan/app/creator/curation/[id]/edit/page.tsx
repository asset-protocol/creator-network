import { redirect } from 'next/navigation';

export default async function ({ params }: { params: { id: string } }) {
  redirect(`/creator/curation/${params.id}/edit/detail`)
}

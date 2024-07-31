import { redirect } from 'next/navigation';

export default function ({ params }: { params: { name: string } }) {
  redirect('/studio/' + params.name + '/assets');
}

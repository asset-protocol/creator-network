import { StudioCurationList } from '../_components/StudioCurationList';
import { fetchStudioByNameOrId } from '../fetch';

export default async function ({ params }: { params: { name: string } }) {
  const studio = await fetchStudioByNameOrId(params.name);
  return <StudioCurationList studio={studio} />;
}

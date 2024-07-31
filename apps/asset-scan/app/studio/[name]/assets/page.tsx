import { StudioAssetList } from '../_components/StudioAssetList';
import { fetchStudioByNameOrId } from '../fetch';

export default async function ({ params }: { params: { name: string } }) {
  const studio = await fetchStudioByNameOrId(params.name);
  return <StudioAssetList studioId={studio.id} />;
}

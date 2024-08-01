import { indexerClient } from '@/creatornetwork';
import { unstable_cache } from 'next/cache';

export const FETCH_STUDIO = 'sutdio';
export const FETCH_STUDIO_BY_ID_TAG = 'studioByNameOrId';

export function fetchStudioByNameOrId(nameOrId: string) {
  const action = unstable_cache(
    (nameOrId: string) => indexerClient().assetHubs.fetchByNameOrId(nameOrId),
    [`${FETCH_STUDIO_BY_ID_TAG}:${nameOrId}`],
    { tags: [FETCH_STUDIO, `${FETCH_STUDIO_BY_ID_TAG}:${nameOrId}`] }
  );
  return action(nameOrId);
}

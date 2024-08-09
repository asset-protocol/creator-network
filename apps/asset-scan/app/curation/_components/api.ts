import { indexerClient } from '@/creatornetwork';
import { unstable_cache } from 'next/cache';

export const FETCH_CURATION_TAG = 'curation';

export const FETCH_CURATIONS_TAG = 'fetchCurations';
export function fetchCurations(contract: string, studioId?: string) {
  const action = unstable_cache(
    (contract: string, studioId?: string) =>
      indexerClient().curations.fetchCurations(contract, studioId),
    [FETCH_CURATIONS_TAG],
    { tags: [FETCH_CURATION_TAG, `${FETCH_CURATIONS_TAG}_${contract}`] }
  );
  return action(contract, studioId);
}

export const FETCH_CURATIONS_BY_ID_TAG = 'fetchCurationById';
export function fetchCurationById(id: string) {
  const action = unstable_cache(
    (tokenID: string) => indexerClient().curations.fetchById(tokenID),
    [`${FETCH_CURATIONS_BY_ID_TAG}:${id}`],
    { tags: [FETCH_CURATION_TAG, `${FETCH_CURATIONS_BY_ID_TAG}:${id}`] }
  );
  return action(id);
}

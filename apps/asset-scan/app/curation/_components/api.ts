import { indexerClient } from '@/app/_creatornetwork';
import { unstable_cache } from 'next/cache';

export const FETCH_CURATIONS_TAG = 'fetchCurations';
export function fetchCurations() {
  const action = unstable_cache(
    () => indexerClient().curations.fetchCurations(),
    [FETCH_CURATIONS_TAG],
    { tags: [`${FETCH_CURATIONS_TAG}`] }
  );
  return action();
}

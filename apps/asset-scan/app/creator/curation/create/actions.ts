'use server';

import {
  FETCH_CURATION_TAG,
  FETCH_CURATIONS_BY_ID_TAG,
  FETCH_CURATIONS_TAG,
} from '@/app/curation/_components/api';
import { revalidateTag } from 'next/cache';

export async function revalidateCurations(contract: string) {
  revalidateTag(`${FETCH_CURATIONS_TAG}_${contract}`);
  return Promise.resolve(`${FETCH_CURATIONS_TAG}_${contract}`);
}

export async function revalidateCurationById(curationId: string) {
  revalidateTag(`${FETCH_CURATIONS_BY_ID_TAG}:${curationId}`);
  return Promise.resolve();
}
function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
export async function revalidateAllCurations() {
  revalidateTag(FETCH_CURATION_TAG);
  return Promise.resolve();
}

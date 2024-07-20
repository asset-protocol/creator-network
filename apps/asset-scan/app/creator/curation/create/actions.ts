'use server';

import {
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

export async function revalidateAllCurations() {
  revalidateTag(FETCH_CURATIONS_TAG);
  return Promise.resolve();
}

'use server';

import { revalidateTag } from 'next/cache';
import { FETCH_CURATIONS_TAG } from './api';

export async function revalidateCurations() {
  revalidateTag(`${FETCH_CURATIONS_TAG}`);
  return Promise.resolve(`${FETCH_CURATIONS_TAG}`);
}

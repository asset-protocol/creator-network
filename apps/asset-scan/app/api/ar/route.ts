import { NextRequest, NextResponse } from 'next/server';
import { ARWAVE_PRIVATE_KEY, arweave } from './_ar';

export async function POST(req: NextRequest) {
  const formdata = await req.formData();
  const file = formdata.get('file');
  if (typeof file === 'string' || !file) {
    return NextResponse.json('file is required', { status: 400 });
  }
  const data = await file.arrayBuffer();
  const tx = await arweave.createTransaction({ data }, ARWAVE_PRIVATE_KEY);
  const contentType = req.headers.get('Content-Type');
  if (contentType) {
    tx.addTag('Content-Type', contentType);
  }
  await arweave.transactions.sign(tx);
  const res = await arweave.transactions.post(tx);
  return NextResponse.json(res);
}

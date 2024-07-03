import Arweave from 'arweave';

export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

export const ARWAVE_PRIVATE_KEY = JSON.parse(process.env.ARWAVE_PRIVATE_KEY!);



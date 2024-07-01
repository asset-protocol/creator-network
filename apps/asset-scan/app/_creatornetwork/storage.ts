import ipfsPinataPlugin from "@creator-network/react/plugins/storage-ipfs-pinata";
import arwaveStoragePlugin from "@creator-network/react/plugins/storage-arwave";
import { creatorNetwork } from "@creator-network/core";

const JWTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMjFmMjUzMi01ODMxLTRmZTgtODAwMi01ODkxMjA2MjE4MjMiLCJlbWFpbCI6IndhaXRlMXhAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2E0OWNiM2Q2OTM3NTQ4YzMzMjEiLCJzY29wZWRLZXlTZWNyZXQiOiJkNWYxZWY2NDkyMWMwMTc2YzYyNTkyYTNhNTZkMzc3MmVlYWY3NmIwZjFkZGE4Y2RhYmY1NzA2NGYyYjQ3OTYxIiwiaWF0IjoxNzEwNDg0MjIxfQ.sQp8EB2l716fjOqG8Uj2n4zitR1wBQ3-IsiKlZ6XVOo";

export function useStorage() {
  return creatorNetwork.use(
    ipfsPinataPlugin({ jwtToken: JWTOKEN, gateway: "https://ipfs.io" }),
    arwaveStoragePlugin())
}
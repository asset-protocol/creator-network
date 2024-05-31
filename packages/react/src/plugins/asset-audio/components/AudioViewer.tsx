import { Asset } from "@creator-network/core";

export default function AudioViewer({ value }: { value: Asset }) {
  return <div>AudioViewer,{value.name}</div>;
}

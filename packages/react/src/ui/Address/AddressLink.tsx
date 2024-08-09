import clsx from "clsx";

export function AddressLink(props: {
  address?: string;
  to?: string;
  className?: string;
}) {
  return (
    <a className={clsx("link link-primary link-hover", props.className)}>
      {formatAddress(props.address)}
    </a>
  );
}

export function formatAddress(address?: string) {
  if (!address) return address;
  return `${address.slice(0, 10)}...${address.slice(-4)}`;
}

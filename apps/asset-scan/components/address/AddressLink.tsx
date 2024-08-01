import { CopyFilled, CopyOutlined, CopyTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import clsx from 'clsx';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';

export type AddressLinkProps = {
  herf?: string;
  splitNum?: number;
  splitNum2?: number;
  address?: string;
  children?: ReactNode;
  iconClassName?: string;
  className?: string;
  hideCopy?: boolean;
};
export function AddressLink(props: AddressLinkProps) {
  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();
    if (props.address) {
      await navigator.clipboard.writeText(props.address);
      message.success('复制成功');
    }
  };
  return (
    <div className={clsx('flex gap-2 items-center', props.className)}>
      <Link className="flex" href={props.herf ?? ''} title={props.address}>
        {props.children
          ? props.children
          : formatAddress(props.address, props.splitNum, props.splitNum2)}
      </Link>
      {!props.hideCopy && (
        <Copy
          className={clsx('text-gray-400 cursor-pointer', props.iconClassName)}
          size={16}
          onClick={handleCopy}
        />
      )}
    </div>
  );
}

export function formatAddress(address?: string, num?: number, num2?: number) {
  if (!address) return address;
  return `${address.slice(0, num ?? 10)}...${address.slice(-(num2 ?? 8))}`;
}

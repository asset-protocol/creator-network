import { Upload, UploadProps } from '@creator-network/react/ui';
import { AvatarUploadProps } from './AvatarUpload';

export type BlobUploadProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  accept?: string;
  children?: React.ReactNode;
};

export function BlobUpload(props: BlobUploadProps) {
  return (
    <Upload
      className={props.className}
      accept={props.accept}
      children={props.children}
    />
  );
}

import { Upload } from '@creator-network/react/ui';
import { Avatar } from 'antd';
import { Camera } from 'lucide-react';
import { useState } from 'react';

export type AvatarUploadProps = {
  className?: string;
  value?: string;
  onChange?: (v?: string) => void;
};

export function AvatarUpload(props: AvatarUploadProps) {
  const [imageUrl, setImageUrl] = useState(props.value);
  return (
    <Upload
      multiple={false}
      onChange={(files) => {
        setImageUrl(files?.[0]);
        props.onChange?.(files?.[0]);
      }}
    >
      <Avatar src={imageUrl} size={64} alt="avatar">
        <Camera />
      </Avatar>
    </Upload>
  );
}

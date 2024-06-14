import { Upload } from "@creator-network/react/ui"
import { Avatar } from "antd"
import { ImageUpIcon } from "lucide-react"
import { useState } from "react"

export type AvatarUploadProps = {
  className?: string
  value?: string
  onChange?: (v?: string) => void
}

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <ImageUpIcon />
  </button>
);

export function AvatarUpload(props: AvatarUploadProps) {
  const [imageUrl, setImageUrl] = useState(props.value)
  return <Upload
    multiple={false}
    className="rounded-box"
    onChange={files => {
      setImageUrl(files?.[0]);
      props.onChange?.(files?.[0]);
    }}
  >
    {imageUrl ? <Avatar src={imageUrl} alt="avatar" /> : uploadButton}
  </Upload>
}
import { Modal, ModalProps } from 'antd';

export function AddAsset() {
  return <div>Select Video</div>;
}

export type AddAssetModalProps = Omit<ModalProps, 'children'> & {};
export function AddAssetModal(props: AddAssetModalProps) {
  return (
    <Modal {...props}>
      <AddAsset />
    </Modal>
  );
}

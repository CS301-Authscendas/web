import { Modal } from 'antd';

interface DeleteAccountProps {
  openModal: boolean;
  onOk: () => void;
  onCancel: () => void;
}
export const DeleteAccount: React.FC<DeleteAccountProps> = ({
  openModal,
  onOk,
  onCancel
}) => {
  return (
    <Modal
      title="Delete account"
      open={openModal}
      onOk={onOk}
      onCancel={onCancel}
      okText="Ok"
      cancelText="Cancel"
      okButtonProps={{ ghost: true }}
    >
      <p>Are you sure you want to delete your account?</p>
      <p>This action cannot be undone.</p>
    </Modal>
  );
};

import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, perfomAction, title } = props;
  return (
    <Modal
      title="Title"
      open={open}
      onOk={perfomAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancelar"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;

import { Modal } from "antd";
import React, { useState, useEffect } from "react";

export const Popup = (props) => {
  const { show, content } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (show) {
      showModal();
    }
  }, [props]);

  return (
    <>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </>
  );
};

import React from "react";
import { Modal, Button } from "antd";
import { Container, TitleModal, DetailModal } from "./modal.style";
import SuccessImage from "../../assets/images/png/success.png";
import FailedImage from "../../assets/images/png/failed.png";

import Image from "next/image";

export default function Index({ visible, setVisible, status, description }) {
  function handleCloseModal() {
    setVisible(false);
  }

  return (
    <Modal
      centered
      className="custom-ant-container"
      visible={visible}
      footer={false}
      closable={false}
    >
      <Container style={{ textAlign: "center" }}>
        <Container>
          <Image
            preview={false}
            width={150}
            height={150}
            src={status ? SuccessImage : FailedImage}
            alt="buy"
          />
        </Container>
        <TitleModal>{description.title}</TitleModal>
        <DetailModal>{description.detail}</DetailModal>
        <Container>
          <Button
            type="primary"
            onClick={handleCloseModal}
            style={{ width: "120px", height: "40px" }}
          >
            OK
          </Button>
        </Container>
      </Container>
    </Modal>
  );
}

import React, { useState } from "react";
import { Modal, Image, Button, Divider, Space } from "antd";
import { Title, PriceBox, Detail, Container } from "./modal.style";
import { BuyProduct } from "../../core/service/genaric";
import { buyProduct } from "../../core/util/schemas";
import ResultModal from "./index";

export default function Index({
  data,
  setData,
  visible,
  setVisible,
  reloadData,
}) {
  const [visibleModalResult, setVisibleModalResult] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [description, setDescription] = useState({
    title: "Success.",
    detail: "Done.",
  });

  function handleCloseModal() {
    setVisible(false);
    setData({});
  }

  function handleBuyProduct() {
    setVisible(false);

    BuyProduct(buyProduct, data._id)
      .then((response) => {
        if (response.code === 200) {
          reloadData();
          setVisibleModalResult(true);
          setModalStatus(true);
          setDescription({ title: "Success.", detail: response.message });
        } else {
          setVisibleModalResult(true);
          setModalStatus(false);
          setDescription({ title: "Error.", detail: response.message });
        }
      })
      .catch(() => {
        setVisibleModalResult(true);
        setModalStatus(false);
        setDescription({ title: "Error.", detail: response.message });
      });

    setData({});
  }

  return (
    <>
      <Modal
        centered
        className="custom-ant-container"
        visible={visible}
        footer={false}
        closable={false}
      >
        <Container style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <Image
            preview={false}
            width={250}
            src={data.product_image}
            alt="buy"
          />
          <Container
            style={{
              display: "grid",
              gridTemplateRows: "50% 50%",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Title>{data.product_name}</Title>
            <PriceBox>฿ {data.product_price}</PriceBox>
          </Container>
        </Container>
        <Divider />
        <Detail>{data.product_detail}</Detail>
        <Divider />
        <Container style={{ textAlign: "center" }}>
          <Space>
            <Button
              onClick={handleBuyProduct}
              type="primary"
              style={{ width: "120px" }}
            >
              Buy
            </Button>
            <Button onClick={handleCloseModal} style={{ width: "120px" }}>
              Cancel
            </Button>
          </Space>
        </Container>
      </Modal>
      <ResultModal
        visible={visibleModalResult}
        setVisible={setVisibleModalResult}
        status={modalStatus}
        description={description}
      />
    </>
  );
}

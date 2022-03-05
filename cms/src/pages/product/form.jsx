import React, { useEffect, useState, useRef } from "react";
import {
  Divider,
  Row,
  Col,
  Form,
  Input,
  Radio,
  Button,
  Space,
  InputNumber,
  Upload,
  message,
  Image,
} from "antd";
import {
  GetByID,
  CreateData,
  UpdateData,
  UploadFile,
} from "core/services/collections/Generic";
import { product } from "core/config/schemas";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Title, FormItem } from "./product.style";
import Modal from "components/modal";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function Index() {
  const navigate = useNavigate();
  const siteParams = useParams();
  const formRef = useRef();

  const [visibleModal, setVisibleModal] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageFile, setImageFile] = useState(false);

  const [details, setDetails] = useState({
    title: "Success",
    detail: "Create Data Success",
  });

  const UploadProps = {
    listType: "picture-card",
    className: "avatar-uploader",
    showUploadList: false,
    beforeUpload: beforeUpload,
    onChange: handleChange,
    customRequest: UploadFile,
  };

  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    siteParams?.product_id && GetMacheneData();
  }, []);

  function GetMacheneData() {
    GetByID(product, siteParams?.product_id)
      .then((response) => {
        console.log("response", response);
        if (response.code === 200) {
          initForm(response.data);
          editImage(response.data);
        }
      })
      .catch((err) => {});
  }

  function editImage(data) {
    return setImageFile({
      uid: "-1",
      name: "image.png",
      status: "done",
      url: data.product_image,
    });
  }

  function initForm(values) {
    formRef?.current?.setFieldsValue({
      name: values.product_name,
      image: values.product_image,
      detail: values.product_detail,
      price: values.product_price,
      amount: values.product_amount,
      status: values.status,
    });
  }

  function handleFormFinishCreate(values) {
    const params = {
      product_name: values.name,
      product_detail: values.detail,
      product_amount: values.amount,
      product_price: values.price,
      product_image: imageFile.url,
      machine_id: siteParams.id,
      status: values.status === undefined ? "active" : values.status,
    };

    CreateData(product, params)
      .then((response) => {
        if (response.code === 201) {
          setVisibleModal(true);
          setFetchStatus(true);
          setDetails({ title: "Success", detail: response.message });
        } else {
          setVisibleModal(true);
          setFetchStatus(false);
          setDetails({ title: "Failed", detail: response.message });
        }
      })
      .catch((err) => {
        setVisibleModal(true);
        setFetchStatus(false);
        setDetails({ title: "Failed", detail: err.message });
      });
  }

  function handleFormFinishEdit(values) {
    const params = {
      product_name: values.name,
      product_detail: values.detail,
      product_amount: values.amount,
      product_price: values.price,
      product_image: values.image,
      machine_id: siteParams.id,
      status: values.status === undefined ? "active" : values.status,
    };

    UpdateData(product, params, siteParams?.product_id)
      .then((response) => {
        if (response.code === 200) {
          setVisibleModal(true);
          setFetchStatus(true);
          setDetails({ title: "Success", detail: response.message });
        } else {
          setVisibleModal(true);
          setFetchStatus(false);
          setDetails({ title: "Failed", detail: response.message });
        }
      })
      .catch((err) => {
        setVisibleModal(true);
        setFetchStatus(false);
        setDetails({ title: "Failed", detail: err.message });
      });
  }

  function handleReset(e) {
    e.preventDefault();
    formRef?.current?.resetFields();
  }

  function handleChange(info) {
    if (info.file.status === "uploading") {
      setLoadingUpload(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageFile(info.file);
        setLoadingUpload(false);
      });
    }
  }

  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Title>
            <CaretLeftOutlined
              onClick={() => navigate(`/machine/${siteParams.id}/product`)}
            />
            {siteParams?.product_id
              ? "Edit Product in Vending Machine"
              : "Create Product in Vending Machine"}
          </Title>
        </Col>
      </Row>
      <Divider />
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={
          siteParams.product_id ? handleFormFinishEdit : handleFormFinishCreate
        }
      >
        <FormItem
          label="Upload Image"
          name="image"
          rules={[{ required: true }]}
        >
          <Upload {...UploadProps}>
            {imageFile ? (
              <Image
                src={imageFile.url}
                alt="avatar"
                style={{ width: "100%", padding: 15 }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </FormItem>
        <FormItem label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem
          label="Price (THB.)"
          name="price"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={1}
            max={999}
            defaultValue={0}
            style={{ width: "100%" }}
          />
        </FormItem>
        <FormItem label="Amount" name="amount" rules={[{ required: true }]}>
          <InputNumber
            min={1}
            max={999}
            defaultValue={0}
            style={{ width: "100%" }}
          />
        </FormItem>

        <FormItem label="Detail" name="detail" rules={[{ required: true }]}>
          <TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
        </FormItem>
        <FormItem label="Status" name="status" initialValues={"active"}>
          <Radio.Group defaultValue={"active"}>
            <Radio value={"active"}>Active</Radio>
            <Radio value={"inactive"}>InActive</Radio>
          </Radio.Group>
        </FormItem>
        <Divider />
        <FormItem>
          <Space>
            <Button type="primary" htmlType="submit">
              Create
            </Button>

            <Button type="button" onClick={(e) => handleReset(e)}>
              Reset
            </Button>
          </Space>
        </FormItem>
      </Form>
      <Modal
        visible={visibleModal}
        setVisible={setVisibleModal}
        status={fetchStatus}
        details={details}
        cancel={false}
      />
    </>
  );
}

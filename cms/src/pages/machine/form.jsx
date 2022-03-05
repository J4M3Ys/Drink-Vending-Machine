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
  Image,
  Upload,
  message,
} from "antd";
import {
  GetByID,
  CreateData,
  UpdateData,
  UploadFile,
} from "core/services/collections/Generic";
import { machine } from "core/config/schemas";
import { Title } from "./machine.style";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { FormItem } from "./machine.style";
import Modal from "components/modal";
import MapModal from "components/modal/googleMap";
import MapIcon from "assets/images/png/map-icon.png";
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

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageFile, setImageFile] = useState({});
  const [editData, setEditData] = useState();
  const [visibleMapModal, setVisibleMapModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);
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
    siteParams?.id && GetMacheneData();
  }, []);

  function GetMacheneData() {
    GetByID(machine, siteParams?.id)
      .then((response) => {
        if (response.code === 200) {
          initForm(response.data);
          setEditData(response.data);
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
      url: data.machine_image,
    });
  }

  function initForm(values) {
    formRef?.current?.setFieldsValue({
      image: values.machine_image,
      name: values.machine_name,
      detail: values.machine_detail,
      lat: values.machine_location[0],
      lng: values.machine_location[1],
      status: values.status,
    });
  }

  function handleFormFinishCreate(values) {
    const params = {
      machine_image: imageFile.url,
      machine_name: values.name,
      machine_detail: values.detail,
      machine_location: [values.lat, values.lng],
      status: values.status === undefined ? "active" : values.status,
    };

    CreateData(machine, params)
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
      machine_image: imageFile.url,
      machine_name: values.name,
      machine_detail: values.detail,
      machine_location: [values.lat, values.lng],
      status: values.status === undefined ? "active" : values.status,
    };

    UpdateData(machine, params, siteParams?.id)
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

  function onClickOK(value) {
    formRef.current.setFieldsValue({
      lat: value.lat,
      lng: value.lng,
    });
  }

  function handleChange(info) {
    if (info.file.status === "uploading") {
      setLoadingUpload(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, () => {
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
            <CaretLeftOutlined onClick={() => navigate("/machine")} />{" "}
            {siteParams?.id ? "Edit Vending Machine" : "Create Vending Machine"}
          </Title>
        </Col>
      </Row>
      <Divider />
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={siteParams.id ? handleFormFinishEdit : handleFormFinishCreate}
      >
        <FormItem
          label="Upload Image"
          name="image"
          rules={[{ required: true }]}
        >
          <Upload {...UploadProps}>
            {imageFile.url ? (
              <Image
                preview={false}
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
        <FormItem label="Detail" name="detail" rules={[{ required: true }]}>
          <TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
        </FormItem>
        <Space>
          <FormItem
            label="Latitude"
            name="lat"
            rules={[{ required: true }]}
            style={{ width: 325 }}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            label="Longitude"
            name="lng"
            rules={[{ required: true }]}
            style={{ width: 325 }}
          >
            <Input disabled />
          </FormItem>
          <Image
            onClick={() => setVisibleMapModal(true)}
            preview={false}
            src={MapIcon}
            width={25}
            style={{ marginTop: "5px", cursor: "pointer" }}
          />
        </Space>
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
      <MapModal
        visible={visibleMapModal}
        setVisible={setVisibleMapModal}
        onClickOK={onClickOK}
        editData={editData}
      />
    </>
  );
}

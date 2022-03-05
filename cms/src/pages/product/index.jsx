import React, { useEffect, useState } from "react";
import {
  Table,
  Dropdown,
  Divider,
  Badge,
  Button,
  Row,
  Col,
  Image,
  Input,
  Space,
} from "antd";
import { GetByID } from "core/services/collections/Generic";
import { machineProduct, product, machine } from "core/config/schemas";
import {
  UnorderedListOutlined,
  PlusOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { Title } from "./product.style";
import Moment from "moment";
import ActionsMenu from "components/actionsMenu";
import { Link } from "react-router-dom";

const { Search } = Input;

export default function Index() {
  const [dataList, setDataList] = useState([]);
  const [machineOwn, setMachineOwn] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(null);

  const columns = [
    {
      title: "Image",
      dataIndex: "product_image",
      key: "product_image",
      render: (value) => {
        return (
          <Image
            src={value}
            width={50}
            height={50}
            alt="prouduct"
            fallback="data:image/png;base64,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"
          />
        );
      },
    },
    { title: "Name", dataIndex: "product_name", key: "product_name" },
    { title: "Detail", dataIndex: "product_detail", key: "product_detail" },
    {
      title: "Amount",
      dataIndex: "product_amount",
      key: "product_amount",
    },
    { title: "Price (THB.)", dataIndex: "product_price", key: "product_price" },
    {
      title: "Selled",
      dataIndex: "product_selled",
      key: "product_selled",
      render: (value) => (value ? value : 0),
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        return Moment(value).format("DD MMMM YYYY hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        return value === "active" ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="error" text="InActive" />
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "N/A",
      render: (data) => (
        <Dropdown
          overlay={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a>
              <ActionsMenu
                edit
                del
                editPath={`${window.location.pathname}/edit/${data._id}`}
                id={data._id}
                schemas={product}
                getData={GetProductData}
              />
            </a>
          }
          trigger={["click"]}
          placement="bottomCenter"
          arrow
        >
          <UnorderedListOutlined style={{ fontSize: "15px" }} />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    GetProductData();
    GetMachinetData();
  }, []);

  const GetMachinetData = () => {
    GetByID(machine, params.id)
      .then((response) => {
        if (response.code === 200) {
          setMachineOwn(response.data);
        }
      })
      .catch((err) => {
        setMachineOwn({});
      });
  };

  const GetProductData = () => {
    GetByID(machineProduct, params.id)
      .then((response) => {
        if (response.code === 200) {
          setDataList(response.data);
        }
      })
      .catch((err) => {
        setDataList([]);
      });
  };

  function onSearch(e) {
    if (!e.target.value) {
      setSearchData(null);
      return;
    }

    console.log("e.target.value :>> ", e.target.value.toLowerCase());

    const result = dataList.filter(
      (value) =>
        value.product_name
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );

    setSearchData(result);
  }

  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Title>
            <CaretLeftOutlined onClick={() => navigate(`/machine`)} /> Product
            in Vending Machine ({machineOwn.machine_name || undefined})
          </Title>
        </Col>
      </Row>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Name"
          onChange={onSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
        <Link to={`${window.location.pathname}/create`}>
          <Button type="primary" style={{ borderRadius: 10 }}>
            <PlusOutlined /> Add Product
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={searchData ? searchData : dataList}
        pagination={{ pageSize: 15 }}
      />
    </>
  );
}

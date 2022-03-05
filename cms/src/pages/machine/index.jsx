import React, { useEffect, useState } from "react";
import {
  Table,
  Dropdown,
  Divider,
  Badge,
  Button,
  Row,
  Col,
  Input,
  Space,
} from "antd";
import { GetList } from "core/services/collections/Generic";
import { machine } from "core/config/schemas";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { Title } from "./machine.style";
import Moment from "moment";
import ActionsMenu from "components/actionsMenu";
import { Link } from "react-router-dom";

const { Search } = Input;

export default function Index() {
  const columns = [
    { title: "Name", dataIndex: "machine_name", key: "machine_name" },
    {
      title: "Detail",
      dataIndex: "machine_detail",
      key: "machine_detail",
    },

    {
      title: "Latitude",
      dataIndex: "machine_location",
      key: "machine_location",
      render: (value) => {
        return <>{value[0]}</>;
      },
    },
    {
      title: "Longitude",
      dataIndex: "machine_location",
      key: "machine_location",
      render: (value) => {
        return <>{value[1]}</>;
      },
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
          trigger={["click"]}
          overlay={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#">
              <ActionsMenu
                product
                edit
                del
                productPath={`/machine/${data._id}/product`}
                editPath={`/machine/edit/${data._id}`}
                id={data._id}
                schemas={machine}
                getData={GetMacheneData}
              />
            </a>
          }
          placement="bottomCenter"
          arrow
        >
          <UnorderedListOutlined style={{ fontSize: "15px" }} />
        </Dropdown>
      ),
    },
  ];

  const [dataList, setDataList] = useState([]);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    GetMacheneData();
  }, []);

  const GetMacheneData = () => {
    GetList(machine)
      .then((response) => {
        setDataList(response);
      })
      .catch((err) => {});
  };

  function onSearch(e) {
    if (!e.target.value) {
      setSearchData(null);
      return;
    }

    const result = dataList.filter(
      (value) =>
        value.machine_name
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );

    setSearchData(result);
  }

  return (
    <>
      <Row justify="space-between">
        <Col span={12}>
          <Title>Vending Machine</Title>
        </Col>
      </Row>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Name"
          onChange={onSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
        <Link to="/machine/create">
          <Button type="primary" style={{ borderRadius: 10 }}>
            <PlusOutlined /> Create
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

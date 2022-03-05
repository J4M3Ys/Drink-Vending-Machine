import React, { useEffect, useState } from "react";
import GoogleMap from "components/googleMap";
import { Title, Detail } from "./dashboard.style";
import { Row, Col, Card, Pagination, Input, Space, Image, Empty } from "antd";
import { GetList } from "core/services/collections/Generic";
import { machine } from "core/config/schemas";
import { FolderViewOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

export default function Index() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [selectMachine, setSelectMachine] = useState();
  const [pagination, setPagination] = useState({
    perPage: 6,
    page: 1,
    total_page: 10,
  });

  useEffect(() => {
    GetMacheneData();
  }, []);

  function GetMacheneData() {
    GetList(machine)
      .then((response) => {
        setList(response);
        filterData(1, response);
        setPagination({ perPage: 6, page: 1, total: response.length });
      })
      .catch((err) => {});
  }

  function onClickCard(value) {
    setSelectMachine({ lat: value[0], lng: value[1], zoom: 12 });
    window.scrollTo(0, 0);
  }

  function handlePaginationChange(e, list) {
    filterData(e, list);
  }

  function filterData(value, machines) {
    const temp = [];
    const index = value - 1;
    for (
      let i = index * 6;
      i < (value * 6 > machines.length ? machines.length : value * 6);
      i++
    ) {
      temp.push(machines[i]);
    }
    setShowList(temp);
    setPagination({
      perPage: 6,
      page: value,
      total: searchData.length ? searchData.length : list.length,
    });
  }

  function onSearch(e) {
    const result = list.filter(
      (value) =>
        value.machine_name
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );

    setShowList(result);
    filterData(1, result);
    setSearchData(result);
    setPagination({ perPage: 6, page: 1, total: result.length });
  }

  function handleClickViewProduct(e, value) {
    e.preventDefault();

    navigate(`/machine/${value._id}/product`);
  }

  return (
    <>
      <div style={{ height: "600px", width: "100%" }}>
        <Title>Dashboard</Title>
        <GoogleMap machineList={list} selectMachine={selectMachine} />
      </div>
      <Space align="baseline">
        <Title style={{ marginTop: 80 }}>Vending Machine List</Title>
        <Search
          placeholder="Name"
          onChange={onSearch}
          style={{ width: 200, marginTop: -8, marginLeft: 10 }}
        />
      </Space>
      <Row
        gutter={[16, 16]}
        style={{ padding: 30, background: "#ececec", borderRadius: 10 }}
      >
        {!showList.length ? (
          <div
            style={{
              display: "flex",
              width: "96vw",
              // height: "100vh",
              justifyContent: "center",
            }}
          >
            <Empty />
          </div>
        ) : (
          showList?.map((value, index) => {
            return (
              <Col
                key={value.machine_name + index}
                span={8}
                style={{ cursor: "pointer" }}
                onClick={() => onClickCard(value.machine_location)}
              >
                <Card
                  key={value.machine_name + index}
                  cover={
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 10,
                      }}
                    >
                      <Image
                        width={200}
                        alt="example"
                        src={value.machine_image}
                        onClick={(e) => e.preventDefault()}
                      />
                    </div>
                  }
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {value.machine_name}
                      <Space
                        onClick={(e) => handleClickViewProduct(e, value)}
                        style={{ height: 30, fontSize: 14 }}
                      >
                        <FolderViewOutlined style={{ fontSize: 18 }} /> View
                        Products
                      </Space>
                    </div>
                  }
                  bordered={false}
                  style={{ borderRadius: 10 }}
                >
                  <Detail
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      marginTop: -10,
                    }}
                  >
                    Detail :
                  </Detail>
                  <Detail
                    style={{
                      marginLeft: 20,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {value.machine_detail}
                  </Detail>
                  <Detail style={{ fontWeight: "bold", color: "black" }}>
                    Location :
                  </Detail>
                  <Detail style={{ marginLeft: 20 }}>
                    Latitude : {value.machine_location[0]}
                  </Detail>
                  <Detail style={{ marginLeft: 20 }}>
                    Longitude : {value.machine_location[0]}
                  </Detail>
                  <Detail style={{ fontWeight: "bold", color: "black" }}>
                    Status :
                  </Detail>
                  <Detail style={{ marginLeft: 20, fontWeight: "bold" }}>
                    {value.status === "active" ? (
                      <p style={{ color: "lightgreen" }}>Active</p>
                    ) : (
                      <p style={{ color: "red" }}>InActive</p>
                    )}
                  </Detail>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
      <Pagination
        current={pagination.page}
        defaultCurrent={1}
        total={pagination.total}
        pageSize={pagination.perPage}
        style={{ marginTop: 20, textAlign: "right" }}
        onChange={(e) =>
          handlePaginationChange(e, searchData.length ? searchData : list)
        }
      />
    </>
  );
}

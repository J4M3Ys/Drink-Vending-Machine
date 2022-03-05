import { UserContext } from "core/services/hook/context/store";
import React, { useContext, useEffect, useState } from "react";
import { Badge, Avatar, Menu, Dropdown, Space, Image, Empty } from "antd";
import {
  NotifyContainer,
  Container,
  NotifyContent,
  Title,
  NotifyTitle,
  NotifyDetail,
} from "./user.style";
import { NotificationOutlined } from "@ant-design/icons";
import { Logout } from "core/util/logout";
import { ReadNotify, GetUserData } from "core/services/collections/Generic";
import { read_notify, user } from "core/config/schemas";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [me, setMe] = useContext(UserContext);
  const [unread, setUnread] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    checkUnread(me?.notify);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  function checkUnread(notify) {
    if (!me) return;

    let unread = 0;

    notify?.map((value) => {
      if (value.status === "unread") {
        unread = unread + 1;
      }
      return setUnread(unread);
    });
  }

  function readNotify(value, index) {
    const params = {
      id: me._id,
      index: index,
    };
    ReadNotify(read_notify, params)
      .then((response) => {
        if (response.code === 200) {
          setUnread((e) => (e = e - 1));
          navigate(`/machine/${value.machine_id}/product`);
          GetUserData(user).then((response) => {
            if (response.code === 200) {
              setMe(response.data);
            }
          });
        }
      })
      .catch((err) => {});
  }

  const menu = (
    <Menu>
      <Title>Notifications</Title>
      <Menu.Divider />
      <NotifyContent>
        <NotifyContainer>
          {!me?.notify?.length ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            me?.notify?.map((value, index) => {
              return (
                <div key={value + index}>
                  <Menu.Item
                    style={{
                      height: 170,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 250px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => readNotify(value, index)}
                    >
                      <Image width={100} src={value.product_image} />
                      <div
                        style={{
                          borderLeft: "1px solid lightgray",
                          paddingLeft: 15,
                          paddingBottom: 20,
                        }}
                      >
                        <NotifyTitle>Product less than 10 piece</NotifyTitle>
                        <a>
                          <NotifyDetail>
                            Product : <b>{value.product_name}</b>
                          </NotifyDetail>
                          <NotifyDetail>
                            Amount : <b>{value.product_amount} piece </b>
                          </NotifyDetail>
                          <NotifyDetail>
                            Machine : <b>{value.machine_name}</b>
                          </NotifyDetail>
                          <NotifyDetail>Location :</NotifyDetail>
                          <NotifyDetail style={{ marginLeft: 20 }}>
                            Latitude : <b>{value.machine_location[0]}</b>
                          </NotifyDetail>
                          <NotifyDetail style={{ marginLeft: 20 }}>
                            Longitude : <b>{value.machine_location[1]}</b>
                          </NotifyDetail>
                        </a>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Divider />
                </div>
              );
            })
          )}
        </NotifyContainer>
      </NotifyContent>
      {me?.notify?.length ? (
        <Menu.Item
          style={{
            height: 30,
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
            textAlign: "center",
            backgroundColor: "#1DA57A",
          }}
        >
          Clear All
        </Menu.Item>
      ) : null}
    </Menu>
  );

  const avata = (
    <Menu>
      <Menu.Item>
        <Container onClick={() => Logout()}>Logout</Container>
      </Menu.Item>
    </Menu>
  );
  return (
    <Space size="large" align="baseline">
      <Badge count={unread}>
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <NotificationOutlined style={{ fontSize: 20 }} />
        </Dropdown>
      </Badge>

      <Dropdown overlay={avata} placement="bottomLeft" arrow>
        <Avatar shape="square" size="large" />
      </Dropdown>
    </Space>
  );
}

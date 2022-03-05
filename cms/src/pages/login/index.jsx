import React, { useContext, useEffect } from "react";
import { Form, Button, Input, Divider, Space, message } from "antd";
import { Content, Container, Title } from "./login.style";
import { useNavigate } from "react-router-dom";
import { Login } from "core/services/collections/Generic";
import { login } from "core/config/schemas";
import { UserContext } from "core/services/hook/context/store";

export default function Index() {
  const [me, setMe] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  async function handleLogin(values) {
    message.loading({ content: "Loading...", key: "login" });
    Login(login, values)
      .then((response) => {
        if (response.code === 200) {
          localStorage.setItem("token", response.data.token);
          message
            .loading({ content: "Loading...", key: "login", duration: 1 })
            .then(() => {
              setMe(response.data);
              message.success({ content: "Logined !", key: "login" });
              navigate("/");
            });
        } else {
          message.warning({ content: response.message, key: "login" });
        }
      })
      .catch((err) => {
        message.error({ content: err.message, key: "login" });
      });
  }

  return (
    <Container>
      <Content>
        <Title>Login</Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Divider />
          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button type="primary" htmlType="submit" style={{ width: 150 }}>
                Sing in
              </Button>
              <Button
                style={{ width: 150 }}
                onClick={() => navigate("/register")}
              >
                Sing up
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
}

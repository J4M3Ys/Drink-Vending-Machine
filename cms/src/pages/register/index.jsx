import React, { useEffect, useRef } from "react";
import { Form, Button, Input, Divider, Space, message } from "antd";
import { Content, Container, Title } from "./login.style";
import { useNavigate } from "react-router-dom";
import { CreateData } from "core/services/collections/Generic";
import { user } from "core/config/schemas";
import { CaretLeftOutlined } from "@ant-design/icons";

export default function Index() {
  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  async function handleRegister(values) {
    console.log("values :>> ", values);
    const params = {
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      role: "admin",
      status: "active",
    };
    CreateData(user, params)
      .then((response) => {
        if (response.code === 201) {
          message
            .loading({
              content: "Loading...",
              key: "register",
              duration: 1,
            })
            .then(() => {
              message.success({ content: "Register success", key: "register" });
              navigate("/login");
            });
        } else {
          message.error({
            content: "Register error please try again.",
            key: "register",
          });
        }
      })
      .catch((err) => {
        message.error({
          content: "Register error please try again.",
          key: "register",
        });
      });
  }

  return (
    <Container>
      <Content>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CaretLeftOutlined
            style={{ fontSize: "24px", marginTop: -15 }}
            onClick={() => navigate("/login")}
          />
          <Title>Register</Title>
        </div>
        <Form layout="vertical" onFinish={handleRegister} ref={formRef}>
          <Space>
            <Form.Item
              label="First Name"
              name="first_name"
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Space>
          <Form.Item
            label="E-mail"
            name="email"
            hasFeedback
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirm"
            hasFeedback
            dependencies={["password"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>

          <Divider />
          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button type="primary" htmlType="submit" style={{ width: 150 }}>
                Confirm
              </Button>
              <Button
                style={{ width: 150 }}
                onClick={() => formRef?.current?.resetFields()}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </Container>
  );
}

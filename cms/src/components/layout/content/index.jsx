import React from "react";
import { Layout } from "antd";
import "./content.less";
const { Content } = Layout;

export default function Index({ content }) {
  return <Content className="site-layout-content">{content}</Content>;
}

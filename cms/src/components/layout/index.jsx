import { Layout, Menu, Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { menu } from "./menu";
import React, { useEffect } from "react";
import Routes from "components/routes";
import PageContent from "components/layout/content";
import Avata from "components/layout/avata";
import "./layout.less";

const { Sider, Content, Footer, Header } = Layout;

function Index() {
  const location = useLocation();

  const [pathName, setPathName] = React.useState();

  useEffect(() => {
    setPathName(
      location.pathname.split("/").length === 2
        ? location.pathname.split("/")[1] === ""
          ? ["Home"]
          : location.pathname.split("/")
        : location.pathname.split("/")
    );
  }, [location.pathname]);

  const onClickMenu = (path) => {
    let currPath = path.split("/");
    if (currPath.length === 1) {
      currPath = ["Home"];
    }
    setPathName(currPath);
  };

  function getCurrentMenu() {
    const currPath = window.location.pathname.split("/");
    return `/${currPath[1]}`;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible={false}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={getCurrentMenu} mode="inline">
          {menu.map((value) => {
            return (
              <Menu.Item key={value.path} icon={value.icon}>
                <Link onClick={() => onClickMenu(value.path)} to={value.path}>
                  {value.name}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 20px 0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            {pathName?.map((path, index) => {
              return (
                path && (
                  <Breadcrumb.Item
                    key={path + index}
                    style={{ textTransform: "capitalize" }}
                  >
                    {path}
                  </Breadcrumb.Item>
                )
              );
            })}
          </Breadcrumb>
          <Avata />
        </Header>
        <Content style={{ padding: "30px 30px 0px 30px" }}>
          <PageContent content={<Routes />} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          SCG Tesing Vending Machine System CMS ©2022 Created By Charakorn
          Purithewes.
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Index;

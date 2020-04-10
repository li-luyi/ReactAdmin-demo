import React, { Component } from "react";
import memoryUtils from "../../utils/memoryUtils";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer style={{ color: "rgb(204, 204, 204)", textAlign: "center" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

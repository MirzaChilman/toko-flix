import * as React from "react";
import { Layout } from "antd";
const { Content } = Layout;

const Home = () => {
  return (
    <Content
      style={{ padding: "0 50px", marginTop: 64, backgroundColor: "#323232" }}
    >
      <div
        style={{
          padding: 24,
          margin: "32px 0",
          minHeight: 380,
          color: "white",
        }}
      >
        Content
      </div>
    </Content>
  );
};

export default Home;

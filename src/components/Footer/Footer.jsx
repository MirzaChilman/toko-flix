import * as React from "react";
import { Layout } from "antd";
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center", backgroundColor: "#323232", color: "white" }}>
      Ant Design ©2018 Created by Ant UED
    </AntFooter>
  );
};

export default Footer;

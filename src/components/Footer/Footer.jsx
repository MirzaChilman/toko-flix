import * as React from "react";
import { Layout } from "antd";
import { background_color_main } from "../../colors";
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: "center",
        backgroundColor: background_color_main,
        color: "white",
      }}
    >
      Toko Flix ©2020 Created by Ant UED
    </AntFooter>
  );
};

export default Footer;

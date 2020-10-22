import * as React from "react";
import { Layout, Breadcrumb, Menu, Image } from "antd";
const { Header: AntHeader } = Layout;

const menus = [
  {
    label: "Popular",
    to: "/popular",
  },
  {
    label: "Now Playing",
    to: "/now-playing",
  },
];

const Header = () => {
  return (
    <AntHeader
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item
          style={{
            height: "auto",
            width: "100px",
          }}
          key="0"
        >
          <Image
            src={
              "https://raw.githubusercontent.com/MirzaChilman/mini-project/master/src/assets/Netflix-logo.png"
            }
            preview={false}
          />
        </Menu.Item>
        {menus.map((menu, index) => {
          return <Menu.Item key={index+1}>{menu.label}</Menu.Item>;
        })}
      </Menu>
    </AntHeader>
  );
};

export default Header;

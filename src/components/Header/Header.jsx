import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Image } from "antd";
const { Header: AntHeader } = Layout;

const menus = [
  { label: "Popular", to: "/movies/popular"},
  { label: "Now Playing", to: "/movies/now-playing" },
  { label: "My movies", to: "/my-account/favorites" },
];

const Header = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <AntHeader
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeTab]}
        onClick={(event) => setActiveTab(event.key)}
      >
        <Menu.Item
          style={{
            height: "auto",
            width: "100px",
          }}
          key="0"
        >
          <Link to={"/"}>
            <Image
              src={
                "https://raw.githubusercontent.com/MirzaChilman/mini-project/legacy/src/assets/Netflix-logo.png"
              }
              preview={false}
            />
          </Link>
        </Menu.Item>
        {menus.map((menu, index) => {
          return (
            <Menu.Item key={index + 1}>
              <Link to={menu.to}>{menu.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </AntHeader>
  );
};

export default Header;

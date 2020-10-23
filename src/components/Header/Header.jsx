import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Layout,
  Menu,
  Image,
  Button,
  Modal,
  Input,
  Typography,
  notification,
} from "antd";

const { Text } = Typography;
const { Header: AntHeader } = Layout;

const menus = [
  {
    label: "Popular",
    to: "/movies/popular",
  },
  {
    label: "Now Playing",
    to: "/movies/now-playing",
  },
  {
    label: "My movies",
    to: "/my-movies",
  },
];

const Header = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [credit, setCredit] = useState(null);
  const [availableCredit, setAvailableCredit] = useState(
    localStorage.getItem("credit") || 0
  );

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const renderAddCreditModal = () => {
    const addCreditBalance = () => {
      try {
        const totalCredit = Number(credit) + Number(availableCredit);
        setAvailableCredit(totalCredit);
        localStorage.setItem("credit", totalCredit);
        openNotificationWithIcon(
          "success",
          "Success",
          "Your credit balance successfully added"
        );
      } catch (e) {
        console.error(e);
        openNotificationWithIcon(
          "error",
          "Error",
          "Something Wrong went adding credit balance"
        );
      }
    };
    return (
      <Modal
        title={"Add Balance"}
        visible={modalVisible}
        onOk={addCreditBalance}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          type={"number"}
          placeholder={"50000"}
          value={credit}
          onChange={(event) => setCredit(event.target.value)}
        />
      </Modal>
    );
  };

  return (
    <>
      <AntHeader
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div className="logo" />
        <Row>
          <Col lg={20}>
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
                <Image
                  src={
                    "https://raw.githubusercontent.com/MirzaChilman/mini-project/master/src/assets/Netflix-logo.png"
                  }
                  preview={false}
                />
              </Menu.Item>
              {menus.map((menu, index) => {
                return (
                  <Menu.Item key={index + 1}>
                    <Link to={menu.to}>{menu.label}</Link>
                  </Menu.Item>
                );
              })}

              <Button
                danger
                type="primary"
                ghost
                onClick={() => setModalVisible(true)}
              >
                Add Balance
              </Button>
            </Menu>
          </Col>
          <Col lg={4}>
            <Text
              style={{
                color: "white",
              }}
            >
              Credit: {availableCredit}
            </Text>
          </Col>
        </Row>
      </AntHeader>
      {renderAddCreditModal()}
    </>
  );
};

export default Header;

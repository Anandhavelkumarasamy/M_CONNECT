import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import { LogoutOutlined, UpOutlined } from "@ant-design/icons";
import { Col, Modal, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "antd/dist/reset.css";
import dashboardimage from "../Assests/Png/dashboardicon-removebg-preview.png";
import alertimage from "../Assests/Png/alerticon-removebg-preview.png";
import deviceimage from "../Assests/Png/deviceicon-removebg-preview.png";
import failurereportimage from "../Assests/Png/failureanalysisicon-removebg-preview.png";
import notificationimage from "../Assests/Png/notificationicon-removebg-preview.png";
import reportkimage from "../Assests/Png/reportkicon-removebg-preview.png";
import reportimage from "../Assests/Png/reportsicon-removebg-preview.png";
import timingimage from "../Assests/Png/timingicon-removebg-preview.png";
import usericonimage from "../Assests/Png/usericon-removebg-preview.png";
import bellimage from "../Assests/Png/bell.png";
import settingimage from "../Assests/Png/setting.png";
import userimage from "../Assests/Png/user.png";
import MConnectLogo from "../Assests/Png/Mconneclogo.png";
import classes from "../SharedComponents/Navbar.module.css";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const [showInputs, setShowInputs] = useState(false);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };
  const handleClose = () => {
    setShowInputs(false);
  };

  useEffect(() => {
    const savedOpenKeys = sessionStorage.getItem("dropdown_openKeys");
    if (savedOpenKeys) {
      setOpenKeys(JSON.parse(savedOpenKeys));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logintoken");
    sessionStorage.removeItem("select_key");
    sessionStorage.removeItem("dropdown_openKeys");
    navigate("/login");
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
    sessionStorage.setItem("dropdown_openKeys", JSON.stringify(keys));
  };

  const handleSelect = ({ key }: { key: string }) => {
    sessionStorage.setItem("select_key", key);
  };

  const selection = sessionStorage.getItem("select_key");
  if (selection === "9") {
    sessionStorage.setItem("select_key", "1");
  }

  return (
    <>
      <Helmet>
        <title>Navbar</title>
        <meta name="keywords" content="dashboard,dash,home" />
      </Helmet>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
          style={{ position: "fixed", height: "100vh" }}
          breakpoint="md"
          collapsedWidth={80}
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          <Row
            className="m-0"
            style={{
              padding: "20px",
              textAlign: "center",
              marginLeft: "0px",
            }}
          >
            <Col>
              <img
                src={MConnectLogo}
                alt="Mconnect Logo"
                style={{
                  width: collapsed ? "80%" : "80%",
                }}
              />
            </Col>
            {!collapsed && (
              <Col lg={7}>
                <p
                  className="text-black fw-bold mt-3 text-start fs-5 "
                  // style={{
                  //   width: collapsed ? "60%" : "100%",
                  //   marginTop: "25px",
                  // }}
                >
                  M-Power
                </p>
              </Col>
            )}
          </Row>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[String(selection)]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onSelect={handleSelect}
          >
            <Menu.Item
              key="1"
              icon={
                <img
                  src={dashboardimage}
                  alt="icon"
                  style={{ width: 16, height: 16 }}
                />
              }
            >
              <Link to="/navbar/dashboard" style={{ textDecoration: "none" }}>
                Dashboard
              </Link>
            </Menu.Item>

            <Menu.Item
              key="2"
              icon={
                <img
                  src={deviceimage}
                  alt="icon"
                  style={{ width: 16, height: 16 }}
                />
              }
            >
              <Link to="/dashboard/leads" style={{ textDecoration: "none" }}>
                Device
              </Link>
            </Menu.Item>

            <Menu.Item
              key="3"
              icon={
                <img
                  src={usericonimage}
                  alt="icon"
                  style={{ width: 16, height: 16 }}
                />
              }
            >
              <Link to="/dashboard/leads" style={{ textDecoration: "none" }}>
                User
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub1"
              icon={
                <img
                  src={reportimage}
                  alt="icon"
                  style={{ width: 16, height: 16 }}
                />
              }
              title="Reports"
            >
              <Menu.Item
                key="4"
                icon={
                  <img
                    src={reportkimage}
                    alt="icon"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                <Link
                  to="/dashboard/mastercategory"
                  style={{ textDecoration: "none" }}
                >
                  Reading Report
                </Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={
                  <img
                    src={reportkimage}
                    alt="icon"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                <Link
                  to="/dashboard/masterenquiry"
                  style={{ textDecoration: "none" }}
                >
                  Consumption Report
                </Link>
              </Menu.Item>
              <Menu.Item
                key="6"
                icon={
                  <img
                    src={timingimage}
                    alt="icon"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                <Link
                  to="/navbar/historyreport"
                  style={{ textDecoration: "none" }}
                >
                  History Report
                </Link>
              </Menu.Item>
              <Menu.Item
                key="7"
                icon={
                  <img
                    src={notificationimage}
                    alt="icon"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                <Link
                  to="/navbar/notificationreport"
                  style={{ textDecoration: "none" }}
                >
                  Notification Report
                </Link>
              </Menu.Item>
              <Menu.Item
                key="8"
                icon={
                  <img
                    src={alertimage}
                    alt="icon"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                <Link
                  to="/dashboard/masterrequirements"
                  style={{ textDecoration: "none" }}
                >
                  Alert Report
                </Link>
              </Menu.Item>
              <Menu.Item
                key="9"
                icon={
                  <img
                    src={failurereportimage}
                    alt="icon"
                    style={{ width: 16, height: 16 }}
                  />
                }
              >
                <Link
                  to="/navbar/failureanalysis"
                  style={{ textDecoration: "none" }}
                >
                  Failure Analysis
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item
              key="10"
              icon={
                <img
                  src={timingimage}
                  alt="icon"
                  style={{ width: 16, height: 16 }}
                />
              }
            >
              <Link
                to="/dashboard/listdashboard"
                style={{ textDecoration: "none" }}
              >
                Subscription
              </Link>
            </Menu.Item>

            <Menu.Item
              key="11"
              icon={<LogoutOutlined className="text-warning" />}
            >
              <Button
                type="link"
                onClick={handleLogout}
                className={selection === "11" ? "text-black" : "text-white"}
                style={{ marginRight: "50px" }}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
          <Header
            style={{
              backgroundColor: "white",
              padding: 0,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: 0,
              zIndex: 1000,
            }}
          >
            <Row className="ms-1">
              <Col lg={8} md={6} className="d-flex align-items-center">
                <h5 className={`mx-3 ${classes.dashboardheader}`}>
                  {selection === "1" ? "DashBoard" : "Report"}
                </h5>
                <Row lg={12} className=" d-none d-lg-flex">
                  <Col>
                    <Input
                      placeholder="Search..."
                      className="text-start mx-2"
                    />
                  </Col>
                  <Col>
                    <Input placeholder="Another Input..." />
                  </Col>
                </Row>
              </Col>
              <Col
                lg={4}
                md={6}
                className="d-flex justify-content-end align-items-center"
              >
                <div className="d-lg-none d-flex align-items-center">
                  {showInputs ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Modal
                        show={showInputs}
                        onHide={handleClose}
                        animation={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {selection === "1" ? "DashBoard" : "Report"}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Input
                            placeholder="Search..."
                            className="d-flex justify-content-center align-items-center w-75"
                          />
                          <br></br>
                          <Input
                            placeholder="Another Input..."
                            className="d-flex justify-content-center align-items-center w-75"
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button className="bg-primary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  ) : (
                    <UpOutlined
                      onClick={toggleInputs}
                      style={{
                        cursor: "pointer",
                        fontSize: "10px",
                        border: "2px solid black",
                        borderRadius: "50%",
                        padding: "5px",
                        display: "inline-block",
                      }}
                    />
                  )}
                </div>
                <img
                  src={bellimage}
                  height={20}
                  className="mx-2"
                  alt="Notification"
                />
                <img
                  src={settingimage}
                  className="mx-2"
                  height={20}
                  alt="Settings"
                />
                <p className="mb-0 mx-2">Mae User</p>
                <img src={userimage} className="mx-2" height={20} alt="User" />
              </Col>
            </Row>
          </Header>

          <Content
            style={{
              margin: "16px",
              padding: "24px",
              background: "#fff",
              minHeight: 280,
            }}
          >
            {/* <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}></div> */}

            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Navbar;

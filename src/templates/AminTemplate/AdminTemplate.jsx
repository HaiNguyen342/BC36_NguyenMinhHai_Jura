import React, { Fragment, useEffect, useState } from "react";
import { Route } from "react-router";
import {
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "./AdminTemplate.css";
import { NavLink } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import _ from "lodash";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config";
import { useSelector } from "react-redux";
import { history } from "../../App";

const { Header, Sider, Content } = Layout;

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  let user = {};
  if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
  }
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    //scroll to top javascript
    window.scrollTo(0, 0);
  });

  const operations = (
    <Fragment>
      {!_.isEmpty(user) ? (
        <Fragment>
          {" "}
          <button
            onClick={() => {
              history.push("/admin");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {user.email.substr(0, 1)}
            </div>
          </button>{" "}
          Hello! <span className="text-success mr-2">{user.name}</span>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(ACCESS_TOKEN);
              history.push("/");
              window.location.reload();
            }}
            className="btn btn-success"
          >
            Đăng xuất
          </button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                  <img
                    src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                    alt="..."
                  />
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  items={[
                    {
                      key: "1",
                      icon: <UserOutlined />,
                      label: <NavLink to="/admin">User Management</NavLink>,
                    },
                    {
                      key: "2",
                      icon: <VideoCameraOutlined />,
                      label: (
                        <NavLink to="/projectmanagement">
                          Project management
                        </NavLink>
                      ),
                    },
                    {
                      key: "3",
                      icon: <UploadOutlined />,
                      label: (
                        <NavLink to="/createproject">Create project</NavLink>
                      ),
                    },
                    {
                      key: "4",
                      icon: <HomeOutlined />,
                      label: <NavLink to="/home">Back to Home</NavLink>,
                    },
                  ]}
                />
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: "10px" }}
                >
                  <div className="text-right pr-10 pt-1">{operations}</div>
                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  <Component {...propsRoute} />
                </Content>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;

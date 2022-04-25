import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import AppLogo from "./AppLogo";
import { NavLink } from "react-router-dom";
import flattenNavURLs from "routes/routes";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onHandleCollapse = () => {
    setCollapsed(!collapsed);
  }

  return (
    <Sider key="sibar" collapsible collapsed={collapsed} onCollapse={onHandleCollapse}>
      <AppLogo />
      <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline">
        {
          flattenNavURLs.map((v, i) => {
            if (!v.show) return <React.Fragment key={i}></React.Fragment>;
            return (
              <React.Fragment key={i}>
                {
                  v.subMenu ? (
                    <SubMenu key={v.key} icon={<v.icon />} title={v.name}>
                      {
                        v.subMenu.map((v, i) => (
                          <Menu.Item key={v.key} icon={<v.icon />}>
                            <NavLink to={v.path}>{v.name}</NavLink>
                          </Menu.Item>
                        ))
                      }
                    </SubMenu>
                  ) : (
                    <Menu.Item key={i} icon={<v.icon />}>
                      <NavLink to={v.path}>{v.name}</NavLink>
                    </Menu.Item>
                  )
                }
              </React.Fragment>
            )
          }
          )}
      </Menu>
    </Sider>
  );
};

export default SideBar;

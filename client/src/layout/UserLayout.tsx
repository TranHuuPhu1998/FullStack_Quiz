import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const UserLayout: React.FC = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header></Header>
      <Content>{children}</Content>
      <Footer></Footer>
    </Layout>
  );
};

export default UserLayout;

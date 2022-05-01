import React from 'react';
import { Col, Layout, Row, Typography } from 'antd';
import { Link , NavLink} from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const UserLayout: React.FC = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <Row justify='space-between' align='middle'>
          <Col xxl={10} xl={10} lg={10} md={10} sm={14} xs={14}>
            <Typography.Title level={1} className='text-white mb-0'>QUIZ</Typography.Title>
            </Col>
          <Col xxl={5} xl={5} lg={5} md={5} sm={10} xs={10}>
            <NavLink className='text-primary m-2' to='/courses'>List Courses</NavLink>
            <NavLink className='text-primary m-2' to='/chat'>Group Chat</NavLink>
          </Col>
        </Row>
      </Header>
      <Content>{children}</Content>
      <Footer></Footer>
    </Layout>
  );
};

export default UserLayout;

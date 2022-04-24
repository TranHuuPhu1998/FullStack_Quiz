import { Layout } from 'antd';
import Footer from 'layout/AppFooter';
import SideBar from 'layout/AppSideBar';
import Header from 'layout/AppHeader';
import Breadcrumb from 'layout/AppBreadcrumb';
import styled from 'styled-components';

const { Content } = Layout;
const Container = styled.div`
  padding: 24px;
  background: #fff;
`;

const DashboardLayout:React.FC = ({children}) => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <SideBar/>
        <Layout>
          <Header/>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb/>
            <Container>
              {children}
            </Container>
          </Content>
          <Footer />
        </Layout>
      </Layout>
  );
}

export default DashboardLayout;

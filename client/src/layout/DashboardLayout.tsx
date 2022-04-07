import { Layout } from 'antd';
import styled from 'styled-components';
import AppSider from './AppSideBar';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const { Content } = Layout;

const StyledContent = styled(Content)`
  overflow: hidden auto;
  max-height: calc(100vh - 149px);
`;

const DashboardContainer = styled.div`
  padding: 16px;
`

export const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <StyledContent>
          <DashboardContainer>
            {children}
          </DashboardContainer>
        </StyledContent>
        <AppFooter />
      </Layout>
    </Layout>
  )
};

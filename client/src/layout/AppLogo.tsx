import React from 'react';
import { Image, Divider, Row, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { URL_PAGE } from 'app-constants';

const AppLogo: React.FC = () => {
  const history = useHistory();
  const fullLogoURL = `${process.env.PUBLIC_URL}/logo_full.png`;

  return (
    <Row justify="center">
      <Space direction="vertical" size="small">
        <Divider type="vertical" />
        <Image
          style={{ cursor: 'pointer' }}
          src={fullLogoURL}
          width={100}
          preview={false}
          onClick={() => history.push(URL_PAGE.DASHBOARD)}
        />
        <Divider type="vertical" />
      </Space>
    </Row>
  );
};

export default AppLogo;

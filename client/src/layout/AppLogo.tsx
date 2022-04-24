import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Divider, Row, Space } from "antd";

const AppLogo: React.FC = () => {
  return (
    <Row justify="center">
      <Space direction="vertical" size="small">
        <Divider type="vertical" />
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 44, xl: 60, xxl: 60 }}
          icon={<AntDesignOutlined />}
        />
        <Divider type="vertical" />
      </Space>
    </Row>
  );
};

export default AppLogo;

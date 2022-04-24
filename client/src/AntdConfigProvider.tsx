import React from 'react';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/en_US';

const AntdConfigProvider: React.FC = ({ children }) => {
  return (
    <ConfigProvider locale={locale}>
      {children}
    </ConfigProvider>
  )
};

export default AntdConfigProvider;

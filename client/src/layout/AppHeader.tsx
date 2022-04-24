import { Layout } from 'antd';
import styled from 'styled-components';
import React from 'react';

const Header = styled(Layout.Header)`
  padding: 0;
  background: #fff;
`

const AppHeader:React.FC = () => {
  return (
    <Header/>
  )
}

export default AppHeader

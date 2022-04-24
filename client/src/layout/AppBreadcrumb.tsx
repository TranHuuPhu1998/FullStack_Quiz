import React from "react";
import { Breadcrumb } from "antd";
import styled from "styled-components";

const BreadcrumbStyle = styled(Breadcrumb)`
  margin: 16px 0;
`
const AppBreadcrumb:React.FC = () => {
  return (
    <BreadcrumbStyle>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </BreadcrumbStyle>
  );
};

export default AppBreadcrumb;

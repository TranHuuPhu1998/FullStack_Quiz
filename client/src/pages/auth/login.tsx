import React from "react";
import { Button, Row, Col, Typography, Image } from "antd";
import { Form, FormItem, Input , Checkbox } from "formik-antd";
import { Formik } from "formik";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { login } from "app/actions/auth";

const Login:React.FC = () => {
  const dispatch = useDispatch();

  return (
      <Row justify="space-between">
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Image
            preview={false}
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24} className="d-flex align-items-center">
          <Row justify="center" className="w-50">
          <Formik
            initialValues={{ account: "", password: "" }}
            onSubmit={(values, actions) => {
              const data = {
                account: values.account,
                password: values.password
              };
              dispatch(login(data));
              actions.setSubmitting(false);
            }}
          >
            <Form layout="vertical" autoComplete="off">
              <Row gutter={[4, 4]} justify="center">
                <Col span={24}>
                  <Typography.Title level={2}>
                    Welcome back
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Title level={5}>Login to the Dashboard</Typography.Title>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem name="account">
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} name="account" placeholder="Email or Name" />
                  </FormItem>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem name="password">
                    <Input size="large" prefix={<LockOutlined className="site-form-item-icon" />} name="password" placeholder="Password"  type="password"/>
                  </FormItem>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem name="remember" valuePropName="checked" noStyle>
                    <Checkbox name="remember">Remember me</Checkbox>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={[16, 16]} justify="end">
                <Col className="text-center" lg={24} md={24} sm={24} xs={24}>
                  <Button
                    className="w-100 mt-4"
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng Nhập
                  </Button>
                </Col>
              </Row>
            </Form>
          </Formik>
          </Row>
        </Col>
      </Row>
  );
};

export default Login;

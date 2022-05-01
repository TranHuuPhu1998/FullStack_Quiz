import React from "react";
import { Button, Row, Col, Typography } from "antd";
import { Form, FormItem, Input , Checkbox } from "formik-antd";
import { Formik } from "formik";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { login } from "app/actions/auth";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoginSchema } from "features/auth-login/validationSchema";
import { useHistory } from "react-router-dom";
import QuizAuth from "assets/images/quiz-auth.avif";

const Login:React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();

  return (
      <Row justify="space-between" className="h-100">
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24} className="h-100">
          <LazyLoadImage
            className="h-100"
            effect="blur"
            alt="Login"
            src={QuizAuth}
          />
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24} className="d-flex align-items-center">
          <Row justify="center" className="w-50">
          <Formik
            initialValues={{ account: "", password: "" }}
            validationSchema={LoginSchema(t)}
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
                    {t('Welcome_to_the_learning_management_system')}
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Title level={5}>{t('Login_to_the_dashboard')}</Typography.Title>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem name="account">
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} name="account" placeholder={t('Email_or_Email_address')} />
                  </FormItem>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem name="password">
                    <Input size="large" prefix={<LockOutlined className="site-form-item-icon" />} name="password" placeholder={t('Enter_your_password')}  type="password"/>
                  </FormItem>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem name="remember" valuePropName="checked" noStyle>
                    <Checkbox name="remember">{t('Remember_me')}</Checkbox>
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
                    {t('Login')}
                  </Button>
                </Col>
                <Col className="text-center" lg={24} md={24} sm={24} xs={24}>
                  <Button className="w-100" onClick={() => history.push('/register')}>Register Here</Button>
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

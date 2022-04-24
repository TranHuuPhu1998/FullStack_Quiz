import React from "react";
import { Button, Row, Col } from "antd";
import { Form, FormItem, Input } from 'formik-antd';
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateCategory } from "app/actions/category";

const EditCategory: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        dispatch(updateCategory(values));
        actions.setSubmitting(false);
      }}
    >
      <Form layout="vertical" autoComplete="off">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <FormItem name="name">
              <Input name="name" placeholder="Nhập vào thể loại" />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" justify="end">
          <Col xxl={2} xl={3} lg={24} md={24} sm={24} xs={24}>
            <Button type="primary" htmlType="submit" style={{ width:"100%" }}>
              Lưu
            </Button>
          </Col>
        </Row>
      </Form>
    </Formik>
  );
};

export default EditCategory;

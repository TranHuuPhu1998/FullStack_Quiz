import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'antd';
import { Form, FormItem, Input } from 'formik-antd';
import { Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from 'app/actions/category';
import { useHistory } from 'react-router-dom';
import { RootState } from 'app/reducers';
import { CrudState } from 'interfaces/common';
import { CategoryItem } from 'interfaces/features/CategoryEntity';
import { useTranslation } from 'react-i18next';
import { AddCategorySchema } from 'features/admin-categories/validationSchema';
import { URL_PAGE } from 'app-constants';
import PageContentBase from 'components/page-content/PageContentBase';

const AddCategory: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { status } = useSelector((state: RootState) => state.categoryReducers);

  const onSubmit = (values: CategoryItem, helpers: FormikHelpers<CategoryItem>) => {
    setLoading(true);
    dispatch(createCategory(values));
    helpers.setSubmitting(false);
  };

  useEffect(() => {
    if (status === CrudState.Succeed) {
      setLoading(false);
      history.push(URL_PAGE.CATEGORIES);
    }
  }, [history, status]);

  return (
    <PageContentBase title={t('Add_category')} useBack>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={AddCategorySchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
        validateOnBlur
        validateOnChange
        validateOnMount
      >
        {({ isValid }) => {
          return (
            <Form layout="vertical" autoComplete="off">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <FormItem name="name">
                    <Input suffix={<span />} name="name" placeholder={t('Please_enter_category')} />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={[16, 16]} align="middle" justify="end">
                <Col xxl={2} xl={3} lg={24} md={24} sm={24} xs={24}>
                  <Button
                    loading={loading}
                    disabled={!isValid}
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                  >
                    {t('Save')}
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </PageContentBase>
  );
};

export default AddCategory;

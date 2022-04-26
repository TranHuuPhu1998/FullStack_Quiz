import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'antd'
import { Form, FormItem, Input } from 'formik-antd'
import { Formik, FormikHelpers } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from 'app/actions/category'
import { useHistory, useParams } from 'react-router-dom'
import { getCategoryById } from 'app/actions/category'
import { CategoryItem } from 'interfaces/features/CategoryEntity'
import { RootState } from 'app/reducers'
import { CrudState } from 'interfaces/common'
import { useTranslation } from 'react-i18next'
import PageContentBase from 'components/page-content/PageContentBase'
import { AddCategorySchema } from './validationSchema'

const EditCategory: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [formDataInit, setFormDataInit] = useState<CategoryItem>({ name: '' })
  const { id } = useParams<{ id: string }>()
  const { data, status } = useSelector((state: RootState) => state.categoryReducers)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getCategoryById(id))
  }, [dispatch, id])

  useEffect(() => {
    setFormDataInit(data.at(0))
  }, [data])

  const onSubmit = (values: CategoryItem, actions: FormikHelpers<CategoryItem>) => {
    const data: CategoryItem = {
      name: values.name,
      id: id,
    }
    setLoading(true)
    dispatch(updateCategory(data))
    actions.setSubmitting(false)
  }

  useEffect(() => {
    if (status === CrudState.Updated) {
      setLoading(false)
      history.push('/admin/categories')
    }
  }, [history, status])

  return (
    <PageContentBase>
      <Formik
        initialValues={formDataInit}
        enableReinitialize
        validateOnBlur
        validateOnChange
        validateOnMount
        validationSchema={AddCategorySchema(t)}
        onSubmit={onSubmit}
      >
        {({ handleBlur, handleChange, isValid }) => {
          return (
            <Form layout="vertical" autoComplete="off">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <FormItem name="name">
                    <Input
                      suffix={<span />}
                      name="name"
                      placeholder="Nhập vào thể loại"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    />
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
          )
        }}
      </Formik>
    </PageContentBase>
  )
}

export default EditCategory

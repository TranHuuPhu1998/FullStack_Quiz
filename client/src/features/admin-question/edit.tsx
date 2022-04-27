import React, { useEffect, useState } from 'react';
import PageContentBase from 'components/page-content/PageContentBase';
import { Button, Row, Col } from 'antd';
import { Form, FormItem, Select } from 'formik-antd';
import { Field, FieldArray, Formik, FormikHelpers } from 'formik';
import { updateQuestion } from 'app/actions/question';
import Editor from 'react-simple-code-editor';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionItem } from 'interfaces/features/QuestionEntity';
import { t } from 'i18next';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { getCategory } from 'app/actions/category';
import * as prism from 'prismjs';
import { RootState } from 'app/reducers';
import { PAGE_INFO_MAX } from 'app-constants';
import { coverListToOption } from 'utils/coverData';
import { getListCourse } from 'app/actions/course';
import { CrudState, OptionEntity } from 'interfaces/common';
import { useHistory, useParams } from 'react-router-dom';
import { URL_PAGE } from 'app-constants';
import { getQuestionById } from 'app/actions/question';
import { UpdateQuestionSchema } from 'features/admin-question/validationSchema';
import { initialValues } from 'features/admin-question/initData';

const EditQuestion: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [formDataInit, setFormDataInit] = useState<QuestionItem>(initialValues);
  const [categories, setCategories] = useState<OptionEntity[]>([]);
  const [courses, setCourses] = useState<OptionEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.categoryReducers);
  const { data: courseData } = useSelector((state: RootState) => state.courseReducers);
  const { data: questionDatail, status } = useSelector(
    (state: RootState) => state.questionReducers
  );

  useEffect(() => {
    dispatch(getQuestionById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCategory(PAGE_INFO_MAX));
    dispatch(getListCourse(PAGE_INFO_MAX));
  }, [dispatch]);

  useEffect(() => {
    if (data?.length > 0 && courseData?.length > 0) {
      const categoryOption = coverListToOption(data);
      const courseOption = coverListToOption(courseData);
      setCourses(courseOption);
      setCategories(categoryOption);
    }
  }, [data, courseData]);

  useEffect(() => {
    if (status === CrudState.Updated) {
      setLoading(false);
      history.push(URL_PAGE.QUESTIONS);
    }
  }, [history, status]);

  useEffect(() => {
    if (questionDatail) {
      setFormDataInit(questionDatail);
    }
  }, [questionDatail]);

  const onSubmit = async (values: QuestionItem, helpers: FormikHelpers<QuestionItem>) => {
    setLoading(true);
    const data = {
      name: values.name,
      categoryId: values.categoryId,
      answers: values.answers,
      courseId: values.courseId,
      id: id,
    };
    dispatch(updateQuestion(data));
    setLoading(false);
  };

  return (
    <PageContentBase title={t('Edit_question')} useBack>
      <Formik
        initialValues={formDataInit}
        onSubmit={onSubmit}
        enableReinitialize
        validateOnBlur
        validateOnChange
        validateOnMount
        validationSchema={UpdateQuestionSchema(t)}
      >
        {({ setFieldValue, values }) => (
          <Form layout="vertical" autoComplete="off">
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <FormItem name="categoryId" label={t('Please_choose_category')}>
                  <Select
                    name="categoryId"
                    options={categories}
                    showSearch
                    allowClear
                    filterOption={(input, options) => {
                      const label = options.label as string;
                      return !!(
                        label?.toLowerCase().trim().indexOf(input.toLowerCase().trim()) >= 0
                      );
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name="courseId" label={t('Please_choose_course')}>
                  <Select
                    name="courseId"
                    options={courses}
                    showSearch
                    allowClear
                    filterOption={(input, options) => {
                      const label = options.label as string;
                      return !!(
                        label?.toLowerCase().trim().indexOf(input.toLowerCase().trim()) >= 0
                      );
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name="name" label={t('Please_enter_question')}>
                  <Editor
                    aria-rowcount={3}
                    aria-colcount={3}
                    value={values.name || ''}
                    name="name"
                    onValueChange={(code) => setFieldValue('name', code)}
                    highlight={(code) => prism.highlight(code, prism.languages.js, 'js')}
                    padding={10}
                    placeholder={t('Please_enter_code_hear')}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      border: '1px solid',
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name="answers" label={t('Please_enter_answer')}>
                  <FieldArray
                    name="answers"
                    render={(arrayHelpers) => (
                      <div>
                        {values?.answers?.map(({ id, content, isCorrect }, index) => (
                          <Row key={index} className="mt-3">
                            <Col xl={19} xxl={19} lg={24} md={24} sm={24}>
                              <Field
                                className="form-control"
                                name={`answers[${index}].content`}
                                placeholder={`Enter the content of the answer ${index + 1} here`}
                              />
                              <Field hidden name={`answers[${index}].id`} placeholder="u" />
                            </Col>
                            <Col
                              xl={5}
                              xxl={5}
                              lg={24}
                              md={24}
                              sm={24}
                              className="d-flex justify-content-end "
                            >
                              <Button
                                className="h-100 ml-2"
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Delete
                              </Button>
                              <Button
                                className="h-100 ml-2"
                                type="dashed"
                                icon={isCorrect ? <CloseOutlined /> : <CheckOutlined />}
                                onClick={() =>
                                  arrayHelpers.replace(index, {
                                    id: id,
                                    content: content,
                                    isCorrect: !isCorrect,
                                  })
                                }
                              >
                                {isCorrect === false ? t('Check') : t('Uncheck')}
                              </Button>
                            </Col>
                          </Row>
                        ))}

                        <Row className="mt-3">
                          <Col xl={19} xxl={19} lg={24} md={24} sm={24} xs={24}>
                            <Button
                              size="large"
                              type="dashed"
                              className="w-100"
                              icon={<PlusCircleOutlined />}
                              block
                              onClick={() =>
                                arrayHelpers.push({ content: '', id: nanoid(), isCorrect: false })
                              }
                            >
                              {t('Add_question')}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}
                  />
                </FormItem>
              </Col>
            </Row>

            <Row justify="end" className="mt-4">
              <Col xl={5} xxl={5} lg={24} md={24} sm={24}>
                <Button
                  loading={loading}
                  icon={<PlusSquareOutlined />}
                  color="primary"
                  className="text-capitalize w-100"
                  htmlType="submit"
                >
                  {t('Update')}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </PageContentBase>
  );
};

export default EditQuestion;

import React, { useEffect, useState } from 'react';
import PageContentBase from 'components/page-content/PageContentBase';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row, Upload } from 'antd';
import { Form, FormItem, Select, Input, Checkbox } from 'formik-antd';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { initialValues } from 'features/admin-course/initData';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE_INFO_MAX, URL_PAGE } from 'app-constants';
import { getCategory } from 'app/actions/category';
import { RootState } from 'app/reducers';
import { coverListToOption } from 'utils/coverData';
import { CrudState, OptionEntity } from 'interfaces/common';
import { CourseItem } from 'interfaces/features/CourseEntity';
import { imageUpload } from 'common/helpers/ImageUpload';
import { getCourseById, updateCourse } from 'app/actions/course';
import { useHistory, useParams } from 'react-router-dom';
import { EditCourseSchema } from 'features/admin-course/validationSchema';
import ImgCrop from 'antd-img-crop';

const EditCourse: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [formDataInit, setFormDataInit] = useState<CourseItem>(initialValues);
  const [fileList, setFileList] = useState<any>([]);
  const [categories, setCategories] = useState<OptionEntity[]>([]);

  const { data } = useSelector((state: RootState) => state.categoryReducers);
  const { data: courseData, status } = useSelector((state: RootState) => state.courseReducers);
  console.log('🚀 ~ file: edit.tsx ~ line 34 ~ courseData', courseData);

  useEffect(() => {
    if (data?.length > 0) {
      const categoryOption = coverListToOption(data);
      setCategories(categoryOption);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getCategory(PAGE_INFO_MAX));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (status === CrudState.Updated) {
      setLoading(false);
      history.push(URL_PAGE.COURSES);
    }
  }, [history, status]);

  useEffect(() => {
    setFormDataInit(courseData);
    if (courseData?.imageBanner) {
      setFileList([
        {
          uid: '-1',
          name: 'imageBanner',
          status: 'done',
          url: courseData.imageBanner,
        },
      ]);
    }
  }, [courseData]);

  const onSubmit = async (values: CourseItem, helpers: FormikHelpers<CourseItem>) => {
    let responseUrlImage: string =
      'https://res.cloudinary.com/ifv/image/upload/v1647140311/blod-dev/obmyfj9dvwur3br7ett2.png;';

    if (fileList?.at(0)?.originFileObj) {
      responseUrlImage = await imageUpload(fileList.at(0).originFileObj);
    }
    if (fileList?.at(0)?.url) {
      responseUrlImage = fileList.at(0).url;
    }
    const data = {
      name: values.name,
      descriptions: values.descriptions,
      categoryId: values.categoryId,
      imageBanner: responseUrlImage,
      released: values.released,
      id: id,
    };
    dispatch(updateCourse(data));
    helpers.setSubmitting(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <PageContentBase title={t('Edit_Courese')} useBack>
      <Formik
        initialValues={formDataInit}
        onSubmit={onSubmit}
        enableReinitialize
        validateOnBlur
        validateOnChange
        validateOnMount
        validationSchema={EditCourseSchema(t)}
      >
        {() => (
          <Form layout="vertical" autoComplete="off">
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <FormItem name="name" label={t('Enter_course_name')}>
                  <Input prefix name="name" />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name="categoryId" label={t('Please_choose_category')}>
                  <Select
                    name="categoryId"
                    options={categories}
                    showSearch
                    allowClear
                    placeholder={t('Enter_category_name')}
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
                <FormItem name="descriptions" label={t('Please_enter_descrition')}>
                  <Input.TextArea
                    name="descriptions"
                    placeholder={t('Enter_course_discription')}
                    rows={3}
                  />
                </FormItem>
              </Col>

              <Col span={24}>
                <FormItem name="released">
                  <Checkbox name="released">{t('Is_released')}</Checkbox>
                </FormItem>
              </Col>
              <Col span={24}>
                <ImgCrop
                  aspect={1000 / 500}
                  rotate
                  modalWidth={500}
                  modalTitle={t('Upload_image_for_Course')}
                >
                  <Upload
                    maxCount={1}
                    multiple={false}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    style={{ width: '100%' }}
                  >
                    {t('Upload_image')}
                  </Upload>
                </ImgCrop>
              </Col>
            </Row>

            <Row justify="end" className="mt-4">
              <Col xl={5} xxl={5} lg={24} md={24} sm={24}>
                <Button
                  loading={loading}
                  icon={<SaveOutlined />}
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

export default EditCourse;

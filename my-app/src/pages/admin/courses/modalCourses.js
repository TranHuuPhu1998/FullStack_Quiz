import React , { useState , useEffect } from 'react';
import {
  Label,
  ModalHeader,
  Modal,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  ModalBody,
  Button
} from '@App/components';
import { createCourse } from '@App/app/actions/course';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';

const modalCourses = (props) => {
  const { isShow, handleClose, courseDetail , categories } = props;
  const [listCategories, setListCategories] = useState([]);

  const dispatch = useDispatch();

  const handleCloseResetFrom = () => {
    handleClose();
    formik.resetForm();
  };

  useEffect(() => {
    const resp = categories.map((item) => ({
      label: item.name,
      value: item._id
    }));
    setListCategories(resp);
  }, [categories]);

  const coverCategorySelect = (category) => {
    if (category) {
      return {
        value: category.id,
        label: category.name
      };
    }
  };

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      coursesName: courseDetail.name,
      categoryName: coverCategorySelect(courseDetail.category),
      release :courseDetail.released,
      descriptions:courseDetail.descriptions
    },
    validationSchema: Yup.object({
      coursesName: Yup.string().required('required')
    }),
    onSubmit: (values) => {
      const data = {
        name : values.coursesName,
        descriptions : values.descriptions,
        categoryId: values.categoryName.value,
        released : values.release
      }
      dispatch(createCourse(data))
      handleClose();
    }
  });

  return (
    <Modal centered isOpen={isShow} toggle={handleClose}>
      <ModalHeader> {courseDetail ? 'Update' : 'Create'} a Courses</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit} id='courses'>
        <FormGroup>
          <Label>Import Category Name:</Label>
            <Select
              id='categoryName'
              classNamePrefix='filter__dropdown'
              name='categoryName'
              isClearable
              options={listCategories}
              value={formik.values.categoryName || ''}
              onChange={(option) => formik.setFieldValue('categoryName', option)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Import Courses Name:</Label>
            <Input
              type='text'
              name='coursesName'
              id='coursesName'
              onChange={formik.handleChange}
              value={formik.values.coursesName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Import Release:</Label>
            <Input
                type='textarea'
                name='descriptions'
                id='descriptions'
                onChange={formik.handleChange}
                value={formik.values.descriptions}
                onKeyDown={handleKeyDown}
              />
          </FormGroup>
          <FormGroup>
            <Label check>Import Release:</Label>
            <Input
                type='checkbox'
                name='release'
                id='release'
                defaultChecked={formik.values.release}
                onChange={formik.handleChange}
                value={formik.values.release}
              />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className='d-flex justify-content-end'>
        <Button
          color='primary'
          className='text-capitalize w-25 mr-2'
          outline
          onClick={handleCloseResetFrom}
        >
          Cancel
        </Button>
        <Button
          color='primary'
          className='text-capitalize w-25'
          type='submit'
          form='courses'
        >
          {courseDetail ? 'Update' : 'Create'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default modalCourses;

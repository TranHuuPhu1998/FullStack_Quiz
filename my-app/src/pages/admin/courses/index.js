import React, { useEffect , useState } from 'react';
import { Table, PageTitle, Row, Col, Input, Button } from '@App/components';
import { getListCourse , deleteCourse } from '@App/app/actions/course';
import { getCategory } from '@App/app/actions/category';
import { useSelector , useDispatch } from 'react-redux';
import IconDelete from '@App/assets/img/icon-delete.svg';
import IconEdit from '@App/assets/img/icon-edit.svg';
import IconAdd from '@App/assets/img/icon-add.svg';
import ModalCourses from './modalCourses';

const Courses = () => {
  const [isShowModal , setIsShowModal] = useState(false);
  const [courseDetail , setCourseDetail] = useState({});
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseReducers);
  const categories = useSelector((state) => state.categoryReducers);

  useEffect(() => {
    dispatch(getListCourse());
    dispatch(getCategory());
  },[])

  const handleCreateCourse = () => {
    setIsShowModal(true);
    setCourseDetail('');
  };
  const handleUpdateCourse = (value) => {
    setIsShowModal(true);
    setCourseDetail(value);
  };
  const handleDeleteCourses = (id) => {
    dispatch(deleteCourse(id))
  }

  return (
    <>
      <PageTitle>COURSE MANAGEMENT</PageTitle>
      <Row className='d-flex justify-content-between mb-3'>
        <Col md='3'>
          <Input
            className='border w-md mr-3'
            placeholder='Search by Courses Name'
            defaultValue=''
          />
        </Col>
        <Col md='2'>
          <Button
            onClick={handleCreateCourse}
            color='primary'
            className='text-uppercase-fl w-100'
          >
            Create a Courses <img className='ml-2' src={IconAdd} />
          </Button>
        </Col>
      </Row>
      <Table striped dark bordered>
        <thead>
          <tr>
            <th>Banner</th>
            <th>Course Name</th>
            <th>Create By</th>
            <th>Category Name</th>
            <th>Released</th>
            <th>Created At</th>
            <th width={250}>Descriptions</th>
            <th width={100} className='text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            course?.map((item,index) => (
              <tr key={index}>
                <td width={200}><img src={item?.imageBanner}/></td>
                <td>{item.name}</td>
                <td>{item.createBy}</td>
                <td>{item.category?.name}</td>
                <td>{item.released ? 'Yes' : 'No'}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{item.descriptions.length > 250 ? item.descriptions.slice(0, 250)+'...' : item.descriptions}</td>
                <td className='text-center'>
                  <span
                    onClick={() => handleDeleteCourses(item._id)}
                    className='mr-2 pointer'
                  >
                    <img src={IconDelete}></img>
                  </span>
                  <span
                    onClick={() => handleUpdateCourse(item)}
                    className='pointer'
                  >
                    <img src={IconEdit}></img>
                  </span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <ModalCourses
        isShow={isShowModal}
        courseDetail={courseDetail}
        categories={categories}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </>
  );
};

export default Courses;

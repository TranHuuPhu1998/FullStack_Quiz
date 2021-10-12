import React, { useEffect, useState } from 'react';
import { Table, PageTitle, Row, Col, Input, Button } from '@App/components';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '@App/app/actions/category';
import { deleteCategory } from '@App/app/actions/category';
import ModalCreateCategory from './modalCategory';
import IconDelete from '@App/assets/img/icon-delete.svg';
import IconEdit from '@App/assets/img/icon-edit.svg';
import IconAdd from '@App/assets/img/icon-add.svg';

const Category = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducers);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleCreateCategory = () => {
    setIsShowModal(true);
    setCategoryDetails('');
  };

  const handleUpdateCategory = (category) => {
    setIsShowModal(true);
    setCategoryDetails(category);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <>
      <PageTitle>CATEGORY MANAGEMENT</PageTitle>
      <Row className='d-flex justify-content-between mb-3'>
        <Col md='3'>
          <Input
            className='border w-md mr-3'
            placeholder='Search by Question Name'
            defaultValue=''
          />
        </Col>
        <Col md='2'>
          <Button
            onClick={handleCreateCategory}
            color='primary'
            className='text-uppercase-fl w-100'
          >
            Create a Category <img className='ml-2' src={IconAdd} />
          </Button>
        </Col>
      </Row>
      <Table striped dark bordered>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Create By</th>
            <th>Created At</th>
            <th>Update At</th>
            <th width={100} className='text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.user}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td className='text-center'>
                <span
                  onClick={() => handleDeleteCategory(item._id)}
                  className='mr-2 pointer'
                >
                  <img src={IconDelete}></img>
                </span>
                <span
                  onClick={() => handleUpdateCategory(item)}
                  className='pointer'
                >
                  <img src={IconEdit}></img>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalCreateCategory
        isShow={isShowModal}
        categoryDetails={categoryDetails}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </>
  );
};

export default Category;

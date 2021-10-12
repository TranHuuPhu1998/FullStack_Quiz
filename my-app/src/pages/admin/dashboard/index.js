import React, { useEffect, useState } from 'react';
import {
  Table,
  PageTitle,
  CustomInput,
  Row,
  Col,
  Input,
  Button
} from '@App/components';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions, deleteQuestion } from '@App/app/actions/question';
import { getCategory } from '@App/app/actions/category';
import ModalCreateQuestion from './modalQuestion';
import IconDelete from '@App/assets/img/icon-delete.svg';
import IconEdit from '@App/assets/img/icon-edit.svg';
import IconAdd from '@App/assets/img/icon-add.svg';

const DashBoard = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [questionDetail, setQuestionDetail] = useState({});

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionReducers);
  const categories = useSelector((state) => state.categoryReducers);

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getCategory());
  }, []);

  const handleEditQuestion = (question) => {
    setQuestionDetail(question);
    setIsShowModal(true);
  };

  const handleNewQuestion = () => {
    setQuestionDetail('');
    setIsShowModal(true);
  };

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestion(id));
  };

  return (
    <>
      <PageTitle>DASHBOARD</PageTitle>
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
            onClick={handleNewQuestion}
            color='primary'
            className='text-uppercase-fl w-100'
          >
            Create a Question <img className='ml-2' src={IconAdd} />
          </Button>
        </Col>
      </Row>
      <div style={{ overflow: 'auto hidden' }}>
        <Table striped dark bordered size={1500}>
          <thead>
            <tr>
              <th width={300}>Question Name</th>
              <th width={130}>Create At</th>
              <th width={120}>Category</th>
              <th width={300}>Answer / Result</th>
              <th width={100} className='text-center'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {questions?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.category?.name}</td>
                <td>
                  {item.answers?.map((item, index) => (
                    <Row key={index}>
                      <Col md='10' className='mb-3'>
                        {item.content}
                      </Col>
                      <Col md='2' className='text-center'>
                        <CustomInput
                          type='radio'
                          id={`${item.content + index}`}
                          readOnly
                          checked={item.isCorrect === true}
                        />
                      </Col>
                    </Row>
                  ))}
                </td>
                <td className='text-center'>
                  <span
                    onClick={() => handleDeleteQuestion(item._id)}
                    className='mr-2 pointer'
                  >
                    <img src={IconDelete}></img>
                  </span>
                  <span
                    onClick={() => handleEditQuestion(item)}
                    className='pointer'
                  >
                    <img src={IconEdit}></img>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <ModalCreateQuestion
        isShow={isShowModal}
        questionDetail={questionDetail}
        categories={categories}
        handleClose={() => setIsShowModal(!isShowModal)}
      />
    </>
  );
};

export default DashBoard;

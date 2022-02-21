import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  ModalFooter,
  Input,
  Label,
  CustomInput
} from '@App/components';
import { useDispatch } from 'react-redux';
import { createQuestion, updateQuestion } from '@App/app/actions/question';
import { useFormik } from 'formik';
import { toastError } from '@App/app/common/helpers/toastHelper';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import Select from 'react-select';
import * as Yup from 'yup';

const ModalCreateQuestion = (props) => {
  const { isShow, handleClose, categories, questionDetail } = props;
  const [listCategories, setListCategories] = useState([]);
  const [listAnswers, setListAnswers] = useState([]);
  const [firstAnswers, setFirstAnswers] = useState('');
  const [answerNew, setAnswerNew] = useState(1);
  const [checkAnswer, setCheckAnswer] = useState(null);
  const [isAddLayoutAnswers, setIsLayoutAnswers] = useState(true);
  const [totalAddAnswer, setTotalAddAnswer] = useState(0);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const resp = categories.rows?.map((item) => ({
      label: item.name,
      value: item._id
    }));
    setListCategories(resp);
  }, [categories]);

  useEffect(() => {
    if (questionDetail._id) {
      setListAnswers(questionDetail.answers);
      setAnswerNew(1);
      setCode(questionDetail.name);
    }
  }, [questionDetail]);

  // handle input of List answer
  const handleChangeAns = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFirstAnswers({ id: Number(id), content: value, isCorrect: false });
    // when update answer question
    let _listAnswersUpdate = listAnswers;
    if (questionDetail._id) {
      listAnswers.map((item, index) => {
        if (Number(item.id) === Number(id)) {
          _listAnswersUpdate[index] = {
            content: value,
            id: id,
            isCorrect: false
          };
        }
      });
      setListAnswers(_listAnswersUpdate);
    }
  };

  // handle chose answer is true or false
  const handleChangeResult = (e) => {
    const id = e.currentTarget.id;
    const checkId = id.split('-');
    setCheckAnswer({ id: checkId.at(1) });
  };

  const handleCloseResetFrom = () => {
    handleClose();
    formik.resetForm();
    setCode('');
    setListAnswers([]);
    setAnswerNew(1);
    setIsLayoutAnswers(true);
    setFirstAnswers('');
    setCheckAnswer(null);
    setTotalAddAnswer(0)
  };

  const AddLayoutAnswer = () => {
    setAnswerNew((prev) => prev + 1);
    setIsLayoutAnswers(!isAddLayoutAnswers);
  };

  const coverCategorySelect = (category) => {
    if (category) {
      return {
        value: category.id,
        label: category.name
      };
    }
  };

  const AddAnswers = () => {
    if (firstAnswers) {
      const mergeListAnswer = [...listAnswers, firstAnswers];
      setListAnswers(mergeListAnswer);
      setIsLayoutAnswers(!isAddLayoutAnswers);
      setTotalAddAnswer((prev) => prev + 1);
      setFirstAnswers('');
    } else {
      toastError('Answer is required');
    }
  };

  const newArray = (number) => {
    return Array.from(Array(number).keys());
  };

  // handle when client update or new question
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: coverCategorySelect(questionDetail.category) || ''
    },
    validationSchema: Yup.object({
      category: Yup.object().required('required')
    }),
    onSubmit: async (values) => {
      const _isCheckIndex = checkAnswer.id;
      const res = listAnswers.map((item) => ({
        content: item.content,
        isCorrect: Number(item.id) === Number(_isCheckIndex),
        id: item.id
      }));
      const data = {
        name: code,
        categoryId: values.category.value,
        answers: res
      };
      if (questionDetail._id) {
        dispatch(updateQuestion(data, questionDetail._id));
      } else {
        dispatch(createQuestion(data));
      }
      handleCloseResetFrom();
    }
  });

  const checkUpdateOrNewQuestion = (isUpdate) => {
    if (isUpdate) {
      return listAnswers;
    } else {
      return newArray(answerNew);
    }
  };


  // check render list answer for list question when add or update
  const RenderAnswer = checkUpdateOrNewQuestion(questionDetail._id)?.map(
    (ele, index) => {
      return (
        <FormGroup key={index}>
          <Label>
            Nhập Nội Dung câu trả lời {index + 1} // Chọn kết quả đúng
          </Label>
          <Row className='align-items-center'>
            <Col md='11'>
              <Input
                type='text'
                id={index}
                defaultValue={ele.content}
                name='text-answer'
                className='form-control'
                onChange={handleChangeAns}
              />
            </Col>
            {(totalAddAnswer > index || questionDetail._id) && (
              <Col md='1'>
                <CustomInput
                  type='radio'
                  defaultChecked={ele.isCorrect === true}
                  id={`answer-${index}`}
                  name='answer'
                  onChange={handleChangeResult}
                />
              </Col>
            )}
          </Row>
        </FormGroup>
      );
    }
  );

  return (
    <Modal centered isOpen={isShow} toggle={handleCloseResetFrom}>
      <ModalHeader>{questionDetail ? 'Update' :'Create'} a Question</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit} id='questions'>
          <FormGroup>
            <Select
              id='category'
              classNamePrefix='filter__dropdown'
              name='category'
              isClearable
              options={listCategories}
              value={formik.values.category || ''}
              onChange={(option) => formik.setFieldValue('category', option)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Nhập Nội Dung câu hỏi:</Label>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              placeholder='code hear'
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: '1px solid',

              }}
            />

          </FormGroup>
          {RenderAnswer}
          <Row>
            {isAddLayoutAnswers ? (
              <Col md='4'>
                <Button className='w-100' onClick={AddAnswers}>
                  Add Answer
                </Button>
              </Col>
            ) : (
              <Col md='8'>
                <Row>
                  <Col>
                    <Button className='w-100' onClick={AddLayoutAnswer}>
                      Add Layout
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      color='success'
                      className='w-100'
                      onClick={() => setAnswerNew((prev) => prev - 1)}
                    >
                      Remove Layout
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
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
          form='questions'
        >
          {questionDetail._id ? 'Update' : 'Create'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalCreateQuestion;

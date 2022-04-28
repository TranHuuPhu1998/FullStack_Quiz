import { createHistoryExercise } from 'app/actions/history';
import { getQuestionByCourse } from 'app/actions/question';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'app/reducers';
import { Button, Col, Empty, Row, Typography } from 'antd';
import ExerciseSuccess from 'features/user-execise/ExerciseSuccess';
import ExerciseTotalScore from 'features/user-execise/ExerciseTotalScore';
import QuestionItem from 'features/user-execise/QuestionItem';
import { useTranslation } from 'react-i18next';

const UserExecise: React.FC = () => {
  const [t] = useTranslation();
  const [currentQ, setCurrentQ] = useState(0);
  const { courseId } = useParams<{ courseId: string }>();
  const [yourAnswer, setYourAnswer] = useState<any>('');
  const [yourAnswerSubmit, setYourAnswerSubmit] = useState([]);
  const [isSubmitQuestion, setIsSubmitQuestion] = useState(false);
  const [numberSwapTab, setNumberSwapTab] = useState(0);
  const [point, setPoint] = useState(0);
  const [isSaveNext, setIsSaveNext] = useState(false);

  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questionReducers);
  console.log('🚀 ~ file: index.tsx ~ line 26 ~ questions', questions);

  useEffect(() => {
    if (courseId) {
      dispatch(getQuestionByCourse(courseId));
    }
  }, [courseId]);

  useEffect(() => {
    window.addEventListener('blur', onBlurFunction);
    return () => {
      onBlurFunction();
      window.removeEventListener('blur', onBlurFunction);
    };
  }, []);

  const onBlurFunction = () => {
    setNumberSwapTab((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQ((prev) => prev - 1);
  };

  const handleNextSubmit = useCallback(() => {
    setCurrentQ((prev) => prev + 1);
    setIsSaveNext(false);
    if (yourAnswer.answerSubmit.length > 0) {
      setYourAnswerSubmit((prev) => [...prev, yourAnswer]);
      yourAnswerSubmit.map((item, index) => {
        if (item.questionSubmit._id === yourAnswer.questionSubmit?._id) {
          yourAnswerSubmit[index] = yourAnswer;
          setYourAnswerSubmit(yourAnswerSubmit);
          return 0;
        }
      });
    }
  }, [yourAnswer]);

  const handleSubmitExercise = async () => {
    setIsSubmitQuestion(true);

    yourAnswerSubmit?.map((item) => {
      item.questionSubmit.answers.map((ele: any) => {
        if (item.answerSubmit === ele.content && ele.isCorrect === true) {
          setPoint((prev) => prev + 1);
        }
      });
    });

    const dataHistory = {
      courseId: questions?.data?.at(0).courseId,
      categoryId: questions?.data?.at(0).category,
      score: point,
      lengthYourAnswer: yourAnswerSubmit?.length,
      lengthQuestion: questions?.totalDocs,
      tab: numberSwapTab,
    };

    dispatch(createHistoryExercise(dataHistory));
  };

  const checkSaveNext = (item: any) => {
    yourAnswerSubmit?.forEach((itemX, idx) => {
      if (itemX.questionSubmit._id === item._id) {
        return 'save-next';
      }
    });
  };

  return (
    <Row className="main-div">
      <Col className="question-list">
        <Typography.Title className="question-title">
          {t('Question_list')}
          <Typography.Text className="text-blue">{questions?.data?.length}</Typography.Text>
        </Typography.Title>
        <div className="question-content">
          <div className="create-test">
            {questions?.data?.map((item: any, index: number) => (
              <div
                className={`list-item ${index === currentQ && 'active-question'} ${checkSaveNext(
                  item
                )}`}
                key={index}
                onClick={() => setCurrentQ(index)}
              >
                <div className="question-item">
                  <Typography.Text className="text text-test">{index + 1}</Typography.Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col className="inner-div">
        {questions?.totalDocs > 0 ? (
          <ExerciseSuccess
            isSubmitQuestion={isSubmitQuestion}
            currentQ={currentQ}
            length={questions?.data?.length}
          />
        ) : (
          <Empty />
        )}
        <ExerciseTotalScore
          isSubmitQuestion={isSubmitQuestion}
          point={point}
          length={questions?.data?.length}
          numberSwapTab={numberSwapTab}
        />
        {isSubmitQuestion === true ? (
          <>
            {yourAnswerSubmit.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <QuestionItem
                  yourAnswerSubmit={item.answerSubmit}
                  item={item.questionSubmit}
                  index={index}
                  content={item.questionSubmit.name}
                  answers={item.questionSubmit.answers}
                  currentQ={currentQ}
                  setYourAnswer={setYourAnswer}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {questions?.data?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <QuestionItem
                  yourAnswerSubmit={''}
                  item={item}
                  index={index}
                  content={item.name}
                  answers={item.answers}
                  currentQ={currentQ}
                  setIsSaveNext={setIsSaveNext}
                  setYourAnswer={setYourAnswer}
                />
              </React.Fragment>
            ))}
          </>
        )}

        <Row className="list-btn">
          <Button
            className={`btn-custom go-back ${currentQ === 0 && 'disabled'}`}
            onClick={handlePrevious}
            disabled={currentQ === 0}
          >
            {t('Go_back_to_previous')}
          </Button>
          <Button
            className={`btn-custom save-question ${isSaveNext === false && 'disabled'}`}
            disabled={isSaveNext === false}
            onClick={() => handleNextSubmit()}
          >
            {t('Save_&_next_question')}
          </Button>
          <Button onClick={handleSubmitExercise} className="btn-custom submit-question">
            {t('Submit')}
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default UserExecise;

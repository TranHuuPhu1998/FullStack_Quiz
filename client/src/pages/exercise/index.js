import React, { useEffect, useState, useCallback } from 'react';
import { getQuestionByCourse } from '@App/app/actions/question';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import QuestionItem from './QuestionItem';
import UserLayout from '@App/layout/UserLayout';
import ExerciseSuccess from './ExerciseSuccess';
import ExerciseTotalScore from './ExerciseTotalScore';
import './styles.scoped.scss';

const Exercise = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [yourAnswer, setYourAnswer] = useState('');
  const [yourAnswerSubmit, setYourAnswerSubmit] = useState([]);
  const [isSubmitQuestion, setIsSubmitQuestion] = useState(false);
  const [numberSwapTab, setNumberSwapTab] = useState(0);
  const [point, setPoint] = useState(0);
  const [isSaveNext, setIsSaveNext] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const questions = useSelector((state) => state.questionReducers);

  useEffect(() => {
    const courseId = queryString.parse(location.search);
    if (courseId) {
      dispatch(getQuestionByCourse(courseId));
    }
  }, [location.search]);

  useEffect(() => {
    window.addEventListener('blur', onBlurFunction);
    return () => {
      onBlurFunction();
      window.removeEventListener('blur', onBlurFunction);
    };
  }, []);

  const onBlurFunction = () => {
    setNumberSwapTab((prev) => prev + 1)
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
    };
  }, [yourAnswer]);

  const handleSubmitExercise = () => {
    setIsSubmitQuestion(true);
    let _point = 0;
    let categoryId = '';
    let courseId = '';
    yourAnswerSubmit?.map((item) => {
      categoryId = item.questionSubmit.category._id;
      courseId = item.questionSubmit.course._id;
      item.questionSubmit.answers.map((ele) => {
        if (item.answerSubmit === ele.content && ele.isCorrect === true) {
          _point = _point + 1;
        }
      })
    })
    setPoint(_point);

    const dataHistory = {
      courseId: courseId,
      categoryId: categoryId,
      score: _point,
      lengthYourAnswer: yourAnswerSubmit?.length,
      lengthQuestion: questions?.length,
      tab: numberSwapTab
    }
  };

  const checkSaveNext = (item) => {
    let classSaveNext = '';
    yourAnswerSubmit?.forEach((itemX, idx) => {
      if (itemX.questionSubmit._id === item._id) {
        classSaveNext = 'save-next';
      }
    });
    return classSaveNext;
  }

  return (
    <UserLayout>
      <div className='main-div'>
        <div className='question-list'>
          <h3 className='question-title'>
            Question List: <span className='text-blue'>{questions?.data?.length}</span>
          </h3>
          <div className='question-content'>
            <div className='create-test'>
              {
                questions?.data?.map((item, index) => (
                  <div
                    className={`list-item ${index === currentQ && 'active-question'} ${checkSaveNext(item)}`}
                    key={index}
                    onClick={() => setCurrentQ(index)}
                  >
                    <div className='question-item'>
                      <span className='text text-test'>{index + 1}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='inner-div'>
          <ExerciseSuccess isSubmitQuestion={isSubmitQuestion} currentQ={currentQ} length={questions?.data?.length} />
          <ExerciseTotalScore isSubmitQuestion={isSubmitQuestion} point={point} length={questions?.data?.length} numberSwapTab={numberSwapTab} />
          {isSubmitQuestion === true ? (
            <>
              {yourAnswerSubmit.map((item, index) => (
                <React.Fragment key={index}>
                  <QuestionItem
                    yourAnswerSubmit={item.answerSubmit}
                    item={item.questionSubmit}
                    index={index}
                    content={item.questionSubmit.name}
                    answers={item.questionSubmit.answers}
                    currentQ={currentQ}
                    setIsSaveNext={''}
                    setYourAnswer={setYourAnswer}
                  />
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              {questions?.data?.map((item, index) => (
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

          <div className='list-btn'>
            <button
              className={`btn-custom go-back ${currentQ === 0 && 'disabled'}`}
              onClick={handlePrevious}
              disabled={currentQ === 0}
            >
              Go Back To Previous
            </button>
            <button
              className={`btn-custom save-question ${isSaveNext === false && 'disabled'}`}
              disabled={isSaveNext === false}
              onClick={() => handleNextSubmit(currentQ)}
            >
              Save & Next Question
            </button>
            <button
              onClick={handleSubmitExercise}
              className='btn-custom submit-question'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </UserLayout >
  );
};

export default Exercise;

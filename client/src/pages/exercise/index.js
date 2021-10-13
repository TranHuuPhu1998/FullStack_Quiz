import React, { useEffect, useState , useCallback } from 'react';
import { getQuestionByCategory } from '@App/app/actions/question';
import { useDispatch, useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './styles.scoped.scss';

const Exercise = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [yourAnswer, setYourAnswer] = useState('');
  const [yourAnswerSubmit, setYourAnswerSubmit] = useState([]);
  const [isSubmitQuestion, setIsSubmitQuestion] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const questions = useSelector((state) => state.questionReducers);
  console.log("🚀 ~ file: index.js ~ line 18 ~ Exercise ~ questions", questions)

  useEffect(() => {
    const categoryId = queryString.parse(location.search);
    if(categoryId){
      dispatch(getQuestionByCategory(categoryId));
    }
  }, [location.search]);

  const handleNextSubmit = useCallback(() => {
    setCurrentQ((prev) => prev + 1);
    setYourAnswerSubmit((prev) => [...prev, yourAnswer]);
    yourAnswerSubmit.map((item,index) => {
      if(item.questionSubmit._id === yourAnswer.questionSubmit?._id) {
        yourAnswerSubmit[index] = yourAnswer
        setYourAnswerSubmit(yourAnswerSubmit);
        return 0;
      }
    })
  },[yourAnswer]);

  const handlePrevious = () => {
    setCurrentQ((prev) => prev - 1);
  };

  const handleSubmitExercise = () => {
    setYourAnswerSubmit((prev) => [...prev, yourAnswer]);
    setIsSubmitQuestion(true);
  };

  return (
    <div className='main-div'>
      <div className='question-list'>
        <h3 className='question-title'>Question List: <span className='text-blue'>{questions.length}</span></h3>
        <div className='question-content'>
          <div className='create-test'>
            {questions.map((item, index) => (
              <div
                className={`list-item ${
                  index === currentQ && 'active-question'
                }`}
                key={index}
                onClick={() => setCurrentQ(index)}
              >
                <div className='question-item'>
                  <span className='text text-test'>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='inner-div'>
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
                  setYourAnswer={setYourAnswer}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {questions.map((item, index) => (
              <React.Fragment key={index}>
                <QuestionItem
                  yourAnswerSubmit={''}
                  item={item}
                  index={index}
                  content={item.name}
                  answers={item.answers}
                  currentQ={currentQ}
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
              className={`btn-custom save-question ${
                currentQ === questions.length - 1 && 'disabled'
              }`}
              disabled={currentQ === questions.length - 1}
              onClick={() => handleNextSubmit(currentQ)}
              >
              Save & Next Question
            </button>
          {
            yourAnswerSubmit.length >= questions.length - 1 && (
              <button
              onClick={handleSubmitExercise}
              className='btn-custom submit-question'
            >
              Submit
            </button>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Exercise;

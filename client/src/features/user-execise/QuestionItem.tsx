import React, { useState } from 'react';
import * as prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import { Typography } from 'antd';
import { AnswerItem, QuestionItem as QuestionItemEntity } from 'interfaces/features/QuestionEntity';

interface IProps {
  index: number;
  content: string;
  answers: AnswerItem[];
  currentQ: number;
  setYourAnswer: ({ answerSubmit, questionSubmit }: any) => void;
  item: QuestionItemEntity & { category?: any };
  yourAnswerSubmit: string;
  setIsSaveNext?: (value: any) => void;
}

const QuestionItem: React.FC<IProps> = (props) => {
  const [check, setCheck] = useState('');
  const {
    index,
    content,
    answers,
    currentQ,
    setYourAnswer,
    item,
    yourAnswerSubmit,
    setIsSaveNext,
  } = props;
  const handleSubmitAnswer = (e: { currentTarget: { value: React.SetStateAction<string> } }) => {
    setYourAnswer({
      answerSubmit: e.currentTarget.value,
      questionSubmit: item,
    });
    setIsSaveNext(true);
    setCheck(e.currentTarget.value);
  };

  return (
    <>
      {index === currentQ && (
        <>
          <div className="d-flex justify-content-between">
            <h2 className="question-name">Question {index + 1}</h2>
            <h3>
              <Typography.Text type="secondary">{item.category.name || 'Null'}</Typography.Text>
            </h3>
          </div>
          <div className="question-content">
            <Editor
              name="name"
              value={content}
              highlight={(code) => prism.highlight(code, prism.languages.js, 'js')}
              onValueChange={(code) => true}
              onChange={(code) => true}
              padding={10}
              placeholder="code hear"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: '1px solid',
              }}
            />
          </div>
          <ul className="list-answer">
            <p className="text">Choose the correct answers:</p>
            {answers.map((item, index) => (
              <li
                className={`answer-item cursor-pointer ${
                  yourAnswerSubmit && item.isCorrect ? 'user-submit' : 'user-submit-error'
                }`}
                key={index}
              >
                <input
                  onChange={handleSubmitAnswer}
                  value={item.content}
                  type={yourAnswerSubmit ? 'checkbox' : 'radio'}
                  defaultChecked={check === item.content}
                  name="answer"
                  disabled={yourAnswerSubmit.length > 0}
                  id={item.id as string}
                  className="answer"
                />
                <label htmlFor={item.id as string}>{item.content}</label>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default QuestionItem;

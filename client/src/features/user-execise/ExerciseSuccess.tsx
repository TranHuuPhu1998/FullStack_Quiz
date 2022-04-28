import React from 'react';
import { Alert, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  isSubmitQuestion: boolean;
  currentQ: number;
  length: number;
}

const ExerciseSuccess: React.FC<IProps> = ({ isSubmitQuestion, currentQ, length }) => {
  const [t] = useTranslation();
  return (
    <>
      {isSubmitQuestion === false && currentQ === length && (
        <Alert message="Success" type="success" showIcon>
          <Typography.Title>{t('Congratulations')}</Typography.Title>
        </Alert>
      )}
    </>
  );
};

export default ExerciseSuccess;

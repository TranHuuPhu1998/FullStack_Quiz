import React from 'react';
import { Alert, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  isSubmitQuestion: boolean;
  point: number;
  length: number;
  numberSwapTab: number;
}

const ExerciseTotalScore: React.FC<IProps> = ({
  isSubmitQuestion,
  point,
  length,
  numberSwapTab,
}) => {
  const [t] = useTranslation();
  return (
    <>
      {isSubmitQuestion && (
        <Alert message="Success" type="success" showIcon>
          <Typography.Title level={2} className="pt-5 text-center text-success-info">
            {t('Congratulations_with')}
            <Typography.Text className="text-blue"> {point + '/' + length}</Typography.Text>
            {t('Point')}
          </Typography.Title>
          <Typography.Title level={3} className="d-flex align-items-center justify-content-center">
            {t('Number_of_tabs', { numberSwapTab })}
          </Typography.Title>
        </Alert>
      )}
    </>
  );
};

export default ExerciseTotalScore;

import React from 'react';
import { Alert, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
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
        <Row justify='center' align='middle'>
          <Col span={24}>
            <Typography.Title level={2} className="pt-5 text-center">
              {t('Congratulations_with')}
              <Typography.Text className="text-blue"> {point + '/' + length}</Typography.Text>
              {t('Point')}
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title
              level={3}
              className="d-flex align-items-center justify-content-center"
            >
              {t('Number_of_tabs', { numberSwapTab })}
            </Typography.Title>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ExerciseTotalScore;

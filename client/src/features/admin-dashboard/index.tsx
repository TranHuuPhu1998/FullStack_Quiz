import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import PageContentBase from 'components/page-content/PageContentBase';
import Image from 'assets/images/people.png';
import Question from 'assets/images/question.jpg';
import Course from 'assets/images/courses.png';
import HistoryIcon from 'assets/images/history.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styled from 'styled-components';
import AreaChartRender from 'features/admin-dashboard/AreaChart';
import { InitData } from 'features/admin-dashboard/InitData';

const CardAntd = styled.div`
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.65);
  font-size: 13px;
  position: relative;
  background: #fff;
  border-radius: 0.4em;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 20px 1px #0000000f, 0 1px 4px #00000014;
`;

const AreaChartContainer = styled(Col)`
  margin-top: 4rem;
  margin-left: -2rem;
`;

const AdminDashBoard: React.FC = () => {
  return (
    <PageContentBase>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
          <CardAntd>
            <Row justify="space-between" align="middle">
              <Col>
                <LazyLoadImage
                  style={{ objectFit: 'contain' }}
                  width={100}
                  height={100}
                  alt="people"
                  effect="blur"
                  src={Image}
                />
              </Col>
              <Col>
                <Typography.Title className="text-secondary" level={3}>
                  List user
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  1000
                </Tag>
              </Col>
            </Row>
          </CardAntd>
        </Col>
        <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
          <CardAntd>
            <Row justify="space-between" align="middle">
              <Col>
                <LazyLoadImage
                  style={{ objectFit: 'contain' }}
                  width={100}
                  height={100}
                  alt="question"
                  effect="blur"
                  src={Question}
                />
              </Col>
              <Col>
                <Typography.Title className="text-secondary" level={3}>
                  List Question
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  1000
                </Tag>
              </Col>
            </Row>
          </CardAntd>
        </Col>
        <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
          <CardAntd>
            <Row justify="space-between" align="middle">
              <Col>
                <LazyLoadImage
                  style={{ objectFit: 'contain' }}
                  width={100}
                  height={100}
                  alt="course"
                  effect="blur"
                  src={Course}
                />
              </Col>
              <Col>
                <Typography.Title className="text-secondary" level={3}>
                  List Courses
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  1000
                </Tag>
              </Col>
            </Row>
          </CardAntd>
        </Col>
        <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24}>
          <CardAntd>
            <Row justify="space-between" align="middle">
              <Col>
                <LazyLoadImage
                  style={{ objectFit: 'contain' }}
                  width={100}
                  height={100}
                  alt="history"
                  effect="blur"
                  src={HistoryIcon}
                />
              </Col>
              <Col>
                <Typography.Title className="text-secondary" level={3}>
                  History Leaning
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  1000
                </Tag>
              </Col>
            </Row>
          </CardAntd>
        </Col>
      </Row>
      <Row style={{ height: '600px' }} className="w-100">
        <AreaChartContainer span={24}>
          <AreaChartRender data={InitData} />
        </AreaChartContainer>
      </Row>
    </PageContentBase>
  );
};

export default AdminDashBoard;

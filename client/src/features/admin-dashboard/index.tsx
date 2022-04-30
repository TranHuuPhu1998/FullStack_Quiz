import React, { useEffect } from 'react';
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
import { useDispatch , useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { useTranslation } from 'react-i18next';
import { getListCourse } from 'app/actions/course';
import { getQuestions } from 'app/actions/question';
import { getListUser } from 'app/actions/user';
import { getCategory } from 'app/actions/category';
import { PAGE_INFO_MAX } from 'app-constants';
import { initialState} from 'features/admin-dashboard/InitData';


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
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const { totalDocs : totalUser } = useSelector((state: RootState) => state.userReducers);
  const { totalDocs : totalCourse } = useSelector((state: RootState) => state.courseReducers);
  const { totalDocs : totalQuestion } = useSelector((state: RootState) => state.questionReducers);
  const { totalDocs : totalCategory } = useSelector((state: RootState) => state.categoryReducers);

  const InitData = () => {
    dispatch(getListCourse(PAGE_INFO_MAX));
    dispatch(getListUser());
    dispatch(getQuestions(PAGE_INFO_MAX));
    dispatch(getCategory(PAGE_INFO_MAX));
  }

  useEffect(() => {
    InitData()
  },[])

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
                  {t('List_user')}
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  {totalUser}
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
                  {t('List_question')}
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  {totalQuestion}
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
                  {t('List_course')}
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  {totalCourse}
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
                  {t('List_category')}
                </Typography.Title>
                <Tag color="blue" className="w-100">
                  {totalCategory}
                </Tag>
              </Col>
            </Row>
          </CardAntd>
        </Col>
      </Row>
      <Row style={{ height: '600px' }} className="w-100">
        <AreaChartContainer span={24}>
          <AreaChartRender data={initialState} />
        </AreaChartContainer>
      </Row>
    </PageContentBase>
  );
};

export default AdminDashBoard;

import { RootState } from 'app/reducers';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListCourse } from 'app/actions/course';
import { PAGE_INFO_MAX, URL_PAGE_USER } from 'app-constants';
import { Button, Col, Row, Tag, Typography } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { CourseItem } from 'interfaces/features/CourseEntity';
import { useTranslation } from 'react-i18next';
import { trimmedString } from 'utils/string';
import { SendOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const CardAntd = styled.div`
  margin: 1rem;
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.65);
  font-size: 13px;
  position: relative;
  background: #fff;
  border-radius: 0.4em;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 20px 1px #0000000f, 0 1px 4px #00000014;
  background: linear-gradient(
    90deg,
    rgba(238, 233, 233, 1) 46%,
    rgba(151, 210, 222, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const UserCourses: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();
  const { data } = useSelector((state: RootState) => state.courseReducers);

  useEffect(() => {
    dispatch(getListCourse(PAGE_INFO_MAX));
  }, []);

  const onLeaning = (id: string) => {
    history.push(`${URL_PAGE_USER.EXERCISE}/${id}`);
  };

  return (
    <Row>
      {data?.map((item: CourseItem & { _id?: string }, index: number) => {
        return (
          <Col key={index} xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
            <CardAntd>
              <Row justify="space-between" align="middle">
                <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <LazyLoadImage
                    style={{ objectFit: 'contain' }}
                    width={200}
                    height={120}
                    alt="people"
                    effect="blur"
                    src={item.imageBanner}
                  />
                </Col>
                <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography.Title className="text-secondary" level={3}>
                    {trimmedString(item.name, 20) || 'No name'}
                  </Typography.Title>
                  <Tag color="blue" className="w-100">
                    {trimmedString(item.category_name, 20) || 'No category'}
                  </Tag>
                </Col>
              </Row>
              <Row className="mt-4">
                <Button
                  onClick={() => onLeaning(item._id)}
                  icon={<SendOutlined />}
                  className="w-100"
                >
                  {t('Leaning')}
                </Button>
              </Row>
            </CardAntd>
          </Col>
        );
      })}
    </Row>
  );
};

export default UserCourses;

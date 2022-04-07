import React, { useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from '@App/components';
import { getListCourse } from '@App/app/actions/course';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserLayout from '@App/layout/UserLayout';
import './styles.scoped.scss';

const Courses = () => {

  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseReducers);
  const history = useHistory();

  useEffect(() => {
    dispatch(getListCourse());
  }, []);

  const handleLeaning = (courseId) => {
    history.push(`exercise?courseId=${courseId}`)
  }

  return (
    <UserLayout>
      <Row>
        {
          course.map((item, index) => {
            return (
              <Col key={index} sm="12" md="12" lg="12" xl="6" xxl="6">
                <Card className='card-container' key={index}>
                  <CardImg
                    top
                    width='100%'
                    src={item.imageBanner}
                    alt='Card image cap'
                  />
                  <CardBody>
                    <CardTitle tag='h4'>{item.name}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-2 text-muted'>
                      {item.category.name}
                    </CardSubtitle>
                    <CardText>
                      {item.descriptions}
                    </CardText>
                    <Button onClick={() => handleLeaning(item._id)}>LEARNING</Button>
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </UserLayout>
  );
};

export default Courses;

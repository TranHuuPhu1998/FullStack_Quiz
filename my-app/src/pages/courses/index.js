import React , {useEffect} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from '@App/components';
import { getListCourse } from '@App/app/actions/course';
import { useHistory } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import './styles.scoped.scss';

const Courses = () => {

  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseReducers);
  const history = useHistory();

  useEffect(() => {
    dispatch(getListCourse());
  },[]);

  const handleLeaning = (categoryId) => {
    history.push(`exercise?categoryId=${categoryId}`)
  }

  return (
    <div>
      {
        course.map((item,index) => {
          return (
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
              <Button onClick={() => handleLeaning(item.category.id)}>LEARNING</Button>
            </CardBody>
            </Card>
          )
        })
      }

    </div>
  );
};

export default Courses;

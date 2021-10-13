import iconCategory from '@App/assets/img/icon-category.svg';
import iconCourse from '@App/assets/img/icon-course.svg';
import iconUser from '@App/assets/img/icon-user.svg';
import iconQuestion from '@App/assets/img/icon-question.svg';

export default function () {
  return [
    {
      title_const: 'Categories',
      to: '/admin/categories',
      exact: true,
      icon: iconCategory
    },
    {
      title_const: 'Users',
      to: '/admin/users',
      exact: true,
      icon : iconUser
    },
    {
      title_const: 'Course',
      to: '/admin/course',
      exact: true,
      icon: iconCourse
    },
    {
      title_const: 'Questions',
      to: '/admin',
      exact: true ,
      icon : iconQuestion
    },
  ];
}

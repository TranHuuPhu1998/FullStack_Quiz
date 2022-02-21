import { lazy } from 'react';
const DashBoard = lazy(() => import('@App/pages/admin/dashboard'));
const Categories = lazy(() => import('@App/pages/admin/categories'));
const Users = lazy(() => import('@App/pages/admin/users'));
const Course = lazy(() => import('@App/pages/admin/courses'));
const Profile = lazy(() => import('@App/pages/profile'));
const Exercise = lazy(() => import('@App/pages/exercise'));
const CourseUser = lazy(() => import('@App/pages/courses'));
const Chat = lazy(() => import('@App/pages/chat'));

export default [
  {
    path: '/admin',
    exact: true,
    component: DashBoard
  },
  {
    path: '/admin/categories',
    exact: true,
    component: Categories
  },
  {
    path: '/admin/users',
    exact: true,
    component: Users
  },
  {
    path: '/admin/course',
    exact: true,
    component: Course
  },
  {
    path: '/profile',
    exact: true,
    component: Profile
  },
  {
    path: '/exercise',
    exact: true,
    component: Exercise
  },
  {
    path: '/courses',
    exact: true,
    component: CourseUser
  },
  {
    path: '/chat',
    exact: true,
    component: Chat
  },
];

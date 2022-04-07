import { lazy } from 'react';
import { AUTH_ONLY } from 'routes/types';
const DashBoard = lazy(() => import('../pages/admin/dashboard'));
const Categories = lazy(() => import('../pages/admin/categories'));
const Users = lazy(() => import('../pages/admin/users'));
const Course = lazy(() => import('../pages/admin/courses'));
const Profile = lazy(() => import('../pages/admin/profile'));
const ExerciseUser = lazy(() => import('../pages/user/exercise'));
const CourseUser = lazy(() => import('../pages/user/courses'));
const ChatUser = lazy(() => import('../pages/user/user-chat'));
const Home = lazy(() => import('../pages'));
const HistoryExercise = lazy(() => import('../pages/admin/history-exercise'));


const routers : any =  [
  {
    path: '/admin',
    exact: true,
    component: DashBoard,
    loading: 'Custom loading for home page...',
    error: 'Custom error for home page',
    meta: {
      [AUTH_ONLY]: true,
    },
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
    component: ExerciseUser
  },
  {
    path: '/courses',
    exact: true,
    component: CourseUser
  },
  {
    path: '/chat',
    exact: true,
    component: ChatUser
  },
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/history-exercise',
    exact: true,
    component: HistoryExercise
  }
];

export default routers;


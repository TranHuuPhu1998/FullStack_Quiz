import { lazy } from 'react';
const DashBoard = lazy(() => import('@App/pages/admin/dashboard'));
const Categories = lazy(() => import('@App/pages/admin/categories'));
const Users = lazy(() => import('@App/pages/admin/users'));
const Course = lazy(() => import('@App/pages/admin/courses'));
const Profile = lazy(() => import('@App/pages/profile'));

export default [
  {
    path: '/',
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
];

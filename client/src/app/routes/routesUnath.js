import { lazy } from 'react';
const singIn = lazy(() => import('@App/pages/login'));
const register = lazy(() => import('@App/pages/register'));

export default [
  {
    path: '/',
    exact: true,
    component: singIn
  },
  {
    path: '/register',
    exact: true,
    component: register
  }
];

import { lazy } from 'react';
const singIn = lazy(() => import('../pages/auth/login'));
const register = lazy(() => import('../pages/auth/register'));
const forgotPassword = lazy(() => import('../pages/auth/forgot'));

const routers =  [
  {
    path: '/',
    exact: true,
    component: singIn
  },
  {
    path: '/register',
    exact: true,
    component: register
  },
  {
    path: '/forgot',
    exact: true,
    component: forgotPassword
  }
];

export default routers;

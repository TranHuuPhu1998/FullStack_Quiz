import { lazy } from 'react';
const singIn = lazy(() => import('pages/auth/login'));
const register = lazy(() => import('pages/auth/register'));
const forgotPassword = lazy(() => import('pages/auth/forgot'));

const routers =  [
  {
    path: '/login',
    exact: true,
    component: singIn,
    key: 'login',
    name: 'Login',
    show: true,
    icon: '',
  },
  {
    path: '/register',
    exact: true,
    component: register,
    key: 'register',
    name: 'Register',
    show: true,
    icon: '',
  },
  {
    path: '/forgot',
    exact: true,
    component: forgotPassword,
    key: 'forgot',
    name: 'Forgot Password',
    show: true,
    icon: '',
  }
];

export default routers;

import { CodeOutlined, WechatOutlined } from '@ant-design/icons';
import { lazy } from 'react-router-guard';
const Chat = lazy(() => import('pages/user/user-chat'));
const Courses = lazy(() => import('pages/user/courses'));
const UserExecisePage = lazy(() => import('pages/user/exercise'));

const flattenNavURLs = [
  {
    path: '/chat',
    exact: true,
    component: Chat,
    key: 'chat',
    name: 'Chat',
    icon: WechatOutlined,
    show: false,
  },
  {
    path: '/exercise/:courseId',
    exact: true,
    component: UserExecisePage,
    key: 'exercise',
    name: 'Exercise',
    icon: CodeOutlined,
    show: false,
  },
  {
    path: '/courses',
    exact: true,
    component: Courses,
    key: 'courses',
    name: 'Courses',
    icon: CodeOutlined,
    show: false,
  },
];

export default flattenNavURLs;

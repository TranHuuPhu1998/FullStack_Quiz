import { lazy } from 'react-router-guard';
import {
  DashboardOutlined,
  HeatMapOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  CrownOutlined,
  CodeOutlined,
  HomeOutlined,
  WechatOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  AppstoreAddOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

const DashBoard = lazy(() => import('pages/admin/dashboard'));
const Categories = lazy(() => import('pages/admin/categories'));
const CategoriesAdd = lazy(() => import('pages/admin/categories/add'));
const CategoriesEdit = lazy(() => import('pages/admin/categories/edit'));
const Users = lazy(() => import('pages/admin/users'));
const Course = lazy(() => import('pages/admin/courses'));
const AddCoursePage = lazy(() => import('pages/admin/courses/add'));
const EditCoursePage = lazy(() => import('pages/admin/courses/edit'));
const Profile = lazy(() => import('pages/admin/profile'));
const CourseUser = lazy(() => import('pages/admin/courses'));
const Exercise = lazy(() => import('pages/user/exercise'));
const Chat = lazy(() => import('pages/user/user-chat'));
const Home = lazy(() => import('pages/welcome'));
const HistoryExercise = lazy(() => import('pages/admin/history-exercise'));
const CourseRanking = lazy(() => import('pages/admin/course-ranking'));
const Questions = lazy(() => import('pages/admin/questions'));
const AddQuestion = lazy(() => import('pages/admin/questions/add'));
const EditQuestion = lazy(() => import('pages/admin/questions/edit'));

const flattenNavURLs = [
  {
    path: '/admin',
    exact: true,
    component: DashBoard,
    key: 'dashboard',
    name: 'Dashboard',
    icon: DashboardOutlined,
    show: true,
  },
  // feature: categories
  {
    path: '/admin/categories',
    exact: true,
    component: Categories,
    key: 'categories',
    name: 'Categories Management',
    icon: HeatMapOutlined,
    show: true,
    subMenu: [
      {
        path: '/admin/categories',
        key: 'categories-sub',
        name: 'Categories Management',
        icon: HeatMapOutlined,
      },
      {
        path: '/admin/category/add',
        key: 'category-add-sub',
        name: 'Add Category',
        icon: AppstoreAddOutlined,
      },
    ],
  },
  {
    path: '/admin/category/add',
    exact: true,
    component: CategoriesAdd,
    key: 'categories add',
    show: false,
  },
  {
    path: '/admin/category/edit/:id',
    exact: true,
    component: CategoriesEdit,
    key: 'categories edit',
    show: false,
  },
  // feature: users
  {
    path: '/admin/users',
    exact: true,
    component: Users,
    key: 'users',
    name: 'Users Management',
    icon: UsergroupAddOutlined,
    show: true,
  },
  // feature: courses
  {
    path: '/admin/courses',
    exact: true,
    component: Course,
    key: 'course',
    name: 'Course Management',
    icon: BookOutlined,
    show: true,
    subMenu: [
      {
        path: '/admin/courses',
        name: 'List Course',
        key: 'course-sub',
        icon: BookOutlined,
      },
      {
        path: '/admin/course/add',
        name: 'Add Course',
        key: 'course-sub-add',
        icon: PlusSquareOutlined,
      },
      {
        path: '/admin/course/ranking',
        name: 'Ranking',
        key: 'course-ranking-sub',
        icon: CrownOutlined,
      },
    ],
  },
  {
    path: '/admin/course/add',
    exact: true,
    component: AddCoursePage,
    name: 'Add Course',
    key: 'course-add',
    show: false,
  },
  {
    path: '/admin/course/edit/:id',
    exact: true,
    component: EditCoursePage,
    name: 'Edit Course',
    key: 'course-edit',
    show: false,
  },
  {
    path: '/admin/course/ranking',
    exact: true,
    component: CourseRanking,
    name: 'Ranking',
    key: 'course-ranking',
    icon: CrownOutlined,
  },
  {
    path: '/admin/history-exercise',
    exact: true,
    component: HistoryExercise,
    key: 'history-exercise',
    name: 'History Exercise Management',
    icon: HistoryOutlined,
    show: true,
  },
  {
    path: '/admin/profile',
    exact: true,
    component: Profile,
    key: 'profile',
    name: 'Profile',
    icon: DashboardOutlined,
    show: false,
  },
  {
    path: '/admin/questions',
    exact: true,
    component: Questions,
    key: 'questions',
    name: 'Questions Management',
    icon: QuestionCircleOutlined,
    show: true,
    subMenu: [
      {
        path: '/admin/questions/add',
        name: 'Add Question',
        key: 'add-question-sub',
        icon: AppstoreAddOutlined,
      },
      {
        path: '/admin/questions',
        name: 'List Question',
        key: 'list-question-sub',
        icon: AppstoreAddOutlined,
      },
    ],
  },
  {
    path: '/admin/questions/add',
    exact: true,
    component: AddQuestion,
    key: 'add-question',
    name: 'Add Question',
    icon: AppstoreAddOutlined,
    show: false,
  },
  {
    path: '/admin/questions/edit/:id',
    exact: true,
    component: EditQuestion,
    key: 'edit-question',
  },
  {
    path: '/exercise',
    exact: true,
    component: Exercise,
    key: 'exercise',
    name: 'Exercise',
    icon: CodeOutlined,
    show: false,
  },
  {
    path: '/courses',
    exact: true,
    component: CourseUser,
    key: 'courses',
    name: 'Courses',
    icon: null,
    show: false,
  },
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
    path: '/',
    exact: true,
    component: Home,
    key: 'home',
    name: 'Home',
    icon: HomeOutlined,
    show: false,
  },
];

export default flattenNavURLs;

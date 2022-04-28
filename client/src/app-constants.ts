// export const API_ENDPOINT = 'https://quiz-app-hihi.herokuapp.com/api';
export const API_ENDPOINT = 'http://localhost:5000/api';
export const AUTHORIZATION_KEY = 'TOKEN';
export const PAGE_INFO = {
  current: 1,
  pageSize: 10,
  total: 0,
  text_search: null,
};
export const PAGE_INFO_MAX = {
  current: 1,
  pageSize: 1000000000000000,
};
export const STORAGE_KEYS = Object.freeze({
  IS_LOGGED_IN: 'isLoggedIn',
});
export const DEFAULT_PAGE_SIZE = 10;
export const RULE = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
});
export const LOGIN_TYPE = 'LOGIN_TYPE';
export const URL_PAGE = {
  DASHBOARD: '/admin',
  QUESTIONS: '/admin/questions',
  QUESTION_ADD: '/admin/questions/add',
  QUESTION_EDIT: '/admin/questions/edit',
  CATEGORIES: '/admin/categories',
  CATEGORY_VIEW: '/admin/category/view',
  CATEGORY_ADD: '/admin/category/add',
  CATEGORY_EDIT: '/admin/category/edit',
  COURSES: '/admin/courses',
  COURSE_ADD: '/admin/course/add',
  COURSE_EDIT: '/admin/course/edit',
};

export const URL_PAGE_USER = {
  COURSES: '/courses',
  EXERCISE: '/exercise',
};

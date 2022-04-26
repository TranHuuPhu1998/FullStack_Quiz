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
  limit: 1000000000000000,
};
export const STORAGE_KEYS = Object.freeze({
  IS_LOGGED_IN: 'isLoggedIn',
});
export const DEFAULT_PAGE_SIZE = 10;
export const URL_PAGE = {
  QUESTIONS: '/admin/questions',
  CATEGORY_VIEW: '/admin/categories/view',
  CATEGORY_ADD: '/admin/questions/add',
  CATEGORY_EDIT: '/admin/questions/edit',
};

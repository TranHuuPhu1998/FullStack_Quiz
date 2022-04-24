// export const API_ENDPOINT = 'https://quiz-app-hihi.herokuapp.com/api';
export const API_ENDPOINT = 'http://localhost:5000/api';
export const AUTHORIZATION_KEY = 'TOKEN';
export const PAGE_INFO = {
  current: 1,
  pageSize: 10,
  total: 0,
  text_search: null
};
export const PAGE_INFO_CATEGORY = {
  page: 1,
  limit: 100,
  text_search: null
};
export const STORAGE_KEYS = Object.freeze({
  IS_LOGGED_IN: 'isLoggedIn',
});

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_LIST = [10, 20, 50, 100];
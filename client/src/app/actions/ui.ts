import * as types from '../constants/ActionTypes';

export const showLoading = () => ({
  type: types.SHOW_LOADING
});

export const hideLoading = () => ({
  type: types.HIDE_LOADING
});

export const showSidebar = () => ({
  type: types.SHOW_SIDEBAR
});

export const hideSidebar = () => ({
  type: types.HIDE_SIDEBAR
});

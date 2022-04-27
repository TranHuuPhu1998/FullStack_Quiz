import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from '../apis/categories-service';
import {
  getCategoriesSuccess,
  getCategoriesError,
  createCategorySuccess,
  createCategoryError,
  updateCategorySuccess,
  updateCategoryError,
  deleteCategorySuccess,
  deleteCategoryError,
  getCategoryByIdSuccess,
  getCategoryByIdError,
} from '../actions/category';
import { hideLoading, showLoading } from '../actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as categoryType from '../constants/ActionTypes';
import { ResponseGenerator } from '../../interfaces/response-server';

function* processGetCategories({ payload }: ReturnType<typeof payload>) {
  const { pageInfo } = payload;
  yield put(showLoading());

  try {
    const resp: ResponseGenerator = yield call(getCategories, pageInfo);
    yield put(getCategoriesSuccess(resp.data.rows));
  } catch (error) {
    yield put(getCategoriesError(error));
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateCategory({ payload }: any) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(createCategory, data);
    yield put(createCategorySuccess(resp.data));
  } catch (error) {
    yield put(createCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processUpdateCategory({ payload }: any) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(updateCategory, data);
    yield put(updateCategorySuccess(resp.data));
  } catch (error) {
    yield put(updateCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processDeleteCategory({ payload }: any) {
  const { id } = payload;
  yield put(showLoading());
  try {
    yield call(deleteCategory, id);
    yield put(deleteCategorySuccess(id));
  } catch (error) {
    yield put(deleteCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetCategoryById({ payload }: any) {
  const { id } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(getCategoryById, id);
    yield put(getCategoryByIdSuccess(resp.data.rows));
  } catch (error) {
    yield put(getCategoryByIdError(error));
  } finally {
    yield put(hideLoading());
  }
}

function* categorySaga() {
  yield takeLatest(categoryType.ACTION_GET_CATEGORIES, processGetCategories);
  yield takeLatest(categoryType.ACTION_CREATE_CATEGORY, processCreateCategory);
  yield takeLatest(categoryType.ACTION_UPDATE_CATEGORY, processUpdateCategory);
  yield takeLatest(categoryType.ACTION_DELETE_CATEGORY, processDeleteCategory);
  yield takeLatest(categoryType.ACTION_GET_CATEGORY_BY_ID, processGetCategoryById);
}

export default categorySaga;

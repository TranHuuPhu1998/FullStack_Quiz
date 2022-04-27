import {
  getListCourse,
  createCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
} from 'app/apis/course-service';
import {
  getListCourseSuccess,
  getListCourseError,
  createCourseSuccess,
  createCourseError,
  deleteCourseSuccess,
  deleteCourseError,
  updateCourseSuccess,
  updateCourseError,
  getCourseByIdSuccess,
  getCourseByIdError,
} from 'app/actions/course';
import { hideLoading, showLoading } from '../actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as courseType from '../constants/ActionTypes';
import { ResponseGenerator } from '../../interfaces/response-server';

function* processGetCourse({ payload }: ReturnType<typeof payload>) {
  const { pageInfo } = payload;
  yield put(showLoading());

  try {
    const resp: ResponseGenerator = yield call(getListCourse, pageInfo);
    yield put(getListCourseSuccess(resp.data.rows));
  } catch (error) {
    yield put(getListCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateCourse({ payload }: ReturnType<typeof payload>) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(createCourse, data);
    yield put(createCourseSuccess(resp.data.rows));
  } catch (error) {
    yield put(createCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processDeleteCourse({ payload }: ReturnType<typeof payload>) {
  const { id } = payload;
  try {
    yield call(deleteCourse, id);
    yield put(deleteCourseSuccess(id));
  } catch (error) {
    yield put(deleteCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processUpdateCourse({ payload }: ReturnType<typeof payload>) {
  const { data } = payload;
  try {
    yield call(updateCourse, data);
    yield put(updateCourseSuccess(data));
  } catch (error) {
    yield put(updateCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetCourseById({ payload }: ReturnType<typeof payload>) {
  const { id } = payload;
  try {
    const resp: ResponseGenerator = yield call(getCourseById, id);
    yield put(getCourseByIdSuccess(resp.data.rows));
  } catch (error) {
    yield put(getCourseByIdError());
  } finally {
    yield put(hideLoading());
  }
}

function* courseSaga() {
  yield takeLatest(courseType.ACTION_GET_COURSE, processGetCourse);
  yield takeLatest(courseType.ACTION_CREATE_COURSE, processCreateCourse);
  yield takeLatest(courseType.ACTION_DELETE_COURSE, processDeleteCourse);
  yield takeLatest(courseType.ACTION_UPDATE_COURSE, processUpdateCourse);
  yield takeLatest(courseType.ACTION_GET_COURSE_BY_ID, processGetCourseById);
}

export default courseSaga;

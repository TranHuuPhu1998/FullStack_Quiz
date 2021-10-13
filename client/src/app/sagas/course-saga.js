import { getListCourse, createCourse , deleteCourse } from '@App/app/apis/course-service';
import {
  getListCourseSuccess,
  getListCourseError,
  createCourseSuccess,
  createCourseError,
  deleteCourseSuccess,
  deleteCourseError
} from '@App/app/actions/course';
import { hideLoading, showLoading } from '@App/app/actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as courseType from '@App/app/constants/ActionTypes';

function* processGetCourse() {
  yield put(showLoading());

  try {
    const resp = yield call(getListCourse);
    yield put(getListCourseSuccess(resp.data));
  } catch (error) {
    yield put(getListCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateCourse({ payload }) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(createCourse, data);
    yield put(createCourseSuccess(resp.data));
  } catch (error) {
    yield put(createCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processDeleteCourse({payload}) {
  const {id} = payload;
  console.log("🚀 ~ file: course-saga.js ~ line 40 ~ function*processDeleteCourse ~ id", id)
  try {
    yield call(deleteCourse, id);
    yield put(deleteCourseSuccess(id));
  } catch (error) {
    yield put(deleteCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* courseSaga() {
  yield takeLatest(courseType.ACTION_GET_COURSE, processGetCourse);
  yield takeLatest(courseType.ACTION_CREATE_COURSE, processCreateCourse);
  yield takeLatest(courseType.ACTION_DELETE_COURSE, processDeleteCourse);
}

export default courseSaga;

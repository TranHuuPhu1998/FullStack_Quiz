import { getListHistoryExercise, createHistoryExercise } from '@App/app/apis/history-service';
import {
  getListHistoryExerciseSuccess,
  getListHistoryExerciseError,
  createHistoryExerciseSuccess,
  createHistoryExerciseError
} from '@App/app/actions/history';
import { hideLoading, showLoading } from '@App/app/actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as historyType from '@App/app/constants/ActionTypes';

function* processGetHistoryExercise() {
  yield put(showLoading());

  try {
    const resp = yield call(getListHistoryExercise);
    yield put(getListHistoryExerciseSuccess(resp.data));
  } catch (error) {
    yield put(getListHistoryExerciseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateHistoryExercise({ payload }) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(createHistoryExercise, data);
    yield put(createHistoryExerciseSuccess(resp.data));
  } catch (error) {
    yield put(createHistoryExerciseError());
  } finally {
    yield put(hideLoading());
  }
}

function* historySaga() {
  yield takeLatest(historyType.ACTION_GET_HISTORY_EXERCISE, processGetHistoryExercise);
  yield takeLatest(historyType.ACTION_CREATE_HISTORY_EXERCISE, processCreateHistoryExercise);
}

export default historySaga;

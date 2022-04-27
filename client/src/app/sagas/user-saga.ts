import { getListUser, updateUserAvatar, getOneUser } from '../apis/user-service';
import {
  getListUserError,
  getListUserSuccess,
  updateUserAvatarSuccess,
  updateUserAvatarError,
  getOneUserSuccess,
} from '../actions/user';
import { hideLoading, showLoading } from '../actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as userType from '../constants/ActionTypes';
import { ResponseGenerator } from '../../interfaces/response-server';

function* processGetListUser() {
  yield put(showLoading());

  try {
    const resp: ResponseGenerator = yield call(getListUser);
    yield put(getListUserSuccess(resp.data.rows));
  } catch (error) {
    yield put(getListUserError());
  } finally {
    yield put(hideLoading());
  }
}
function* processUpdateUserAvatar({ payload }: any) {
  const avatar = payload;
  yield put(showLoading());

  try {
    yield call(updateUserAvatar, avatar);
    yield put(updateUserAvatarSuccess(avatar));
  } catch (error) {
    yield put(updateUserAvatarError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetOneUser() {
  yield put(showLoading());

  try {
    const resp: ResponseGenerator = yield call(getOneUser);
    yield put(getOneUserSuccess(resp.data));
  } catch (error) {
  } finally {
    yield put(hideLoading());
  }
}

function* userSaga() {
  yield takeLatest(userType.ACTION_GET_USER, processGetListUser);
  yield takeLatest(userType.ACTION_UPDATE_AVATAR, processUpdateUserAvatar);
  yield takeLatest(userType.ACTION_GET_PROFILE, processGetOneUser);
}

export default userSaga;

import { get } from 'lodash';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { hideLoading, showLoading } from '../actions/ui';
import { AUTHORIZATION_KEY } from '../../app-constants';

import {
  loginFailed,
  loginSuccess,
  signUpFailed,
  signUpSuccess,
  sendMailSuccess,
  sendMailFailed,
  resetPasswordSuccess,
  resetPasswordFailed,
  logoutSuccess,
  logoutFailed
} from '../actions/auth';

import {
  login,
  signUp,
  logout,
  sendMail,
  resetPassword
} from '../apis/auth-service';
import * as authTypes from '../constants/ActionTypes';
import axiosService from '../axios/axios-service';
import {ResponseGenerator} from '../../interfaces/response-server';

function* processSignUp({ payload }:any) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(signUp, data);
    yield put(signUpSuccess(resp.data));
    //
    yield axiosService.redirectTo(
      document,
      authTypes.REDIRECT_AFTER_SIGN_UP_SUCCESS
    );
  } catch (error) {
    const details = get(error, 'response.data.message');
    yield put(signUpFailed(details));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

function* processLogin({ payload }:any) {
  const { account, password } = payload;
  yield put(showLoading());
  try {
    const resp : ResponseGenerator = yield call(login, { account, password });
    yield put(loginSuccess(resp.data));
    const { access_token } = resp.data;
    yield localStorage.setItem(AUTHORIZATION_KEY, access_token);
    yield localStorage.setItem('LOGIN_TYPE',resp.data.user.role);
    if(resp.data.user.role === 'admin') {
      yield axiosService.redirectTo(document,'/admin');
    }else {
      yield axiosService.redirectTo(document,'/courses');
    }
  } catch (error) {
    const details = get(error, 'response.data.message');
    yield put(loginFailed(details));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

function* processLogout({ payload }:any) {
  const { token } = payload;
  try {
    const resp : ResponseGenerator = yield call(logout, { token });
    yield put(logoutSuccess(resp.data));
    yield axiosService.redirectTo(document,'/');
  } catch (error) {
    const details = get(error, 'response.data.message');
    yield put(logoutFailed(details));
  }
}

function* processSendMail({ payload }:any) {
  const { email } = payload;
  yield put(showLoading());
  try {
    const resp : ResponseGenerator = yield call(sendMail, { email });
    yield put(sendMailSuccess(resp.data.message));
  } catch (error) {
    const details = get(error, 'response.data.message');
    yield put(sendMailFailed(details));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

function* processResetPassword({ payload }:any) {
  const { password, token } = payload;
  yield put(showLoading());
  try {
    const resp : ResponseGenerator = yield call(resetPassword, { token, password });
    yield put(resetPasswordSuccess(resp.data));
  } catch (error) {
    yield put(resetPasswordFailed(null));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

// takeLatest khi thực hiện 1 loạt các action thì nó chỉ thực thi và trả về
// kết quả là action cuối cùng

// takeEvery thực thi và trả về kết quả của mọi action

function* authSaga() {
  yield takeLatest(authTypes.SIGN_UP, processSignUp);
  yield takeLatest(authTypes.LOGIN, processLogin);
  yield takeLatest(authTypes.LOGOUT, processLogout);
  yield takeLatest(authTypes.SEND_MAIL, processSendMail);
  yield takeLatest(authTypes.RESET_PASSWORD, processResetPassword);
}

export default authSaga;

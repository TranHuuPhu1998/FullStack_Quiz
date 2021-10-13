import _get from 'lodash';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { hideLoading, showLoading } from '@App/app/actions/ui';
import { AUTHORIZATION_KEY } from '@App/app/constants';

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
} from '@App/app/actions/auth';

import {
  login,
  signUp,
  logout,
  sendMail,
  resetPassword
} from '@App/app/apis/auth-service';
import * as authTypes from '@App/app/constants/ActionTypes';
import axiosService from '@App/app/axios/axios-service';

function* processSignUp({ payload }) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(signUp, data);
    yield put(signUpSuccess(resp.data));
    yield axiosService.redirectTo(
      document,
      authTypes.REDIRECT_AFTER_SIGN_UP_SUCCESS
    );
  } catch (error) {
    const details = _get(error, 'response.data.detail', {});
    yield put(signUpFailed(details));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

function* processLogin({ payload }) {
  const { account, password } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(login, { account, password });
    yield put(loginSuccess(resp.data));
    const { access_token } = resp.data;
    yield localStorage.setItem(AUTHORIZATION_KEY, access_token);
    yield localStorage.setItem('LOGIN_TYPE',resp.data.user.role)
    if(resp.data.user.role === 'admin') {
      document.location = '/admin';
    }else {
      document.location = '/exercise';
    }
  } catch (error) {
    const details = _get(error, 'response.data.detail', {});
    yield put(loginFailed(details));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

function* processLogout({ payload }) {
  const { token } = payload;
  try {
    const resp = yield call(logout, { token });
    yield put(logoutSuccess(resp.data));
    document.location = '/';
  } catch (error) {
    const details = _get(error, 'response.data.detail', {});
    yield put(logoutFailed(details));
  }
}

function* processSendMail({ payload }) {
  const { email } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(sendMail, { email });
    yield put(sendMailSuccess(resp.data.message));
  } catch (error) {
    const details = _get(error, 'response.data.detail', {});
    yield put(sendMailFailed(details));
  } finally {
    yield delay(100);
    yield put(hideLoading());
  }
}

function* processResetPassword({ payload }) {
  const { password, token } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(resetPassword, { token, password });
    yield put(resetPasswordSuccess(resp.data));
  } catch (error) {
    yield put(resetPasswordFailed());
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

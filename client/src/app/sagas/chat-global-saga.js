import { getListChatGlobal } from '@App/app/apis/chat-global-service';
import {
  getListChatSuccess,
  getListChatError,
} from '@App/app/actions/chat-global';
import { hideLoading, showLoading } from '@App/app/actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as chatGlobalType from '@App/app/constants/ActionTypes';

function* processGetChatGlobal() {
  yield put(showLoading());

  try {
    const resp = yield call(getListChatGlobal);
    yield put(getListChatSuccess(resp.data));
  } catch (error) {
    yield put(getListChatError());
  } finally {
    yield put(hideLoading());
  }
}

function* chatGlobalSaga() {
  yield takeLatest(chatGlobalType.ACTION_GET_CHAT_GLOBAL, processGetChatGlobal);
}

export default chatGlobalSaga;

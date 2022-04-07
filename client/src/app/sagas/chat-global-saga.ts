import { getListChatGlobal } from '../apis/chat-global-service';
import {
  getListChatSuccess,
  getListChatError,
} from '../actions/chat-global';
import { hideLoading, showLoading } from '../actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as chatGlobalType from '../constants/ActionTypes';
import { ResponseGenerator } from '../../interfaces/response-server';

function* processGetChatGlobal({ payload }:any) {
  const { pageInfo } = payload;
  yield put(showLoading());

  try {
    const resp : ResponseGenerator = yield call(getListChatGlobal, pageInfo);
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

import { fork, all } from 'redux-saga/effects';
import authSaga from './auth-saga';
import questionSaga from './question-saga';
import categorySaga from './categories-saga';
import userSaga from './user-saga';
import courseSaga from './course-saga';
import historySaga from './history-saga';
import chatGlobalSaga from './chat-global-saga';

function* rootSaga() {
  yield all([
    yield fork(authSaga),
    yield fork(questionSaga),
    yield fork(categorySaga),
    yield fork(userSaga),
    yield fork(courseSaga),
    yield fork(historySaga),
    yield fork(chatGlobalSaga),
  ]);
}

export default rootSaga;

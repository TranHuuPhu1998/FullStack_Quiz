import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsCategory,
  getQuestionsCourse,
  getQuestionById,
} from 'app/apis/questions-service';
import {
  getQuestionsSuccess,
  getQuestionsError,
  createQuestionSuccess,
  createQuestionError,
  updateQuestionSuccess,
  updateQuestionError,
  deleteQuestionSuccess,
  deleteQuestionError,
  getQuestionByCategorySuccess,
  getQuestionByCategoryError,
  getQuestionByCourseSuccess,
  getQuestionByCourseError,
  getQuestionByIdSuccess,
  getQuestionByIdError,
} from '../actions/question';
import { hideLoading, showLoading } from '../actions/ui';
import { call, takeLatest, put } from 'redux-saga/effects';
import * as questionType from '../constants/ActionTypes';
import { ResponseGenerator } from '../../interfaces/response-server';

function* processGetQuestion({ payload }: ReturnType<typeof payload>) {
  const { pageInfo } = payload;
  yield put(showLoading());

  try {
    const resp: ResponseGenerator = yield call(getQuestions, pageInfo);
    yield put(getQuestionsSuccess(resp.data.rows));
  } catch (err) {
    yield put(getQuestionsError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetQuestionCategory({ payload }: ReturnType<typeof payload>) {
  const { categoryId } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(getQuestionsCategory, categoryId);
    yield put(getQuestionByCategorySuccess(resp.data));
  } catch (error) {
    yield put(getQuestionByCategoryError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetQuestionCourse({ payload }: any) {
  const { courseId } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(getQuestionsCourse, courseId);
    yield put(getQuestionByCourseSuccess(resp.data));
  } catch (error) {
    yield put(getQuestionByCourseError());
  } finally {
    yield put(hideLoading());
  }
}

function* processCreateQuestion({ payload }: any) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(createQuestion, data);
    yield put(createQuestionSuccess(resp.data));
  } catch (error) {
    yield put(createQuestionError(null));
  } finally {
    yield put(hideLoading());
  }
}

function* processUpdateQuestion({ payload }: any) {
  const { data } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(updateQuestion, data);
    yield put(updateQuestionSuccess(resp.data));
  } catch (error) {
    console.log(
      '🚀 ~ file: question-saga.ts ~ line 91 ~ function*processUpdateQuestion ~ error',
      error
    );
    yield put(updateQuestionError());
  } finally {
    yield put(hideLoading());
  }
}

function* processDeleteQuestion({ payload }: any) {
  const { id } = payload;
  yield put(showLoading());
  try {
    yield call(deleteQuestion, id);
    yield put(deleteQuestionSuccess(id));
  } catch (error) {
    yield put(deleteQuestionError());
  } finally {
    yield put(hideLoading());
  }
}

function* processGetQuestionById({ payload }: any) {
  const { id } = payload;
  yield put(showLoading());
  try {
    const resp: ResponseGenerator = yield call(getQuestionById, id);
    yield put(getQuestionByIdSuccess(resp.data.row));
  } catch (error) {
    yield put(getQuestionByIdError());
  } finally {
    yield put(hideLoading());
  }
}

function* authSaga() {
  yield takeLatest(questionType.ACTION_GET_QUESTIONS, processGetQuestion);
  yield takeLatest(questionType.ACTION_CREATE_QUESTION, processCreateQuestion);
  yield takeLatest(questionType.ACTION_UPDATE_QUESTION, processUpdateQuestion);
  yield takeLatest(questionType.ACTION_DELETE_QUESTION, processDeleteQuestion);
  yield takeLatest(questionType.ACTION_GET_QUESTIONS_CATEGORY, processGetQuestionCategory);
  yield takeLatest(questionType.ACTION_GET_QUESTIONS_COURSE, processGetQuestionCourse);
  yield takeLatest(questionType.ACTION_GET_QUESTION_BY_ID, processGetQuestionById);
}

export default authSaga;

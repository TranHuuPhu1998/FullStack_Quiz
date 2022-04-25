import { combineReducers } from 'redux';
import authReducers from './auth';
import questionReducers from './questions';
import categoryReducers from './categories';
import uiLoadingReducers from './uiLoading';
import userReducers from './user';
import courseReducers from './courses';
import profileReducers from './profile';
import historyReducers from './history';
import chatGlobalReducers from './chat-global';

const rootReducers = combineReducers({
  authReducers,
  questionReducers,
  categoryReducers,
  uiLoadingReducers,
  userReducers,
  courseReducers,
  profileReducers,
  historyReducers,
  chatGlobalReducers
});

export type RootState = ReturnType<typeof rootReducers>

export default rootReducers;

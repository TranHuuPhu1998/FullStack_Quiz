import { combineReducers } from 'redux';
import authReducers from './auth';
import questionReducers from './questions';
import categoryReducers from './categories';
import uiLoadingReducers from './uiLoading';
import userReducers from './user';
import courseReducers from './courses';
import profileReducers from './profile';
import historyReducers from './history';

const rootReducers = combineReducers({
  authReducers,
  questionReducers,
  categoryReducers,
  uiLoadingReducers,
  userReducers,
  courseReducers,
  profileReducers,
  historyReducers
});

export default rootReducers;

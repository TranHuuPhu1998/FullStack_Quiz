import * as types from '@App/app/constants/ActionTypes';
import { toastError, toastSuccess } from '@App/app/common/helpers/toastHelper';

const initialState = [];

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUESTIONS_SUCCESS: {
      const questions = action.payload.data.rows;
      return [...questions];
    }
    case types.GET_QUESTIONS_ERROR: {
      toastError('Get question error');
      return [...state];
    }
    case types.CREATE_QUESTION_SUCCESS: {
      toastSuccess('Create Questions Success');
      const question = action.payload.data.rows;
      return [question, ...state];
    }
    case types.CREATE_QUESTION_ERROR: {
      toastError('Create Questions Error');
      return [...state];
    }
    case types.UPDATE_QUESTION_SUCCESS: {
      toastSuccess('Update Questions Success');
      const data = action.payload.data.rows;
      const _index = state.findIndex((ele) => ele._id === data._id);
      state[_index] = data;
      return [...state];
    }
    case types.DELETE_QUESTION_SUCCESS: {
      const id = action.payload.id;
      const _index = state.findIndex((ele) => ele._id === id);
      state.splice(_index, 1);
      return [...state];
    }
    case types.GET_QUESTIONS_CATEGORY_SUCCESS: {
      const questions = action.payload.data.rows;
      return [...questions];
    }
    default:
      return state;
  }
};

export default reducers;

import { CrudState } from 'interfaces/common';
import * as types from '../constants/ActionTypes';

import { toastError, toastSuccess } from '../../common/helpers/toastHelper';

const initialState: any = {
  data: [],
  totalDocs: 0,
  status: CrudState.NotSet,
};

const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_QUESTIONS_SUCCESS: {
      const { docs, totalDocs } = action.payload.data;
      return {
        data: docs,
        totalDocs: totalDocs,
      };
    }
    case types.GET_QUESTIONS_ERROR: {
      toastError('Get question error');
      return state;
    }
    case types.CREATE_QUESTION_SUCCESS: {
      toastSuccess('Create Questions Success');
      const question = action.payload.data.rows;
      return {
        data: [question, ...state.data],
        totalDocs: state.totalDocs + 1,
        status: CrudState.Succeed,
      };
    }
    case types.CREATE_QUESTION_ERROR: {
      toastError('Create Questions Error');
      return { ...state };
    }
    case types.UPDATE_QUESTION_ERROR: {
      toastSuccess('Update Questions Error');
      return { ...state };
    }
    case types.UPDATE_QUESTION_SUCCESS: {
      toastSuccess('Update Questions Success');
      return {
        status: CrudState.Updated,
      };
    }
    case types.DELETE_QUESTION_SUCCESS: {
      toastSuccess('Delete Questions Success');
      const id = action.payload.id;
      const _index = state.data.findIndex((ele: any) => ele._id === id);
      state.data.splice(_index, 1);
      return {
        data: [...state.data],
        totalDocs: state.totalDocs - 1,
      };
    }
    case types.GET_QUESTIONS_CATEGORY_SUCCESS: {
      const questions = action.payload.data.rows;
      return {
        data: questions,
        totalDocs: questions.length,
      };
    }
    case types.GET_QUESTIONS_COURSE_SUCCESS: {
      const questions = action.payload.data.rows;
      return {
        data: questions,
        totalDocs: questions.length,
      };
    }
    case types.GET_QUESTION_BY_ID_SUCCESS: {
      const { data } = action.payload;
      return {
        data,
      };
    }
    default:
      return state;
  }
};

export default reducers;

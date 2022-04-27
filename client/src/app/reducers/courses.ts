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
    case types.GET_COURSE_SUCCESS: {
      const { docs, totalDocs } = action.payload.data;
      return {
        data: docs,
        totalDocs: totalDocs,
      };
    }
    case types.CREATE_COURSE_SUCCESS: {
      toastSuccess('Create Courses Success');
      const course = action.payload.data;
      return {
        data: [course, ...state?.data],
        totalDocs: state.totalDocs + 1,
        status: CrudState.Succeed,
      };
    }
    case types.UPDATE_COURSE_SUCCESS: {
      toastSuccess('Update Courses Success');
      return {
        status: CrudState.Updated,
      };
    }
    case types.CREATE_COURSE_ERROR: {
      toastError('Create Courses Error');
      return state;
    }
    case types.DELETE_COURSE_SUCCESS: {
      toastSuccess('Delete Course Success');
      const id = action.payload.id;
      const _index = state.data.findIndex((ele: any) => ele._id === id);
      state.data.splice(_index, 1);
      return {
        data: [...state.data],
        totalDocs: state.totalDocs - 1,
      };
    }
    case types.GET_COURSE_BY_ID_SUCCESS: {
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

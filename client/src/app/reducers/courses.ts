import { CrudState } from 'interfaces/common';
import * as types from '../constants/ActionTypes';
// import { ResponseReducers } from 'interfaces/response-server';

import { toastError, toastSuccess } from '../../common/helpers/toastHelper';

const initialState: any = {
  data: null,
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
      const course = action.payload.data.rows;
      return {
        data: [course, ...state.data],
        totalDocs: state.totalDocs + 1,
        status: CrudState.Succeed,
      };
    }
    // eslint-disable-next-line no-lone-blocks
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
    default:
      return state;
  }
};

export default reducers;

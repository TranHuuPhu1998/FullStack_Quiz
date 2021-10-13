import * as types from '@App/app/constants/ActionTypes';
import { toastError, toastSuccess } from '@App/app/common/helpers/toastHelper';

const initialState = [];

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_SUCCESS: {
      const categories = action.payload.data.rows;
      return [...categories];
    }
    case types.GET_CATEGORY_ERROR: {
      toastError('Get Category Error');
      return [...state];
    }
    case types.CREATE_CATEGORY_SUCCESS: {
      toastSuccess('Create Category Success');
      const question = action.payload.data.rows;
      return [question, ...state];
    }
    case types.CREATE_CATEGORY_ERROR: {
      toastError('Create Category Error');
      return [...state];
    }
    case types.UPDATE_CATEGORY_SUCCESS: {
      toastSuccess('Update Category Success');
      const data = action.payload.data.rows;
      const _index = state.findIndex((ele) => ele._id === data._id);
      state[_index] = data;
      return [...state];
    }
    case types.DELETE_CATEGORY_SUCCESS: {
      toastSuccess('Delete Category Success');
      const id = action.payload.id;
      const _index = state.findIndex((ele) => ele._id === id);
      state.splice(_index, 1);
      return [...state];
    }
    case types.DELETE_CATEGORY_ERROR: {
      toastError('Delete Category Error');
      return [...state];
    }
    default:
      return state;
  }
};

export default reducers;

import * as types from 'app/constants/ActionTypes';
import { CrudState } from 'interfaces/common';
import { toastError, toastSuccess } from 'common/helpers/toastHelper';

const initialState: any = {
  data: [],
  totalDocs: 0,
  status: CrudState.NotSet,
};

const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_CATEGORY_SUCCESS: {
      const { docs, totalDocs } = action.payload.data;
      return {
        data: docs,
        totalDocs: totalDocs,
      };
    }
    case types.GET_CATEGORY_ERROR: {
      toastError('Get Category Error');
      return state;
    }
    case types.CREATE_CATEGORY_SUCCESS: {
      toastSuccess('Create Category Success');
      const category = action.payload.data.rows;
      return {
        data: [category, ...state.data],
        totalDocs: state.totalDocs + 1,
        status: CrudState.Succeed,
      };
    }
    case types.CREATE_CATEGORY_ERROR: {
      toastError('Create Category Error');
      return {
        data: [...state.data],
        status: CrudState.Failed,
      };
    }
    case types.UPDATE_CATEGORY_SUCCESS: {
      toastSuccess('Update Category Success');
      return {
        status: CrudState.Updated,
      };
    }
    case types.UPDATE_CATEGORY_ERROR: {
      toastError('Update category Error');
      return {
        data: [...state.data],
        status: CrudState.Failed,
      };
    }
    case types.DELETE_CATEGORY_SUCCESS: {
      toastSuccess('Delete Category Success');
      const id = action.payload.id;
      const _index = state.data.findIndex((ele: any) => ele._id === id);
      state.data.splice(_index, 1);
      return {
        data: [...state.data],
        totalDocs: state.totalDocs - 1,
      };
    }
    case types.DELETE_CATEGORY_ERROR: {
      toastError('Delete Category Error');
      return [...state];
    }
    case types.GET_CATEGORY_BY_ID_SUCCESS: {
      const category = action.payload.data;
      return {
        data: [category],
        status: CrudState.Succeed,
      };
    }
    case types.GET_CATEGORY_BY_ID_ERROR: {
      toastError('Get Category By Id Error');
      return {
        data: [...state.data],
        status: CrudState.Failed,
      };
    }
    default:
      return state;
  }
};

export default reducers;

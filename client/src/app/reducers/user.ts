import * as types from '../constants/ActionTypes';

const initialState: any = {
  data: [],
  totalDocs: 0,
};

const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS: {
      const { data, totalDocs } = action.payload;
      return {
        data,
        totalDocs: totalDocs,
      };
    }
    case types.GET_ONE_USER_SUCCESS: {
      const users = action.payload.data.rows;
      return [users];
    }
    default:
      return state;
  }
};

export default reducers;

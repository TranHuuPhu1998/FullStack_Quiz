import * as types from '../constants/ActionTypes';

const initialState:any = [];

const reducers = (state = initialState, action:any) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS: {
      const users = action.payload.data.rows;
      return [...users];
    }
    case types.GET_ONE_USER_SUCCESS : {
      const users = action.payload.data.rows;
      return [users];
    }
    default:
      return state;
  }
};

export default reducers;

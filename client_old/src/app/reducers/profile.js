import * as types from '@App/app/constants/ActionTypes';

const initialState = [];

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS: {
      const users = action.payload.data.rows;
      return [users];
    }
    default:
      return state;
  }
};

export default reducers;

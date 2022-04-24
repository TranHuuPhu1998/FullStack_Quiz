import * as types from '../constants/ActionTypes';

const initialState = {
  data: [],
  totalDocs: 0
};

const reducers = (state = initialState, action:any) => {
  switch (action.type) {
    case types.GET_HISTORY_EXERCISE_SUCCESS: {
      const { docs, totalDocs } = action.payload.data.rows;
      return {
        data: docs,
        totalDocs: totalDocs
      };
    }
    default:
      return state;
  }
};

export default reducers;
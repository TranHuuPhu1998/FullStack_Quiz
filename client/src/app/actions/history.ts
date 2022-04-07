import * as types from '../constants/ActionTypes';

// get list history exercise

export const getListHistoryExercise = () => {
  return {
    type: types.ACTION_GET_HISTORY_EXERCISE,
  }
}

export const getListHistoryExerciseSuccess = (data:any) => {
  return {
    type: types.GET_HISTORY_EXERCISE_SUCCESS,
    payload: {
      data
    }
  }
}

export const getListHistoryExerciseError = () => {
  return {
    type: types.GET_HISTORY_EXERCISE_ERROR
  }
}

// create history exercise

export const createHistoryExercise = (data:any) => {
  return {
    type: types.ACTION_CREATE_HISTORY_EXERCISE,
    payload: {
      data
    }
  }
}

export const createHistoryExerciseSuccess = (data:any) => {
  return {
    type: types.CREATE_HISTORY_EXERCISE_SUCCESS,
    payload: {
      data
    }
  }
}

export const createHistoryExerciseError = () => {
  return {
    type: types.CREATE_HISTORY_EXERCISE_ERROR
  }
}

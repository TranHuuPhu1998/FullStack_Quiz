import * as types from '@App/app/constants/ActionTypes';

// get list history exercise

export const getListHistoryExercise = () => {
  return {
    type: types.ACTION_GET_HISTORY_EXERCISE,
  }
}

export const getListHistoryExerciseSuccess = (data) => {
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

export const createHistoryExercise = (data) => {
  return {
    type: types.ACTION_CREATE_HISTORY_EXERCISE,
    payload: {
      data
    }
  }
}

export const createHistoryExerciseSuccess = (data) => {
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
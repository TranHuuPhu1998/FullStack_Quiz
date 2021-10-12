import * as types from '@App/app/constants/ActionTypes';

// Get List Questions
export const getQuestions = () => {
  return {
    type: types.ACTION_GET_QUESTIONS
  };
};

export const getQuestionsSuccess = (data) => {
  return {
    type: types.GET_QUESTIONS_SUCCESS,
    payload: {
      data
    }
  };
};

export const getQuestionsError = () => {
  return {
    type: types.GET_QUESTIONS_ERROR
  };
};

// Create A Question
export const createQuestion = (data) => {
  return {
    type: types.ACTION_CREATE_QUESTION,
    payload: {
      data
    }
  };
};

export const createQuestionSuccess = (data) => {
  return {
    type: types.CREATE_QUESTION_SUCCESS,
    payload: {
      data
    }
  };
};

export const createQuestionError = (data) => {
  return {
    type: types.CREATE_QUESTION_ERROR,
    payload: {
      data
    }
  };
};

// Update A Question
export const updateQuestion = (data, id) => {
  return {
    type: types.ACTION_UPDATE_QUESTION,
    payload: {
      data,
      id
    }
  };
};

export const updateQuestionSuccess = (data) => {
  return {
    type: types.UPDATE_QUESTION_SUCCESS,
    payload: {
      data
    }
  };
};

export const updateQuestionError = () => {
  return {
    type: types.UPDATE_QUESTION_ERROR
  };
};

// Delete A Question
export const deleteQuestion = (id) => {
  return {
    type: types.ACTION_DELETE_QUESTION,
    payload: {
      id
    }
  };
};

export const deleteQuestionSuccess = (id) => {
  return {
    type: types.DELETE_QUESTION_SUCCESS,
    payload: {
      id
    }
  };
};

export const deleteQuestionError = () => {
  return {
    type: types.DELETE_QUESTION_ERROR
  };
};

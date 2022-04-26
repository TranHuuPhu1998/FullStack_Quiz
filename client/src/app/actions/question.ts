import * as types from '../constants/ActionTypes';
// Get List Questions
export const getQuestions = (pageInfo: any) => {
  return {
    type: types.ACTION_GET_QUESTIONS,
    payload: {
      pageInfo,
    },
  };
};

export const getQuestionsSuccess = (data: any) => {
  return {
    type: types.GET_QUESTIONS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionsError = () => {
  return {
    type: types.GET_QUESTIONS_ERROR,
  };
};
// Get list question

export const getQuestionByCategory = ({ categoryId }: any) => {
  return {
    type: types.ACTION_GET_QUESTIONS_CATEGORY,
    payload: {
      categoryId,
    },
  };
};

export const getQuestionByCategorySuccess = (data: any) => {
  return {
    type: types.GET_QUESTIONS_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionByCategoryError = () => {
  return {
    type: types.GET_QUESTIONS_CATEGORY_ERROR,
  };
};

// Get question by source

export const getQuestionByCourse = ({ courseId }: any) => {
  return {
    type: types.ACTION_GET_QUESTIONS_COURSE,
    payload: {
      courseId,
    },
  };
};

export const getQuestionByCourseSuccess = (data: any) => {
  return {
    type: types.GET_QUESTIONS_COURSE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionByCourseError = () => {
  return {
    type: types.GET_QUESTIONS_COURSE_ERROR,
  };
};

// Create A Question
export const createQuestion = (data: any) => {
  return {
    type: types.ACTION_CREATE_QUESTION,
    payload: {
      data,
    },
  };
};

export const createQuestionSuccess = (data: any) => {
  return {
    type: types.CREATE_QUESTION_SUCCESS,
    payload: {
      data,
    },
  };
};

export const createQuestionError = (data: any) => {
  return {
    type: types.CREATE_QUESTION_ERROR,
    payload: {
      data,
    },
  };
};

// Update A Question
export const updateQuestion = (data: any) => {
  return {
    type: types.ACTION_UPDATE_QUESTION,
    payload: {
      data,
    },
  };
};

export const updateQuestionSuccess = (data: any) => {
  return {
    type: types.UPDATE_QUESTION_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateQuestionError = () => {
  return {
    type: types.UPDATE_QUESTION_ERROR,
  };
};

// Delete A Question
export const deleteQuestion = (id: string) => {
  console.log('🚀 ~ file: question.ts ~ line 133 ~ deleteQuestion ~ id', id);
  return {
    type: types.ACTION_DELETE_QUESTION,
    payload: {
      id,
    },
  };
};

export const deleteQuestionSuccess = (id: any) => {
  return {
    type: types.DELETE_QUESTION_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteQuestionError = () => {
  return {
    type: types.DELETE_QUESTION_ERROR,
  };
};

export const getQuestionById = (id: string) => {
  return {
    type: types.ACTION_GET_QUESTION_BY_ID,
    payload: {
      id,
    },
  };
};

export const getQuestionByIdSuccess = (data: any) => {
  return {
    type: types.GET_QUESTION_BY_ID_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getQuestionByIdError = () => {
  return {
    type: types.GET_QUESTION_BY_ID_ERROR,
  };
};

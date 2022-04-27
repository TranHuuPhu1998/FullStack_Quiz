import * as types from '../constants/ActionTypes';

// get list user
export const getListCourse = (pageInfo: any) => {
  return {
    type: types.ACTION_GET_COURSE,
    payload: {
      pageInfo,
    },
  };
};

export const getListCourseSuccess = (data: any) => {
  return {
    type: types.GET_COURSE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getListCourseError = () => {
  return {
    type: types.GET_COURSE_ERROR,
  };
};

// create course

export const createCourse = (data: any) => {
  return {
    type: types.ACTION_CREATE_COURSE,
    payload: {
      data,
    },
  };
};

export const createCourseSuccess = (data: any) => {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const createCourseError = () => {
  return {
    type: types.CREATE_CATEGORY_ERROR,
  };
};

// update course

export const updateCourse = (data: any) => {
  return {
    type: types.ACTION_UPDATE_COURSE,
    payload: {
      data,
    },
  };
};

export const updateCourseSuccess = (data: any) => {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateCourseError = () => {
  return {
    type: types.UPDATE_COURSE_ERROR,
  };
};

// delete course

export const deleteCourse = (id: any) => {
  return {
    type: types.ACTION_DELETE_COURSE,
    payload: {
      id,
    },
  };
};

export const deleteCourseSuccess = (id: any) => {
  return {
    type: types.DELETE_COURSE_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteCourseError = () => {
  return {
    type: types.DELETE_COURSE_ERROR,
  };
};

// Get One Course

export const getCourseById = (id: string) => {
  return {
    type: types.ACTION_GET_COURSE_BY_ID,
    payload: {
      id,
    },
  };
};

export const getCourseByIdSuccess = (data: any) => {
  return {
    type: types.GET_COURSE_BY_ID_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getCourseByIdError = () => {
  return {
    type: types.GET_COURSE_BY_ID_ERROR,
  };
};

import * as types from '../constants/ActionTypes';

// get list user
export const getListCourse = () => {
  return {
    type: types.ACTION_GET_COURSE,
  };
};

export const getListCourseSuccess = (data:any) => {
  return {
    type : types.GET_COURSE_SUCCESS,
    payload : {
      data
    }
  };
};

export const getListCourseError = () => {
  return {
    type : types.GET_COURSE_ERROR
  };
};

// create course

export const createCourse = (data:any) => {
  return {
    type : types.ACTION_CREATE_COURSE,
    payload : {
      data
    }
  }
};

export const createCourseSuccess = (data:any) => {
  return {
    type : types.CREATE_COURSE_SUCCESS,
    payload : {
      data
    }
  }
};

export const createCourseError = () => {
  return {
    type : types.CREATE_CATEGORY_ERROR,
  }
};

// update course

export const updateCourse = (data:any) => {
  return {
    type : types.ACTION_UPDATE_COURSE
  }
};

export const updateCourseSuccess = (data:any) => {
  return {
    type : types.UPDATE_COURSE_SUCCESS,
    payload : {
      data
    }
  }
};

export const updateCourseError = (data:any) => {
  return {
    type : types.UPDATE_COURSE_ERROR
  }
};

// delete course

export const deleteCourse = (id:any) => {
  return {
    type : types.ACTION_DELETE_COURSE,
    payload : {
      id
    }
  }
};

export const deleteCourseSuccess = (id:any) => {
  return {
    type: types.DELETE_COURSE_SUCCESS,
    payload : {
      id
    }
  }
};

export const deleteCourseError = () => {
  return {
    type : types.DELETE_COURSE_ERROR
  }
}

import * as types from '../constants/ActionTypes';
// get list user
export const getListUser = () => {
  return {
    type: types.ACTION_GET_USER,
  };
};

export const getListUserSuccess = (data:any) => {
  return {
    type: types.GET_USER_SUCCESS,
    payload: {
      data
    }
  }
};

export const getListUserError = () => {
  return {
    type: types.GET_USER_ERROR,
  }
};

// create a user
export const createUser = (data:any) => {
  return {
    type: types.ACTION_CREATE_USER
  }
};

export const createUserSuccess = () => {
  return {
    type: types.CREATE_USER_SUCCESS,
  }
};

export const createUserError = () => {
  return {
    type: types.CREATE_USER_ERROR
  }
}

// update profile user
export const updateUserProfile = (data:any) => {
  return {
    type: types.ACTION_UPDATE_PROFILE,
    payload: {
      data
    }
  }
}

export const updateUserProfileSuccess = (data:any) => {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateUserProfileError = (data:any) => {
  return {
    type: types.UPDATE_PROFILE_ERROR,
  }
}

// update avatar user

export const updateUserAvatar = (data:any) => {
  return {
    type: types.ACTION_UPDATE_AVATAR,
    payload: {
      avatar: data
    }
  }
}

export const updateUserAvatarSuccess = (data:any) => {
  return {
    type: types.UPDATE_AVATAR_SUCCESS,
    payload: {
      data
    }
  }
}

export const updateUserAvatarError = () => {
  return {
    type: types.UPDATE_CATEGORY_ERROR
  }
}

// get one user

export const getOneUser = () => {
  return {
    type: types.ACTION_GET_PROFILE,
  }
}

export const getOneUserSuccess = (data:any) => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: {
      data
    }
  }
}

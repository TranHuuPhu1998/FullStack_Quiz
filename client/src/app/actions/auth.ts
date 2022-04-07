import * as types from '../constants/ActionTypes';

export const signUp = (data:any) => {
  return {
    type: types.SIGN_UP,
    payload: {
      data
    }
  };
};

export const signUpSuccess = (data:any) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: {
    data
  }
});

export const signUpFailed = (error:any) => ({
  type: types.SIGN_UP_FAILED,
  payload: {
    error
  }
});

export const logout = (data:any) => {
  return {
    type: types.LOGOUT,
    payload: {
      token: data
    }
  };
};

export const logoutSuccess = (data:any) => ({
  type: types.LOGOUT_SUCCESS,
  payload: {
    data
  }
});

export const logoutFailed = (error:any) => ({
  type: types.LOGIN_FAILED,
  payload: {
    error
  }
});

export const login = ({ account , password } : any) => ({
  type: types.LOGIN,
  payload: {
    account,
    password
  }
});

export const loginSuccess = (data:any) => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    data
  }
});

export const loginFailed = (error:any) => {
  return {
    type: types.LOGIN_FAILED,
    payload: {
      error
    }
  };
};
export const sendMail = (email:any) => ({
  type: types.SEND_MAIL,
  payload: {
    email
  }
});

export const sendMailSuccess = (data:any) => ({
  type: types.SEND_MAIL_SUCCESS,
  payload: {
    data
  }
});

export const sendMailFailed = (error:any) => ({
  type: types.SEND_MAIL_FAILED,
  payload: {
    error
  }
});

export const resetPassword = (token:any, password:any) => ({
  type: types.RESET_PASSWORD,
  payload: {
    password,
    token
  }
});

export const resetPasswordSuccess = (data:any) => ({
  type: types.RESET_PASSWORD_SUCCESS,
  payload: {
    data
  }
});

export const resetPasswordFailed = (data:any) => ({
  type: types.RESET_PASSWORD_FAILED,
  payload: {
    data
  }
});

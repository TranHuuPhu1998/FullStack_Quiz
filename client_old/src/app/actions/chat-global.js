import * as types from '@App/app/constants/ActionTypes';

// get list chat

export const getListChat = (pageInfo) => {
  return {
    type: types.ACTION_GET_CHAT_GLOBAL,
    payload: {
      pageInfo
    }
  }
}

export const getListChatSuccess = (data) => {
  return {
    type: types.GET_CHAT_GLOBAL_SUCCESS,
    payload: {
      data
    }
  }
}

export const getListChatError = () => {
  return {
    type: types.GET_CHAT_GLOBAL_ERROR
  }
}
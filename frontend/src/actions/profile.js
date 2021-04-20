import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestPost, requestPatch } from "../utils/request";
import { API_ROUTES } from "../utils/constants";

export const PROFILE_SETUP = makeAsyncActionCreator('PROFILE_SETUP');
export const PROFILE_UPDATE = makeAsyncActionCreator('PROFILE_UPDATE');
export const PROFILE_AVATAR = makeAsyncActionCreator('PROFILE_AVATAR');

export const profileSetup = (accountInfo) => dispatch => {
  dispatch(PROFILE_SETUP())

  return requestPost(API_ROUTES.profile.setup, accountInfo).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(PROFILE_SETUP.success(data))
    } else {
      const {message} = data
      dispatch(PROFILE_SETUP.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const profileUpdate = (body) => dispatch => {
  dispatch(PROFILE_UPDATE())

  return requestPatch(API_ROUTES.profile.update, body).then((response) => {
    const {status, data} = response
    
    if (status >= 200 && status < 300) {
      dispatch(PROFILE_UPDATE.success(data))
    } else {
      const {message} = data
      dispatch(PROFILE_UPDATE.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const profileAvatar = (file) => dispatch => {
  dispatch(PROFILE_AVATAR())

  return requestPost(API_ROUTES.profile.avatar, file).then((response) => {
    const {status, data} = response
    
    if (status >= 200 && status < 300) {
      dispatch(PROFILE_AVATAR.success(data))
    } else {
      const {message} = data
      dispatch(PROFILE_AVATAR.failure(message))
      throw new Error(message)
    }

    return data
  })
}


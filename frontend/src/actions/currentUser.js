import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestDelete, requestGet, requestPost } from "../utils/request";
import { API_ROUTES } from "../utils/constants";

export const FETCH_CURRENT_USER = makeAsyncActionCreator('FETCH_CURRENT_USER');
export const SIGN_IN = makeAsyncActionCreator('SIGN_IN');
export const SIGN_OUT = makeAsyncActionCreator('SIGN_OUT');

export const signIn = (email, password) => dispatch => {
  dispatch(SIGN_IN())

  return requestPost(API_ROUTES.login, {
    email,
    password,
  }).then(response => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(SIGN_IN.success(data))
    } else {
      const {message} = data
      dispatch(SIGN_IN.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const getCurrentUser = () => dispatch => {
  dispatch(FETCH_CURRENT_USER())

  return requestGet(API_ROUTES.me).then(response => {
    const {status, data} = response
    const {message} = data
    if (status >= 200 && status < 300) {
      dispatch(FETCH_CURRENT_USER.success(data))
    } else {
      dispatch(FETCH_CURRENT_USER.failure(message))
    }

    return data
  })
}

export const setCurrentUser = user => dispatch => {
  dispatch(FETCH_CURRENT_USER.success(user))
}

export const logout = () => dispatch => {
  dispatch(SIGN_OUT())

  return requestDelete(API_ROUTES.logout).then(response => {
    const {status, data} = response
    const {message} = data
    if (status >= 200 && status < 300) {
      dispatch(SIGN_OUT.success(data))
    } else {
      dispatch(SIGN_OUT.failure(message))
    }

    return data
  })
}

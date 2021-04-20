import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestPost } from "../utils/request";
import { API_ROUTES } from "../utils/constants";

export const SIGN_UP = makeAsyncActionCreator('SIGN_UP');

export const signUp = (body) => dispatch => {
  dispatch(SIGN_UP())

  return requestPost(API_ROUTES.signup, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(SIGN_UP.success(data))
    } else {
      const {message} = data
      dispatch(SIGN_UP.failure(message))
      throw new Error(message)
    }

    return data
  })
}

import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestGet } from "../utils/request";
import { API_ROUTES } from "../utils/constants";

export const USER_ROLES = makeAsyncActionCreator('USER_ROLES');

export const userRoles = () => dispatch => {
  dispatch(USER_ROLES())

  return requestGet(API_ROUTES.roles.index).then((response) => {
    const {status, data} = response
    
    if (status >= 200 && status < 300) {
      dispatch(USER_ROLES.success(data))
    } else {
      const {message} = data
      dispatch(USER_ROLES.failure(message))
      throw new Error(message)
    }

    return data
  })
}

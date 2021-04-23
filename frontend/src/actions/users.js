import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestGet } from "@utils/request";
import { API_ROUTES } from "@utils/constants";

export const FETCH_USERS = makeAsyncActionCreator('FETCH_USERS');

export const fetchUsers = () => dispatch => {
  dispatch(FETCH_USERS())

  return requestGet(API_ROUTES.admin.users).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_USERS.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_USERS.failure(message))
      throw new Error(message)
    }

    return data
  })
}

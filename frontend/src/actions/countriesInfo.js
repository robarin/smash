import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestGet } from "@utils/request";
import { API_ROUTES } from "@utils/constants";

export const COUNTRIES_INFO = makeAsyncActionCreator('COUNTRIES_INFO');

export const countriesInfo = () => dispatch => {
  dispatch(COUNTRIES_INFO())

  return requestGet(API_ROUTES.countries.index).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(COUNTRIES_INFO.success(data))
    } else {
      const {message} = data
      dispatch(COUNTRIES_INFO.failure(message))
      throw new Error(message)
    }

    return data
  })
}

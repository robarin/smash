import {makeAsyncActionCreator} from 'redux-toolbelt'
import {requestGet, requestPatch, requestPost, requestDelete} from '@utils/request';
import {API_ROUTES} from '@utils/constants';

export const FETCH_SURVEY_TYPES = makeAsyncActionCreator('FETCH_SURVEY_TYPES');
export const UPDATE_SURVEY_TYPE = makeAsyncActionCreator('UPDATE_SURVEY_TYPE');
export const CREATE_SURVEY_TYPE = makeAsyncActionCreator('CREATE_SURVEY_TYPE');
export const DELETE_SURVEY_TYPE = makeAsyncActionCreator('DELETE_SURVEY_TYPE');

export const fetchSurveyTypes = () => dispatch => {
  dispatch(FETCH_SURVEY_TYPES());

  return requestGet(API_ROUTES.admin.surveyTypes).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_SURVEY_TYPES.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_SURVEY_TYPES.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const updateSurveyType = ({id, body}) => dispatch => {
  dispatch(UPDATE_SURVEY_TYPE());

  return requestPatch(`${API_ROUTES.admin.surveyTypes}/${id}`, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(UPDATE_SURVEY_TYPE.success(data))
    } else {
      const {message} = data
      dispatch(UPDATE_SURVEY_TYPE.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const createSurveyType = (body) => dispatch => {
  dispatch(CREATE_SURVEY_TYPE());

  return requestPost(API_ROUTES.admin.surveyTypes, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(CREATE_SURVEY_TYPE.success(data))
    } else {
      const {message} = data
      dispatch(CREATE_SURVEY_TYPE.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const deleteSurveyType = (id) => dispatch => {
  dispatch(DELETE_SURVEY_TYPE());

  return requestDelete(`${API_ROUTES.admin.surveyTypes}/${id}`).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(DELETE_SURVEY_TYPE.success(data))
    } else {
      const {message} = data
      dispatch(DELETE_SURVEY_TYPE.failure(message))
      throw new Error(message)
    }

    return data
  })
}

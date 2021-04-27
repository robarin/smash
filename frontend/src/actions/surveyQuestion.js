import { makeAsyncActionCreator } from 'redux-toolbelt'
import { requestGet, requestPatch, requestPost } from '@utils/request';
import { API_ROUTES } from '@utils/constants';

export const UPDATE_SURVEY_QUESTION = makeAsyncActionCreator('UPDATE_SURVEY_QUESTION');
export const CREATE_SURVEY_QUESTION = makeAsyncActionCreator('CREATE_SURVEY_QUESTION');

export const updateSurveyQuestion = (id, body) => dispatch => {
  dispatch(UPDATE_SURVEY_QUESTION())

  return requestPatch(`${API_ROUTES.admin.surveyQuestions}/${id}`, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(UPDATE_SURVEY_QUESTION.success(data))
    } else {
      const {message} = data
      dispatch(UPDATE_SURVEY_QUESTION.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const createSurveyQuestion = (body) => dispatch => {
  dispatch(CREATE_SURVEY_QUESTION())

  return requestPost(API_ROUTES.admin.surveyQuestions, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(CREATE_SURVEY_QUESTION.success(data))
    } else {
      const {message} = data
      dispatch(CREATE_SURVEY_QUESTION.failure(message))
      throw new Error(message)
    }

    return data
  })
}

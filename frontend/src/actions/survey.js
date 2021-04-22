import {makeAsyncActionCreator, makeActionCreator} from 'redux-toolbelt'
import {requestGet} from '@utils/request';
import {API_ROUTES} from '@utils/constants';

export const FETCH_SURVEY = makeAsyncActionCreator('FETCH_SURVEY');
export const SUBMIT_SURVEY = makeAsyncActionCreator('SUBMIT_SURVEY');
export const SET_SURVEY_RESULT = makeActionCreator('SET_SURVEY_RESULT');

export const fetchSurvey = () => dispatch => {
  dispatch(FETCH_SURVEY());

  return requestGet(API_ROUTES.surveys.basic).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_SURVEY.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_SURVEY.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const setSurveyResult = (survey) => dispatch => {
  dispatch(SET_SURVEY_RESULT(survey));
}

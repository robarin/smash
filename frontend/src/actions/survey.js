import {makeAsyncActionCreator, makeActionCreator} from 'redux-toolbelt'
import {requestGet,requestPost, requestPatch} from '@utils/request';
import {API_ROUTES} from '@utils/constants';

export const FETCH_BASIC_SURVEY = makeAsyncActionCreator('FETCH_BASIC_SURVEY');
export const FETCH_SURVEY = makeAsyncActionCreator('FETCH_SURVEY');
export const FETCH_SURVEYS = makeAsyncActionCreator('FETCH_SURVEYS');
export const SUBMIT_SURVEY = makeAsyncActionCreator('SUBMIT_SURVEY');
export const SET_SURVEY_RESULT = makeActionCreator('SET_SURVEY_RESULT');
export const CLEAR_SURVEY_RESULT = makeActionCreator('CLEAR_SURVEY_RESULT');
export const CREATE_SURVEY = makeAsyncActionCreator('CREATE_SURVEY');
export const UPDATE_SURVEY = makeAsyncActionCreator('UPDATE_SURVEY');
export const SUBMIT_SURVEY_RESULTS = makeAsyncActionCreator('SUBMIT_SURVEY_RESULTS');

export const createSurvey = (body) => dispatch => {
  dispatch(CREATE_SURVEY())

  return requestPost(API_ROUTES.admin.surveys, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(CREATE_SURVEY.success(data))
    } else {
      const {message} = data
      dispatch(CREATE_SURVEY.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const updateSurvey = (id, body) => dispatch => {
  dispatch(UPDATE_SURVEY())

  return requestPatch(`${API_ROUTES.admin.surveys}/${id}`, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(UPDATE_SURVEY.success(data))
    } else {
      const {message} = data
      dispatch(UPDATE_SURVEY.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const fetchBasicSurvey = () => dispatch => {
  dispatch(FETCH_BASIC_SURVEY());

  return requestGet(API_ROUTES.surveys.basic).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_BASIC_SURVEY.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_BASIC_SURVEY.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const fetchSurvey = (id) => dispatch => {
  dispatch(FETCH_SURVEY());

  return requestGet(`${API_ROUTES.admin.surveys}/${id}`).then((response) => {
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

export const fetchSurveys = () => dispatch => {
  dispatch(FETCH_SURVEYS());

  return requestGet(API_ROUTES.admin.surveys).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_SURVEYS.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_SURVEYS.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const submitSurveyResults = (body) => dispatch => {
  dispatch(SUBMIT_SURVEY_RESULTS())

  return requestPost(API_ROUTES.surveys.results, { surveyResult: body }).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(SUBMIT_SURVEY_RESULTS.success(data))
    } else {
      const {message} = data
      dispatch(SUBMIT_SURVEY_RESULTS.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const setSurveyResult = (survey) => dispatch => {
  dispatch(SET_SURVEY_RESULT(survey));
}

export const clearSurveyResult = () => dispatch => {
  dispatch(CLEAR_SURVEY_RESULT());
}

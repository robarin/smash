import {makeAsyncActionCreator} from 'redux-toolbelt'
import {requestGet, requestPost, requestPatch, requestDelete} from '@utils/request';
import {API_ROUTES} from '@utils/constants';

export const FETCH_EVENTS = makeAsyncActionCreator('FETCH_EVENTS');
export const FETCH_EVENT = makeAsyncActionCreator('FETCH_EVENT');
export const FETCH_EVENT_RELATED_ENTITIES = makeAsyncActionCreator('FETCH_EVENT_RELATED_ENTITIES');
export const DELETE_EVENT = makeAsyncActionCreator('DELETE_EVENT');
export const CREATE_EVENT = makeAsyncActionCreator('CREATE_EVENT');
export const UPDATE_EVENT = makeAsyncActionCreator('UPDATE_EVENT');

export const fetchEvents = () => dispatch => {
  dispatch(FETCH_EVENTS());

  return requestGet(API_ROUTES.admin.events).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_EVENTS.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_EVENTS.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const fetchEvent = (id) => dispatch => {
  dispatch(FETCH_EVENT());

  return requestGet(`${API_ROUTES.admin.events}/${id}`).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_EVENT.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_EVENT.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const fetchEventRelatedEntities = () => dispatch => {
  dispatch(FETCH_EVENT_RELATED_ENTITIES());

  return requestGet(API_ROUTES.admin.eventRelatedEntities).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(FETCH_EVENT_RELATED_ENTITIES.success(data))
    } else {
      const {message} = data
      dispatch(FETCH_EVENT_RELATED_ENTITIES.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const createEvent = (body) => dispatch => {
  dispatch(CREATE_EVENT())

  return requestPost(API_ROUTES.admin.events, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(CREATE_EVENT.success(data))
    } else {
      const {message} = data
      dispatch(CREATE_EVENT.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const updateEvent = (id, body) => dispatch => {
  dispatch(UPDATE_EVENT())

  return requestPatch(`${API_ROUTES.admin.events}/${id}`, body).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(UPDATE_EVENT.success(data))
    } else {
      const {message} = data
      dispatch(UPDATE_EVENT.failure(message))
      throw new Error(message)
    }

    return data
  })
}

export const deleteEvent = (id) => dispatch => {
  dispatch(DELETE_EVENT());

  return requestDelete(`${API_ROUTES.admin.events}/${id}`).then((response) => {
    const {status, data} = response

    if (status >= 200 && status < 300) {
      dispatch(DELETE_EVENT.success(data))
    } else {
      const {message} = data
      dispatch(DELETE_EVENT.failure(message))
      throw new Error(message)
    }

    return data
  })
}

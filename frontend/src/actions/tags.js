import {makeAsyncActionCreator} from 'redux-toolbelt'
import {requestGet, requestDelete, requestPatch, requestPost} from "@utils/request";
import {API_ROUTES} from "@utils/constants";

export const FETCH_TAGS = makeAsyncActionCreator('FETCH_TAGS');
export const DELETE_TAG = makeAsyncActionCreator('DELETE_TAG');
export const UPDATE_TAG = makeAsyncActionCreator('UPDATE_TAG');
export const CREATE_TAG = makeAsyncActionCreator('CREATE_TAG');

const collectionUrl = API_ROUTES.admin.tags
const resourceUrl = id => `${collectionUrl}/${id}`

export const fetchTags = () => dispatch => {
  dispatch(FETCH_TAGS())

  return requestGet(collectionUrl).then(({status, data}) => {
    if (status >= 200 && status < 300) {
      dispatch(FETCH_TAGS.success(data))
    } else {
      dispatch(FETCH_TAGS.failure(data.message))
      throw new Error(data.message)
    }

    return data
  })
}

export const deleteTag = (id) => dispatch => {
  dispatch(DELETE_TAG())
  requestDelete(resourceUrl(id)).then(({status, data}) => {
    if (status >= 200 && status < 300) {
      dispatch(DELETE_TAG.success({id}))
    } else {
      dispatch(DELETE_TAG.failure(data.message))
      throw new Error(data.message)
    }

    return data
  })
}

export const updateTag = (attributes) => dispatch => {
  const {id} = attributes
  dispatch(UPDATE_TAG())

  requestPatch(resourceUrl(id), attributes).then(({status, data}) => {
    if (status >= 200 && status < 300) {
      dispatch(UPDATE_TAG.success(attributes))
    } else {
      dispatch(UPDATE_TAG.failure(data.message))
      throw new Error(data.message)
    }

    return data
  })
}

export const createTag = (attributes) => dispatch => {
  dispatch(CREATE_TAG())

  requestPost(collectionUrl, attributes).then(({status, data}) => {
    if (status >= 200 && status < 300) {
      dispatch(CREATE_TAG.success(data))
    } else {
      dispatch(CREATE_TAG.failure(data.message))
      throw new Error(data.message)
    }

    return data
  })
}

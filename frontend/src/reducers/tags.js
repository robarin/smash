import {FETCH_TAGS, DELETE_TAG, UPDATE_TAG, CREATE_TAG} from '@actions/tags'

const initialState = {
  isLoading: false,
  data: [],
};

const immutableUpdate = (state, payload) => {
  const newData = [...state.data].map(tag => {
    if (tag.id === payload.id) {
      return payload
    }

    return tag
  })

  return {data: newData, isLoading: false}
}

const immutableDelete = (state, payload) => {
  return {
    data: state.data.filter(tag => tag.id !== payload.id),
    isLoading: false
  }
}

const tagsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TAGS.TYPE:
    case DELETE_TAG.TYPE:
    case UPDATE_TAG.TYPE:
    case CREATE_TAG.TYPE:
      return {...state, isLoading: true}
    case FETCH_TAGS.success.TYPE:
      return {data: payload, isLoading: false}
    case DELETE_TAG.success.TYPE:
      return immutableDelete(state, payload)
    case FETCH_TAGS.failure.TYPE:
    case DELETE_TAG.failure.TYPE:
    case UPDATE_TAG.failure.TYPE:
    case CREATE_TAG.failure.TYPE:
      return {...state, isLoading: false}
    case UPDATE_TAG.success.TYPE:
      return immutableUpdate(state, payload)
    case CREATE_TAG.success.TYPE:
      return {data: [...state.data, payload]}
    default:
      return state
  }
}

export default tagsReducer;

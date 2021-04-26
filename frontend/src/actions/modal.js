import { makeActionCreator } from 'redux-toolbelt'

export const SHOW_MODAL = makeActionCreator('SHOW_MODAL')
export const HIDE_MODAL = makeActionCreator('HIDE_MODAL')

export const showModal = (payload) => dispatch => {
  dispatch(SHOW_MODAL(payload))
}

export const hideModal = () => dispatch => {
  dispatch(HIDE_MODAL())
}

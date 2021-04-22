import { makeActionCreator } from 'redux-toolbelt'

export const SHOW_FLASH_MESSAGE = makeActionCreator('SHOW_FLASH_MESSAGE')
export const HIDE_FLASH_MESSAGE = makeActionCreator('HIDE_FLASH_MESSAGE')

export const showFlashMessage = (payload) => dispatch => {
  dispatch(SHOW_FLASH_MESSAGE(payload))
}

export const hideFlashMessage = (payload) => dispatch => {
  dispatch(HIDE_FLASH_MESSAGE())
}

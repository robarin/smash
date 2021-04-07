export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';

export const showFlashMessage = (payload) => ({
  type: SHOW_FLASH_MESSAGE,
  payload,
});

export const hideFlashMessage = () => ({
  type: HIDE_FLASH_MESSAGE
})

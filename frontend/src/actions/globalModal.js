export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = (payload) => ({
  type: SHOW_MODAL,
  payload,
});

export const hideModal = () => ({
  type: HIDE_MODAL
});

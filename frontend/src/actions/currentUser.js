export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

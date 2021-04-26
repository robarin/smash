import { SHOW_MODAL, HIDE_MODAL } from '@actions/modal';

const initialState = {
  open: false,
  title: ''
};

const modalReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SHOW_MODAL.TYPE:
      return {...payload, open: true};
    case HIDE_MODAL.TYPE:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;

import { SHOW_MODAL, HIDE_MODAL } from '../actions/globalModal';

const initialState = {
  type: null
};

const globalModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload;
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default globalModalReducer

import { SET_MODAL_TYPE } from '../actions/modalType';

const initialState = null;

const modalTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_TYPE:
      return action.payload;
    default:
      return state;
  }
}

export default modalTypeReducer

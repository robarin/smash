import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/currentUser';

const initialState = null;

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    case REMOVE_CURRENT_USER:
      return null;
    default:
      return state;
  }
}

export default currentUserReducer

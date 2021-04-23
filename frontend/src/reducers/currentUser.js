import { FETCH_CURRENT_USER, SIGN_OUT, SIGN_IN } from '@actions/currentUser';

const initialState = {
  isLogged: false,
  isLoading: false,
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER.TYPE:
      return {...state, isLoading: true}
    case SIGN_IN.success.TYPE:
    case FETCH_CURRENT_USER.success.TYPE:
      const user = action.payload;

      return {...user, isLogged: true, isLoading: false};
    case SIGN_IN.failure.TYPE:
    case FETCH_CURRENT_USER.failure.TYPE:
    case SIGN_OUT.success.TYPE:
      return initialState;
    default:
      return state;
  }
}

export default currentUserReducer

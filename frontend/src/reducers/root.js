import { combineReducers } from 'redux';
import currentUserReducer from './currentUser';
import flashReducer from './flash';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  flashMessage: flashReducer,
});

export default rootReducer;

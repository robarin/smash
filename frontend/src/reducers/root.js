import { combineReducers } from 'redux';
import currentUserReducer from './currentUser';
import modalTypeReducer from './modalType';
import flashReducer from './flash';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  modalType: modalTypeReducer,
  flashMessage: flashReducer,
});

export default rootReducer;

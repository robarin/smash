import { combineReducers } from 'redux';
import currentUserReducer from './currentUser';
import globalModalReducer from './globalModal';
import flashReducer from './flash';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  globalModal: globalModalReducer,
  flashMessage: flashReducer,
});

export default rootReducer;

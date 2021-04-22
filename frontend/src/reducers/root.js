import { combineReducers } from 'redux';
import currentUserReducer from './currentUser';
import surveyReducer from './survey';
import flashReducer from './flash';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  flashMessage: flashReducer,
  surveyResult: surveyReducer,
});

export default rootReducer;

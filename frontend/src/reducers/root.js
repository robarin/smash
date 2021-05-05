import { combineReducers } from 'redux';
import currentUserReducer from './currentUser';
import surveyReducer from './survey';
import tagsReducer from './tags';
import flashReducer from './flash';
import modalReducer from './modal';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  flashMessage: flashReducer,
  surveyResult: surveyReducer,
  tags: tagsReducer,
  modal: modalReducer,
});

export default rootReducer;

import { SET_SURVEY_RESULT } from "../actions/survey";

const initialState = {
  surveyId: null,
  questionResponses: []
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SURVEY_RESULT.TYPE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}

export default surveyReducer;

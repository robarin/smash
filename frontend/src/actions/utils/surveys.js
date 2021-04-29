export const validateSurveyResult = ({survey,surveyResult,setError}) => {
  const responses = surveyResult.questionResponses;
  const customResponse = responses.find(r => r.custom);
  const emptyResponse = responses.find(r => r.isMultiple && r.questionResponseId.length === 0);
  const result = {valid: true}

  if (responses.length !== survey.survey_questions.length || emptyResponse) {
    result.message = 'Please answer to all questions'
  }
  if (customResponse && customResponse.responseText.length === 0) {
    result.message = 'Please fill out all your response variants'
  }
  if (result.message) {
    result.valid = false
    setError(result.message);
  }

  return result;
}

import React from 'react';
import QuestionsList from './QuestionsList';

const SurveyBody = ({survey}) => {
  const {survey_questions} = survey;
  return (
    <>
      <QuestionsList questions={survey_questions}/>
    </>
  )
}

export default SurveyBody;

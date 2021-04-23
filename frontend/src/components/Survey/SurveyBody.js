import React from 'react';
import QuestionsList from './QuestionsList';

const SurveyBody = ({survey}) => {
  const questions = survey.survey_questions.map(sq => sq.question);
  return (
    <>
      <QuestionsList questions={questions}/>
    </>
  )
}

export default SurveyBody;

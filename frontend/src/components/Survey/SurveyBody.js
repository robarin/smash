import React from 'react';
import QuestionsList from './QuestionsList';

const SurveyBody = ({questions}) => {
  return (
    <>
      <QuestionsList questions={questions}/>
    </>
  )
}

export default SurveyBody;

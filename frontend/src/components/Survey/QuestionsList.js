import React from 'react';
import SurveyQuestion from './Question';

const QuestionsList = ({questions}) => {
  const questionsList = () => {
    return questions
    .sort((a, b) => (a.position - b.position))
    .map((q, q_index, self) => {
      return (
        <SurveyQuestion key={q_index} questionIndex={q_index + 1} {...q} />
      )
    })
  }

  return (
    <>
      <ul>
        {questionsList()}
      </ul>
    </>
  )
}

export default QuestionsList;

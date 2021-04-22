import React from 'react';
import SurveyQuestion from './Question';

const QuestionsList = ({questions}) => {
  const questionsList = () => {
    return questions
    .sort((a, b) => (a.attributes.position - b.attributes.position))
    .map((q, q_index, self) => {
      const {attributes: {question: {attributes}}} = q;
      return (
        <SurveyQuestion key={q_index} {...attributes} />
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

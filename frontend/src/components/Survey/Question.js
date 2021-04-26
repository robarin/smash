import React, {useState} from 'react';
import {connect} from 'react-redux';
import QuestionResponse from './QuestionResponse';
import {setSurveyResult} from '../../actions/survey';

const SurveyQuestion = ({id, body, response_type, question_responses, surveyResult, setSurveyResult}) => {
  const [customResponse, setCustomResponse] = useState({ responseText: '' });

  const onCustomResponseChange = (e) => {
    const questionId = (e.target.name).toString();
    let response;

    if (customResponse && customResponse.questionId === questionId) {
      response = customResponse;
    } else {
      response = surveyResult.questionResponses.find(r => r.questionId === questionId);
    }

    response.responseText = e.target.value;
    setCustomResponse(response)
  }

  const customResponseTextarea = (questionId) => {
    return (
      document
      .getElementById(`question-${questionId}`)
      .getElementsByTagName('textarea')[0]
    )
  }

  const toggleTextField = ({questionId, optionValue}) => {
    const textField = customResponseTextarea(questionId);
    if (textField) {
      textField.classList.add('hidden');
    }

    let visible = false;

    if (textField && optionValue === 'custom') {
      textField.classList.remove('hidden');
      visible = true;
    }

    return visible;
  }

  const onOptionChange = (e) => {
    const {questionResponses} = surveyResult;
    const questionId = e.target.name;
    const optionValue = e.target.value;
    const questionResponseId = e.target.id;
    const isMultiple = e.target.type === 'checkbox';
    const currentResponse = questionResponses.find(r => r.questionId === questionId);
    const custom = toggleTextField({questionId, optionValue});

    const questionResponse = {
      questionId,
      isMultiple,
      questionResponseId,
      custom,
    }

    if (custom) {
      questionResponse.responseText = customResponse.responseText;
    }

    if (isMultiple) {
      if (currentResponse) {
        let responses = [...currentResponse.questionResponseId];

        if (responses.includes(questionResponseId)) {
          responses = responses.filter(id => id !== questionResponseId)
        } else {
          responses = [...responses, questionResponseId]
        }

        questionResponse.questionResponseId = responses;
      } else {
        questionResponse.questionResponseId = [questionResponseId]
      }
    }

    const filteredResponses = questionResponses.filter(r => r.questionId !== questionId);
    const userResponses = [
      ...filteredResponses,
      questionResponse
    ];

    setSurveyResult({
      ...surveyResult,
      questionResponses: userResponses
    })
  }

  return (
    <li key={`survey-question-${id}`} className="list-none">
      <div className="p-4 m-4 shadow">
        <div className="text-xl">{body}</div>
        <div className="text-lg text-gray-400">{body}</div>
        <div className="mt-2 flex justify-center">
          <ul className="md:w-1/3 w-full" id={`question-${id}`}>
            {question_responses.map((q_response, r_index, self) => {
              return(
                <QuestionResponse
                  key={r_index}
                  response={q_response}
                  onChange={onOptionChange}
                  onCustomResponseChange={onCustomResponseChange}
                  responseType={response_type}
                  index={r_index}
                  isLast={self.length - 1 === r_index}
                  questionId={id}
                  surveyResult={surveyResult}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}

const mapStateToProps = (state) => ({
  surveyResult: state.surveyResult,
})

const mapDispatchToProps = {
  setSurveyResult
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestion);


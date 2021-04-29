import React, {useState} from 'react';
import {connect} from 'react-redux';
import QuestionResponse from './QuestionResponse';
import {setSurveyResult} from '../../actions/survey';
import SelectOption from './SelectOption';

const SurveyQuestion = (props) => {
  const {
    id,
    body,
    position,
    response_type,
    question_responses,
    surveyResult,
    setSurveyResult,
    questionIndex
  } = props;
  const [customResponse, setCustomResponse] = useState({responseText: ''});
  const surveyResponses = surveyResult.questionResponses;

  const onCustomResponseChange = (e) => {
    const questionId = parseInt(e.target.name);
    let response;

    if (customResponse && customResponse.questionId === questionId) {
      response = customResponse;
    } else {
      response = surveyResponses.find(r => r.questionId === questionId);
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
    const questionId = parseInt(e.target.name);
    const questionResponseId = parseInt(e.target.id);
    const optionValue = e.target.value;
    const isMultiple = e.target.type === 'checkbox';
    const currentResponse = surveyResponses.find(r => r.questionId === questionId);
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

    updateSurveyResponses({
      questionId,
      newResponse: questionResponse
    });
  }

  const isResponseSelect = () => {
    return response_type.match(/select/);
  }

  const renderQuestionResponses = () => {
    return question_responses.map((q_response, r_index, self) => {
      return (
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
    })
  }

  const onSelectChange = (e) => {
    const selected = e[0] || e;
    const questionId = selected.questionId;
    const currentResponse = surveyResponses.find(r => r.questionId === questionId);
    const questionResponse = {
      questionId,
      isMultiple: false,
      custom: false,
    }

    const response = currentResponse || questionResponse;
    response.questionResponseId = [];

    if (Array.isArray(e)) {
      response.isMultiple = true;
      e.forEach(res => response.questionResponseId.push(res.value));
    } else {
      response.questionResponseId = e.value;
    }

    updateSurveyResponses({
      questionId,
      newResponse: response
    })
  }

  const updateSurveyResponses = ({newResponse, questionId}) => {
    const filteredResponses = surveyResponses.filter(r => r.questionId !== questionId);
    const newResponses = [
      ...filteredResponses,
      newResponse
    ];
    setSurveyResult({
      ...surveyResult,
      questionResponses: newResponses
    })
  }

  const renderResponseSelect = () => {
    const responseOptions = question_responses.map((qr) => {
      return {
        value: qr.id,
        label: qr.name,
        questionId: id,
      }
    })

    return (
      <SelectOption
        isMulti={!!response_type.match(/multiple/)}
        options={responseOptions}
        name="Response variants"
        onChange={onSelectChange}
      />
    )
  }

  return (
    <li key={`survey-question-${id}`} className="list-none">
      <div className="p-4 m-4 border rounded-md">
        <div className="text-xl text-center">{`${questionIndex || position}. ${body}`}</div>
        <div className="mt-2 flex justify-center">
          <ul className="md:w-1/3 w-full" id={`question-${id}`}>
            {isResponseSelect()
              ? renderResponseSelect()
              : renderQuestionResponses()
            }
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


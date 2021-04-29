import React from 'react';
import CustomResponseField from './CustomResponseField';
import RadioButtonOption from './RadioButtonOption';
import CheckBoxOption from './CheckboxOption';

const QuestionResponse = (props) => {
  const {
    response,
    responseType,
    onChange,
    onCustomResponseChange,
    surveyResult,
    index,
    isLast,
    questionId,
  } = props;

  const {
    description,
    name
  } = response;

  const questionResponseId = response.id;

  const responseOption = (option, input) => {
    return (
      <>
        <div>{option}</div>
        {input && <div>{input}</div>}
      </>
    )
  }

  const isCheckedOption = (questionResponseId) => {
    const id = (questionResponseId).toString();

    const checked = surveyResult.questionResponses.find(r => {
      if (r.isMultiple) {
        return r.questionResponseId.includes(id)
      } else {
        return r.questionResponseId === id
      }
    });

    return !!checked;
  }

  const renderOption = ({responseType, text, questionId, questionResponseId, lastOption}) => {
    const customResponse = lastOption && responseType.match(/text/);
    const isChecked = isCheckedOption(questionResponseId);
    let textField;
    let option;

    if (customResponse) {
      textField = <CustomResponseField name={questionId} id={questionResponseId} onChange={onCustomResponseChange}/>
    }

    if (responseType.match(/single/)) {
      option = <RadioButtonOption
        text={text}
        name={questionId}
        id={questionResponseId}
        isChecked={isChecked}
        onChange={onChange}
        value={customResponse ? 'custom' : 'predefined'}
      />
    } else {
      option = <CheckBoxOption
        text={text}
        name={questionId}
        id={questionResponseId}
        isChecked={isChecked}
        onChange={onChange}
      />
    }

    return responseOption(option, textField);
  }

  return(
    <li key={index} className="list-none text-left">
      {renderOption({
        responseType,
        questionId,
        questionResponseId,
        text: name,
        lastOption: isLast,
      })}
    </li>
  )
}

export default QuestionResponse;

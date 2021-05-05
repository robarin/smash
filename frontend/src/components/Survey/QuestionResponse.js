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
    const id = questionResponseId;

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
    const isMultiple = responseType.match(/multiple/);
    let optionValue;
    let textField;
    let option;

    if (customResponse) {
      textField = <CustomResponseField name={questionId} id={questionResponseId} onChange={onCustomResponseChange}/>
      optionValue = isMultiple ? 'custom-multiple' : 'custom-single';
    } else {
      optionValue = isMultiple ? 'multiple' : 'single';
    }

    if (isMultiple) {
      option = <CheckBoxOption
        text={text}
        name={questionId}
        id={questionResponseId}
        isChecked={isChecked}
        onChange={onChange}
        value={optionValue}
      />
    } else {
      option = <RadioButtonOption
        text={text}
        name={questionId}
        id={questionResponseId}
        isChecked={isChecked}
        onChange={onChange}
        value={optionValue}
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

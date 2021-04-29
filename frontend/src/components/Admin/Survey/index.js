import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {showFlashMessage} from "@actions/flash";
import { fetchSurvey } from '@actions/survey';
import { createSurveyQuestion } from '@actions/surveyQuestion';
import SurveyQuestion from '../SurveyQuestion';
import Form from '../SurveyQuestion/Form';

const Survey = ({fetchSurvey, createSurveyQuestion, showFlashMessage}) => {
  const [survey, setSurvey] = useState();
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(false);
  const { id } = useParams();

  const handleCreate = (body) => {
    createSurveyQuestion({...body, surveyId: survey.id}).then((result) => {
      setSurveyQuestions(result);
      setNewQuestion(false);
      showFlashMessage({
        title: 'Success',
        text: 'New question was successfully created',
        type: 'success',
      });
    })
  }

  const updateSurveyQuestion = (newSurveyQuestions) => {
    setSurveyQuestions(newSurveyQuestions);
    showFlashMessage({
      title: 'Success',
      text: 'Survey question was successfully updated',
      type: 'success',
    });
  }

  useEffect(() => {
    fetchSurvey(id).then((result) => {
      const { id, name, description, survey_type, response_types, survey_questions } = result;
      setSurvey({ id, name, description, survey_type, response_types });
      setSurveyQuestions(survey_questions);
    })
  }, []);

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          {survey && survey.name}
        </h1>
        <Button color='primary' onClick={() => setNewQuestion(true)} >Add question</Button>
      </div>
      {newQuestion && <Form
        title='New survey question'
        questionResponses={[]}
        responseTypes={survey.response_types}
        close={() => setNewQuestion(false)}
        handler={handleCreate}
      />}
      {surveyQuestions.map((surveyQuestion) => {
        return(<SurveyQuestion key={surveyQuestion.id} params={surveyQuestion} responseTypes={survey.response_types} handleUpdate={updateSurveyQuestion} />)
      })}
    </div>
  )
}

const mapDispatchToProps = {
  fetchSurvey,
  createSurveyQuestion,
  showFlashMessage,
}

export default connect(null, mapDispatchToProps)(Survey);

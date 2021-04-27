import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import QuestionResponse from '../QuestionResponse';
import { updateSurveyQuestion } from '@actions/surveyQuestion';
import Form from './Form';;

const useStyles = makeStyles({
  card: {
    minWidth: 650,
    marginBottom: 8,
  },
});

const SurveyQuestion = ({params, responseTypes, handleUpdate, updateSurveyQuestion}) => {
  const classes = useStyles();
  const { id, body, position, response_type, question_responses } = params;
  const [edit, setEdit] = useState(false);

  const handleEdit = (body) => {
    updateSurveyQuestion(id, body).then((result) => {
      setEdit(false);
      handleUpdate(result);
    })
  }

  return(
    edit ? (
      <Form 
        title='Edit survey question'
        surveyQuestion={{id, body, position, response_type}}
        questionResponses={question_responses}
        responseTypes={responseTypes}
        close={() => setEdit(false)} 
        handler={handleEdit}
      />
    ) : (
      <Card className={classes.card} key={id}>
        <CardContent>
          <div className='flex'>
            <div className='mr-4'>
              <Typography gutterBottom variant="body1">
                {position}
              </Typography>
            </div>
            <Typography gutterBottom variant="body1">
              {body}
            </Typography>
          </div>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p" align='left'>
            Response type: {response_type.replaceAll('_', ' ')}
          </Typography>
          <br />
          <div>
            <Typography variant="body1" align='left'>
              Responses:
            </Typography>
            {question_responses && <QuestionResponse responses={question_responses} responseType={response_type} />}
          </div>
          <div className='text-right'>
            <Button onClick={() => setEdit(true)}>Edit</Button>
          </div>
        </CardContent>
      </Card>
    )
  )
}

const mapDispatchToProps = {
  updateSurveyQuestion,
}

export default connect(null, mapDispatchToProps)(SurveyQuestion);

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { requestGet } from '@utils/request';
import { API_ROUTES } from '@utils/constants';
import QuestionResponse from './QuestionResponse';

const useStyles = makeStyles({
  card: {
    minWidth: 650,
    marginBottom: 8,
  },
  addResponseButton: {
    textAlign: 'left',
  },
});

export default () => {
  const classes = useStyles();
  const [survey, setSurvey] = useState();
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    requestGet(`${API_ROUTES.admin.surveys}/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((survey) => {
          setSurvey(survey.data.attributes);
          setSurveyQuestions(survey.included);
        })
      }
    });
  }, []);

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          {survey && survey.name}
        </h1>
        <Button color='primary'>Add question</Button>
      </div>
      {surveyQuestions.map((surveyQuestion) => {
        const {
          attributes: {
            id,
            position,
            question
          }
        } = surveyQuestion;
        const {
          attributes: {
            body,
            name,
            response_type,
            question_type,
            question_responses
          }
        } = question;
        const responses = question_responses.map((qr) => qr.attributes.response.attributes);

        return(
          <Card className={classes.card} key={id}>
            <CardContent>
              <div className='flex justify-between'>
                <div className='flex'>
                  <div className='mr-4'>
                    <Typography gutterBottom variant="body1">
                      {position}
                    </Typography>
                  </div>
                  <Typography gutterBottom variant="body1">
                    {name}
                  </Typography>
                </div>
                <div>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </div>
              </div>
              <Typography gutterBottom variant="body1" component="p" align='left'>
                {body}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" align='left'>
                Question type: {question_type.attributes.name}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" align='left'>
                Response type: {response_type}
              </Typography>
              <br />
              <div>
                <Typography variant="body1" align='left'>
                  Responses:
                </Typography>
                {responses && <QuestionResponse responses={responses} responseType={response_type} />}
                <div className={classes.addResponseButton}>
                  <Button>Add response</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

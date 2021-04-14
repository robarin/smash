import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { requestGet } from '../../../utils/request';
import { API_ROUTES } from '../../../utils/constants';

import SurveysList from '../../../components/Admin/Surveys';

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    requestGet(API_ROUTES.admin.surveys).then((res) => {
      if (res.ok) {
        res.json().then((surveys) => {
          setSurveys(surveys.data)
        })
      }
    });
  }, []);

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Surveys
        </h1>
        <Button color='primary'>Create survey</Button>
      </div>
      {surveys && (
        <SurveysList list={surveys}/>
      )}
    </div>
  )
}

export default Surveys;

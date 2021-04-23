import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {fetchSurveys} from '@actions/survey';

import SurveysList from '@components/Admin/Surveys';

const Surveys = ({fetchSurveys}) => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys().then(result => setSurveys(result));
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Surveys
        </h1>
        <Button color='primary'>Create survey</Button>
      </div>
      <SurveysList list={surveys}/>
    </div>
  )
}

const mapDispatchToProps = {
  fetchSurveys,
}

export default connect(null, mapDispatchToProps)(Surveys);


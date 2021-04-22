import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {showFlashMessage} from '@actions/flash';
import {setCurrentUser} from '@actions/currentUser';
import {profileSetup} from '@actions/profile';
import {fetchSurvey, setSurveyResult} from '@actions/survey';

import StepButtons from '@components/Navigation/StepButtons';
import SurveyBody from '@components/Survey/SurveyBody';

const BasicSurvey = (props) => {
  const {
    previousStep,
    accountInfo,
    showFlashMessage,
    setCurrentUser,
    profileSetup,
    fetchSurvey,
    surveyResult,
    setSurveyResult
  } = props;

  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const getSurvey = async () => {
    try {
      const result = await fetchSurvey();
      const {data: {attributes}} = result;

      return attributes;
    } catch (error) {
      setError({message: error.message || 'Something went wrong'})
    }
  }

  useEffect(() => {
    getSurvey().then(surveyData => {
      setSurvey(surveyData);
      setSurveyResult({...surveyResult, surveyId: surveyData.id});
    });
  }, []);

  const onFinish = async () => {
    accountInfo.surveyResult = surveyResult;

    try {
      const result = await profileSetup(accountInfo);
      setCurrentUser(result);
      showFlashMessage({
        show: true,
        type: 'success',
        title: 'Thanks!',
        text: 'Your profile has been set up'
      })
      history.push('/dashboard');
    } catch (error) {
      setError({message: error.message || 'Something went wrong'})
    }
  }

  return (
    <div className="mb-6">
      <div className="m-4">
        <h3 className="text-xl border-b-2 border-gray-100 pb-4">Survey</h3>
      </div>
      <div className="m-4 p-6 flex justify-center">
        {error && (
          <p className="text-red-500">{error.message}</p>
        )}
        {survey && (
          <SurveyBody survey={survey}/>
        )}
      </div>
      <StepButtons onPrevious={previousStep} onNext={onFinish} finish={true}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  surveyResult: state.surveyResult,
})

const mapDispatchToProps = {
  showFlashMessage,
  setCurrentUser,
  profileSetup,
  fetchSurvey,
  setSurveyResult,
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicSurvey);


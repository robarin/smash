import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {showFlashMessage} from '@actions/flash';
import {setCurrentUser} from '@actions/currentUser';
import {profileSetup} from '@actions/profile';
import {validateSurveyResult} from '@actions/utils/surveys';
import {fetchBasicSurvey, setSurveyResult, clearSurveyResult} from '@actions/survey';

import StepButtons from '@components/Navigation/StepButtons';
import SurveyBody from '@components/Survey/SurveyBody';

const BasicSurvey = (props) => {
  const {
    previousStep,
    accountInfo,
    showFlashMessage,
    setCurrentUser,
    profileSetup,
    fetchBasicSurvey,
    surveyResult,
    setSurveyResult,
    clearSurveyResult
  } = props;

  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState(null);
  const [surveyError, setSurveyError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchBasicSurvey().then(surveyData => {
      setSurvey(surveyData);
      setSurveyResult({...surveyResult, surveyId: surveyData.id});
    });
  }, []);

  const onFinish = async () => {
    const result = validateSurveyResult({survey, surveyResult, setError: setSurveyError});
    if (!result.valid) return;

    accountInfo.surveyResult = surveyResult;

    try {
      const result = await profileSetup(accountInfo);
      setCurrentUser(result);
      clearSurveyResult();

      history.push('/dashboard');

      showFlashMessage({
        show: true,
        type: 'success',
        title: 'Thanks!',
        text: 'Your profile has been set up'
      })
    } catch (error) {
      setError({message: error.message || 'Something went wrong'})
    }
  }

  return (
    <div className="mb-6">
      <div className="m-4">
        <h3 className="text-xl border-b-2 border-gray-100 pb-4">Survey</h3>
      </div>
      <div className="w-full">
        {error && (
          <p className="text-red-500">{error.message}</p>
        )}
        {survey && (
          <div className="w-full">
            <SurveyBody questions={survey.survey_questions}/>
          </div>
        )}
        <div className="w-full">
          {surveyError && (
            <p className="text-red-500">{surveyError}</p>
          )}
        </div>
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
  fetchBasicSurvey,
  setSurveyResult,
  clearSurveyResult,
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicSurvey);


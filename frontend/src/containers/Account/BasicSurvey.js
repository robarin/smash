import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import StepButtons from "./StepButtons";
import {showFlashMessage} from "../../actions/flash";
import {setCurrentUser} from "../../actions/currentUser";
import {profileSetup} from "../../actions/profile";

const BasicSurvey = ({ previousStep, accountInfo, showFlashMessage, setCurrentUser, profileSetup }) => {
  const history = useHistory();
  
  const onFinish = async () => {
    try {
      const result = await profileSetup(accountInfo);
      setCurrentUser(result);
      showFlashMessage({
        show: true,
        type: 'success',
        title: 'Great!',
        text: 'Your profile has been set up'
      })
      history.push('/dashboard');
    } catch(error) {
      console.log({ message: error.message || 'Something went wrong' });
    }
  }
  
  return(
    <div className="mb-6">
      <div className="m-4">
        <h3 className="text-xl border-b-2 border-gray-100 pb-4">Contact Info</h3>
      </div>
      <div className="m-4 p-6 flex justify-center">
        <p className="text-xl">Basic Survey</p>
      </div>
      <StepButtons onPrevious={previousStep} onNext={onFinish} finish={true} />
    </div>
  )
}

const mapDispatchToProps = {
  showFlashMessage,
  setCurrentUser,
  profileSetup,
}

export default connect(null, mapDispatchToProps)(BasicSurvey);


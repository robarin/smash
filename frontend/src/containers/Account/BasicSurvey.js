import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import StepButtons from "./StepButtons";
import {requestPost} from "../../utils/request";
import {API_ROUTES} from "../../utils/constants";
import saveCurrentUser from "../../utils/saveCurrentUser";
import {showFlashMessage} from "../../actions/flash";

const BasicSurvey = (props) => {
  const { previousStep, accountInfo, showFlashMessage, dispatch } = props;
  const history = useHistory();
  
  const onFinish = () => {
    requestPost(API_ROUTES.profile.setup, accountInfo).then((res) => {
      res.json().then(result => {
        if (res.ok) {
          saveCurrentUser(result);
          dispatch(showFlashMessage({
            show: true,
            type: 'success',
            title: 'Great!',
            text: 'Your profile has been set up'
          }))
          history.push('/dashboard');
        }
      })
    })
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

const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(null, mapDispatchToProps)(BasicSurvey);


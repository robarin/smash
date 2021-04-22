import React, {useState} from 'react';
import StepWizard from 'react-step-wizard';
import BaseInfo from './BaseInfo';
import ContactInfo from './ContactInfo';
import BasicSurvey from './BasicSurvey';

const steps = [
  BaseInfo,
  ContactInfo,
  BasicSurvey
]

const ProfileSetup = () => {
  const [accountInfo, setAccountInfo] = useState({});

  return (
    <div className="flex justify-center">
      <div className="lg:w-2/4 sm:w-full w-full lg:m-16 md:m-8 sm:m-4 p-6 shadow rounded-lg">
        <StepWizard transitions={{}}>
          {steps.map((Step, index, self) => {
            return (
              <Step key={index} accountInfo={accountInfo} setAccountInfo={setAccountInfo}/>
            )
          })}
        </StepWizard>
      </div>
    </div>
  )
}

export default ProfileSetup;

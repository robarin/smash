import React, {useState} from 'react';
import StepWizard from "react-step-wizard";
import BaseInfo from "./BaseInfo";
import ContactInfo from "./ContactInfo";
import BasicSurvey from "./BasicSurvey";

const AccountSetup = () => {
  const [accountInfo, setAccountInfo] = useState({});
  
  return(
    <div className="flex justify-center">
      <div className="lg:w-2/4 sm:w-full w-full lg:m-16 md:m-8 sm:m-4 p-6 shadow rounded-lg">
        <StepWizard transitions={{}}>
          <BaseInfo accountInfo={accountInfo} setAccountInfo={setAccountInfo} />
          <ContactInfo accountInfo={accountInfo} setAccountInfo={setAccountInfo} />
          <BasicSurvey accountInfo={accountInfo} setAccountInfo={setAccountInfo} />
        </StepWizard>
      </div>
    </div>
  )
}

export default AccountSetup;

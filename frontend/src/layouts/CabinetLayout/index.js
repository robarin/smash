import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FlashDelay from '@components/Utils/FlashDelay';

import NavMenu from "./NavMenu";
import ProfileSetup from "@containers/Profile/SetupWizard/ProfileSetup";
import SurveyModal from '../../components/Survey/SurveyModal';

const CabinetLayout = ({ children, flashMessage, currentUser }) => {
  const history = useHistory();

  const pageTitles = {
    dashboard: 'Dashboard',
    profile: 'Profile'
  }

  if (currentUser.isLogged && currentUser.sign_in_count === 1 && !currentUser.person.province) {
    return(
      <ProfileSetup />
    )
  }

  return (
    <div className="applicationLayout grid grid-cols-12">
      {flashMessage.show && (
        <FlashDelay />
      )}
      <div className="h-screen sidebar-bg-main">
        <div className="m-4 h-16 p-6 bg-white text-center rounded-lg">
        </div>
        <div className="text-white font-medium">
          SMASH!
        </div>
        <div className="bg-white sidebar-bg-main mt-4">
          <NavMenu />
        </div>
      </div>
      <div className="col-span-11 h-screen p-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 border-b-2 p-4 text-left">
            <p className="text-xl">{pageTitles[history.location.pathname.replace('/', '')]}</p>
          </div>
          <div className="col-span-12 p-4">
            {currentUser.survey_questions && (
              <SurveyModal questions={currentUser.survey_questions} />
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
  currentUser: state.currentUser,
})

export default connect(mapStateToProps, null)(CabinetLayout);


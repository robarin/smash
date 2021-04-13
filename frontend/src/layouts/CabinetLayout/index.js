import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FlashDelay from '../../components/Utils/FlashDelay';

import NavMenu from "./NavMenu";

const CabinetLayout = ({ children, flashMessage }) => {
  const history = useHistory();
  
  const pageTitles = {
    dashboard: 'Dashboard',
    profile: 'Profile'
  }
  
  return (
    <div className="applicationLayout grid grid-cols-12">
      {flashMessage.show && (
        <FlashDelay />
      )}
      <div className="col-span-1 h-screen border-r-2 border-gray-100 p-4">
        <div className="w-full h-16 bg-gray-300">
          LOGO
        </div>
        <div className="bg-white mt-4">
          <NavMenu />
        </div>
      </div>
      <div className="col-span-11 h-screen p-6">
        <div className="grid grid-cols-12">
          <div className="col-span-12 border-b-2 p-4 text-left">
            <p className="text-xl">{pageTitles[history.location.pathname.replace('/', '')]}</p>
          </div>
          <div className="col-span-12 p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
})

export default connect(mapStateToProps, null)(CabinetLayout);


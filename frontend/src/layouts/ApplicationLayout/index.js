import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import FlashDelay from '@components/Utils/FlashDelay';
import Header from './Header';

const ApplicationLayout = ({ children, flashMessage }) => {
  return (
    <div className="applicationLayout grid grid-cols-12">
      {flashMessage.show && (
        <FlashDelay />
      )}
      <div className="col-span-12">
        <Header />
      </div>
      <div className="col-span-12 h-screen">
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
  currentUser: state.currentUser
})

export default connect(mapStateToProps, null)(ApplicationLayout);

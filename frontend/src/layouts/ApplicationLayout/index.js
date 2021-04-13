import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FlashDelay from '../../components/Utils/FlashDelay';
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
})

export default connect(mapStateToProps, null)(ApplicationLayout);



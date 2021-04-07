import React from 'react';
import { connect } from 'react-redux';
import FlashDelay from '../../components/Utils/FlashDelay';
import Header from './Header';

const ApplicationLayout = ({ children, flashMessage }) => {
  return (
    <div className="applicationLayout">
      {flashMessage.show && (
        <FlashDelay />
      )}
      <Header />
      {children}
    </div>
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
})

export default connect(mapStateToProps, null)(ApplicationLayout);



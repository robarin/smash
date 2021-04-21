import React from 'react';
import { connect } from 'react-redux';
import {showFlashMessage} from "@actions/flash";

const ContainerWrapper = ({children, currentUser}) => {
  return(
    <>
      {currentUser.isLogged && children}
    </>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerWrapper);

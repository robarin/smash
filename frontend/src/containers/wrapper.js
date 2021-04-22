import React from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(ContainerWrapper);

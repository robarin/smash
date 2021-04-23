import React, {useEffect} from 'react'
import { Route } from 'react-router-dom'
import {useHistory} from 'react-router-dom';

import CabinetLayout from './index';
import { connect } from "react-redux";

const CabinetRoute = ({ currentUser, component: Component, ...rest }) => {
  const history = useHistory()

  if (!currentUser.isLogged) {
    history.push('/login')
  }

  return (
    <Route { ...rest } render={props => (
      <CabinetLayout>
        <Component { ...props } />
      </CabinetLayout>
    )} />
  )
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps)(CabinetRoute);

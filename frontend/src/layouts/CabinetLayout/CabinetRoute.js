import React from 'react'
import { Route } from 'react-router-dom'
import CabinetLayout from './index';

const CabinetRoute = ({ component: Component, ...rest }) => {
  return (
    <Route { ...rest } render={props => (
      <CabinetLayout>
        <Component { ...props } />
      </CabinetLayout>
    )} />
  )
}

export default CabinetRoute;

import React from 'react'
import { Route } from 'react-router-dom'
import ApplicationLayout from './index';

const ApplicationRoute = ({ component: Component, ...rest }) => {
  return (
    <Route { ...rest } render={props => (
      <ApplicationLayout>
        <Component { ...props } />
      </ApplicationLayout>
    )} />
  )
}

export default ApplicationRoute

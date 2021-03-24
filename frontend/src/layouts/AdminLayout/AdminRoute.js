import React from 'react'
import { Route } from 'react-router-dom'
import AdminLayout from './index';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route { ...rest } render={props => (
      <AdminLayout>
        <Component { ...props } />
      </AdminLayout>
    )} />
  )
}

export default AdminRoute

import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import AdminLayout from './index';
import { connect } from "react-redux";

const AdminRoute = ({currentUser, component: Component, ...rest}) => {
  const history = useHistory()

  if (!currentUser.isLogged || !currentUser.admin) {
    history.push('/login')
  }

  return (
    <Route {...rest} render={props => (
      <AdminLayout>
        <Component {...props} />
      </AdminLayout>
    )} />
  )
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps)(AdminRoute);

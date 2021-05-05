import './App.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import Dashboard from './containers/Cabinet/Dashboard';

import AdminHome from './containers/Admin/Home';
import Users from './containers/Admin/Users';
import SurveyTypes from './containers/Admin/SurveyTypes';
import Surveys from './containers/Admin/Surveys';
import Survey from './components/Admin/Survey';

import ApplicationRoute from './layouts/ApplicationLayout/ApplicationRoute';
import AdminRoute from './layouts/AdminLayout/AdminRoute';
import CabinetRoute from './layouts/CabinetLayout/CabinetRoute';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { getCurrentUser } from "./actions/currentUser";

library.add(fab)

const App = ({getCurrentUser, currentUser}) => {
  useEffect(() => {
    getCurrentUser()
  }, [])

  if (currentUser.isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <ApplicationRoute exact path="/" component={Home} />
          <ApplicationRoute path="/login" component={Login} />
          <ApplicationRoute path="/signup" component={Signup} />

          <CabinetRoute path="/dashboard" component={Dashboard} />
          <CabinetRoute path="/profile" component={Profile} />

          <AdminRoute exact path="/admin" component={AdminHome} />
          <AdminRoute exact path="/admin/users" component={Users} />
          <AdminRoute exact path="/admin/surveys" component={Surveys} />
          <AdminRoute exact path="/admin/surveys/:id" component={Survey} />
          <AdminRoute exact path="/admin/survey_types" component={SurveyTypes} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = ({currentUser}) => ({
  currentUser
})

const mapDispatchToProps = {
  getCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

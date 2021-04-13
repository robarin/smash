import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import Dashboard from './containers/Cabinet/Dashboard';

import AdminHome from './containers/Admin/Home';
import Users from './containers/Admin/Users';
import TagTypes from './containers/Admin/TagTypes';
import SurveyTypes from './containers/Admin/SurveyTypes';

import ApplicationRoute from './layouts/ApplicationLayout/ApplicationRoute';
import AdminRoute from './layouts/AdminLayout/AdminRoute';
import CabinetRoute from './layouts/CabinetLayout/CabinetRoute';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Modal from './layouts/AdminLayout/Modal'

library.add(fab)

function App({modalIsOpen}) {
  return (
    <div className="App">
      {modalIsOpen && (
        <Modal open={modalIsOpen} />
      )}
      <Router>
        <Switch>
          <ApplicationRoute exact path="/" component={Home} />
          <ApplicationRoute path="/login" component={Login} />
          <ApplicationRoute path="/signup" component={Signup} />
          
          <CabinetRoute path="/dashboard" component={Dashboard} />
          <CabinetRoute path="/profile" component={Profile} />

          <AdminRoute exact path="/admin" component={AdminHome} />
          <AdminRoute exact path="/admin/users" component={Users} />
          <AdminRoute exact path="/admin/tag_types" component={TagTypes} />
          <AdminRoute exact path="/admin/survey_types" component={SurveyTypes} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  modalIsOpen: state.globalModal.isOpen,
})

export default connect(mapStateToProps)(App);

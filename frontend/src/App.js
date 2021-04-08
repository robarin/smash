import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import AdminHome from './containers/Admin/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Users from './containers/Admin/Users';
import TagTypes from './containers/Admin/TagTypes';

import ApplicationRoute from './layouts/ApplicationLayout/ApplicationRoute';
import AdminRoute from './layouts/AdminLayout/AdminRoute';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Modal from './layouts/AdminLayout/Modal'

library.add(fab)

function App({modalIsOpen}) {
  return (
    <div className="App">
      <Modal open={modalIsOpen}/>
      <Router>
        <Switch>
          <ApplicationRoute exact path="/" component={Home} />
          <ApplicationRoute path="/login" component={Login} />
          <ApplicationRoute path="/signup" component={Signup} />

          <AdminRoute exact path="/admin" component={AdminHome} />
          <AdminRoute exact path="/admin/users" component={Users} />
          <AdminRoute exact path="/admin/tag_types" component={TagTypes} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  modalIsOpen: state.globalModal.isOpen,
})

export default connect(mapStateToProps)(App);

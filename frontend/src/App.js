import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import AdminHome from './containers/Admin/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Users from './containers/Admin/Users';

import ApplicationRoute from './layouts/ApplicationLayout/ApplicationRoute';
import AdminRoute from './layouts/AdminLayout/AdminRoute';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ApplicationRoute exact path="/" component={Home} />
          <ApplicationRoute path="/login" component={Login} />
          <ApplicationRoute path="/signup" component={Signup} />

          <AdminRoute exact path="/admin" component={AdminHome} />
          <AdminRoute exact path="/admin/users" component={Users} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

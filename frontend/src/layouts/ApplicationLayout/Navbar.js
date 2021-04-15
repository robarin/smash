import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { removeCurrentUser } from '../../actions/currentUser';
import { requestDelete } from '../../utils/request';
import { API_ROUTES } from '../../utils/constants';

import { Button, withStyles, Typography } from '@material-ui/core';
import NavLink from '../../components/Navigation/NavLink';

const ProfileButton = withStyles({
  root: {
    color: 'white',
  },
})(Button);

function Navbar(props) {
  const { currentUser, removeCurrentUser, dispatch } = props;
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();

    requestDelete(API_ROUTES.logout).then((res) => {
      if (res.ok) {
        history.push('/');
        dispatch(removeCurrentUser());
      }
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    history.push('/login');
  }

  const isUserAdmin = () => {
    return currentUser && currentUser.admin;
  }

  return (
    <nav className="bg-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setMainMenuOpen(!mainMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink href="/">Home</NavLink>
                {currentUser && !currentUser.admin && (
                  <>
                    <NavLink href="/profile">Profile</NavLink>
                    <NavLink href="/dashboard">Cabinet</NavLink>
                  </>
                )}
                {isUserAdmin() && (
                  <NavLink href="/admin">Admin</NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                {currentUser
                  ? <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                  : <NavLink to="/" onClick={handleLogin}>Login</NavLink>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {mainMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Typography className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              <Link to="/">Home</Link>
            </Typography>
            {isUserAdmin() && (
              <Typography className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                <Link to="/admin">Admin</Link>
              </Typography>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
  removeCurrentUser,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

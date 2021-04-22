import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from '@actions/currentUser';

const NavMenu = ({logout}) => {
  const history = useHistory();

  const handleLogout = () => logout()

  return (
    <>
      <ul>
        <li>
              <span onClick={() => history.push('/dashboard')}
                    className="block p-4 sidebar-bg-main text-white hover:text-gray-900 hover:bg-white cursor-pointer">
                <HomeIcon/>
                <span className="block text-sm">Dashboard</span>
              </span>
        </li>
        <li>
              <span onClick={() => history.push('/profile')}
                    className="block p-4 sidebar-bg-main text-white hover:text-gray-900 hover:bg-white cursor-pointer">
                <PeopleIcon/>
                <span className="block text-sm">Profile</span>
              </span>
        </li>
        <li>
              <span onClick={handleLogout} className="block p-4 sidebar-bg-main text-white hover:text-gray-900 hover:bg-white cursor-pointer">
                <ExitToAppIcon/>
                <span className="block text-sm">Logout</span>
              </span>
        </li>
      </ul>
    </>
  )
}

const mapDispatchToProps = {
  logout,
}

export default connect(null, mapDispatchToProps)(NavMenu);

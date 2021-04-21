import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {logout} from "@actions/currentUser";

const NavMenu = ({logout}) => {
  const history = useHistory();

  const handleLogout = () => logout()

  return (
    <>
      <ul>
        <li>
              <span onClick={() => history.push('/dashboard')}
                    className="block p-4 text-grey-darker hover:bg-gray-100 cursor-pointer">
                <HomeIcon/>
              </span>
        </li>
        <li>
              <span onClick={() => history.push('/profile')}
                    className="block p-4 text-grey-darker hover:bg-gray-100 cursor-pointer">
                <PeopleIcon/>
              </span>
        </li>
        <li>
              <span onClick={handleLogout} className="block p-4 text-grey-darker hover:bg-gray-100 cursor-pointer">
                <ExitToAppIcon/>
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

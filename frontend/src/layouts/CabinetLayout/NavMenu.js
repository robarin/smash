import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {requestDelete} from "../../utils/request";
import {API_ROUTES} from "../../utils/constants";

import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {removeCurrentUser} from "../../actions/currentUser";

const NavMenu = ({removeCurrentUser, dispatch}) => {
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

const mapDispatchToProps = dispatch => ({
  removeCurrentUser,
  dispatch
})

export default connect(null, mapDispatchToProps)(NavMenu);



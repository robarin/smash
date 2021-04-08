import React, { useState } from 'react';
import { connect } from "react-redux";
import { requestPost } from '../../utils/request';
import { showFlashMessage } from '../../actions/flash';
import { useHistory } from 'react-router-dom';
import { API_ROUTES } from '../../utils/constants';
import saveCurrentUser from '../../utils/saveCurrentUser';

import { TextField, Button, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Oauth from '../Oauth';

const Login = ({ dispatch, showFlashMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();

    const body = {
      email,
      password
    }

    requestPost(API_ROUTES.login, body).then((res) => {
      res.json().then(result => {
        if (res.ok) {
          saveCurrentUser(result);
          setFlashMessage();
          
          history.push('/');
        } else {
          setLoginError(result.message);
        }
      })
    })
  }
  
  const setFlashMessage = () => {
    dispatch(showFlashMessage({
      show: true,
      title: 'Success',
      text: 'You have successfully logged in',
      type: 'success',
    }))
  }

  return(
    <>
      <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
        <div className="mx-auto">
          <Typography variant="h5">Login</Typography>
          <form>
            <div className="m-4">
              <TextField required type="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="m-4">
              <TextField required type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {loginError && (
              <div className="m-4">
                <p className="text-red-600">{loginError}</p>
              </div>
            )}
            <div className="m-4">
              <Button variant="contained" color="primary" onClick={login}>Log in</Button>
            </div>
            <div className="m-4">
              <Link component="button" onClick={() => history.push('/signup')}>Sign up</Link>
            </div>
            <Oauth
              setLoginError={setLoginError}
              saveCurrentUser={saveCurrentUser}
              history={history}
            />
          </form>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { showFlashMessage } from '../../actions/flash';
import { useHistory } from 'react-router-dom';

import { TextField, Button, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Oauth from '../Oauth';
import {signIn} from "../../actions/currentUser";

const queryString = require('query-string');
const confirmationTypes = {
  success: {
    title: 'Success',
    text: 'Your account has been confirmed',
    type: 'success',
  },
  failure: {
    title: 'Failure',
    text: 'An error occured while confirmation',
    type: 'error',
  }
}

const Login = ({ currentUser, showFlashMessage, signIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);

  useEffect(() => {
    if (queryParams.confirmation) {
      setConfirmationMessage();
    }
  }, []);

  useEffect(() => {
    if (currentUser.isLogged) {
      history.push(currentUser.admin ? '/admin' : '/dashboard');
    }
  }, [currentUser])

  const login = async () => {
    try {
      await signIn(email, password)
      setFlashMessage();
    } catch(error) {
      setLoginError(error.message);
    }
  }

  const setFlashMessage = () => {
    showFlashMessage({
      show: true,
      title: 'Success',
      text: 'You have successfully logged in',
      type: 'success',
    })
  }

  const setConfirmationMessage = () => {
    showFlashMessage({
      show: true,
      ...confirmationTypes[queryParams.confirmation]
    })
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

const mapDispatchToProps = {
  showFlashMessage,
  signIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

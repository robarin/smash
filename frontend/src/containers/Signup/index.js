import React, { useState } from 'react';
import { connect } from "react-redux";
import { requestPost } from '../../utils/request';
import { setCurrentUser } from '../../actions/currentUser';
import { useHistory } from "react-router-dom";
import { API_ROUTES } from '../../utils/constants';

import Typography from '@material-ui/core/Typography';
import { Button, TextField, Link } from '@material-ui/core';

const Signup = (props) => {
  const { dispatch, setCurrentUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const register = (e) => {
    e.preventDefault();

    const body = {
      fullName,
      email,
      password,
    }

    requestPost(API_ROUTES.signup, body).then((res) => {
      if (res.ok) {
        res.json().then(user => {
          dispatch(setCurrentUser(user));
          history.push('/');
        })
      } else {
        setError({ message: res?.message || 'Something went wrong' })
      }
    })
  }

  return(
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="mx-auto">
        <Typography variant="h5">Sign up</Typography>
        <form>
          <div className="m-4">
            <TextField error={Boolean(error)} required type="text" label="Full Name" variant="outlined" onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="m-4">
            <TextField error={Boolean(error)} required type="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="m-4">
            <TextField error={Boolean(error)} required type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && (
            <div className="m-4">
              <p className="text-red-600">{error.message}</p>
            </div>
          )}
          <div className="m-4">
            <Button variant="contained" color="primary" onClick={register}>Sign up</Button>
          </div>
          <div className="m-4">
            <Link component="button" onClick={() => history.push('/login')}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

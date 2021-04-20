import React, { useState } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../actions/signUp";

import Typography from '@material-ui/core/Typography';
import { Button, TextField, Link } from '@material-ui/core';
import PageMessage from '../../components/Utils/PageMessage';

const Signup = ({signUp}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const register = async () => {
    const body = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
    }

    try {
      await signUp(body);
      setSuccess(true);
    } catch(error) {
      setError({ message: error.message || 'Something went wrong' });
    }
  }
  
  if (success) {
    return(
      <PageMessage
        title="Signed up successfully"
        text="A confirmation link has been sent to your email address"
      />
    )
  }

  return(
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="mx-auto">
        <Typography variant="h5">Sign up</Typography>
        <form>
          <div className="m-4">
            <TextField error={Boolean(error)} required type="text" label="First Name" variant="outlined" onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="m-4">
            <TextField error={Boolean(error)} required type="text" label="Last Name" variant="outlined" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="m-4">
            <TextField error={Boolean(error)} required type="text" label="Middle Name" variant="outlined" onChange={(e) => setMiddleName(e.target.value)} />
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

const mapDispatchToProps = {
  signUp,
}

export default connect(null, mapDispatchToProps)(Signup);

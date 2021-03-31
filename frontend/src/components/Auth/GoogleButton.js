import React from 'react';
import GoogleLogin from 'react-google-login';
import {requestPost} from "../../utils/request";
import {API_ROUTES} from "../../utils/constants";

export default function (props) {
  const { setLoginError, saveCurrentUser, history } = props;
  const successCallback = (res) => {
    const { profileObj: { email, familyName, givenName, googleId } } = res;
    const authData = {
      email,
      first_name: givenName,
      last_name: familyName,
      provider: 'google',
      uid: googleId
    }
    
    requestPost(API_ROUTES.oauth.signup, authData).then((res) => {
      res.json().then(result => {
        if (res.ok) {
          saveCurrentUser(result.data.attributes);
          history.push('/');
        } else {
          setLoginError(result.message);
        }
      })
    })
  }
  
  const failureCallback = (res) => {
    console.log('Google Failure Callback', res);
  }
  
  return(
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={successCallback}
        onFailure={failureCallback}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}

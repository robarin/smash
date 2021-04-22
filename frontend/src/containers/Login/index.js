import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {showFlashMessage} from '@actions/flash';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import EmailField from '@components/Form/EmailField';
import PasswordField from '@components/Form/PasswordField';

import Oauth from '@containers/Oauth';
import {signIn} from '@actions/currentUser';

import {useForm} from 'react-hook-form';

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

const Login = ({currentUser, showFlashMessage, signIn}) => {
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);
  const {register, formState: {errors}, handleSubmit} = useForm();

  useEffect(() => {
    if (queryParams.confirmation) {
      setConfirmationMessage();
    }
  }, []);

  useEffect(() => {
    if (currentUser.isLogged) {
      history.push(currentUser.admin ? '/admin' : '/dashboard');
    }
  }, [currentUser]);

  if (Object.keys(errors).length !== 0) {
    Object.entries(errors).forEach(error => {
      error[1].ref.classList.add('border-red-600');
    })
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

  const onSubmit = async (data) => {
    const {email, password} = data;

    try {
      await signIn(email, password)
      setFlashMessage();
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
        <div className="mx-auto w-4/5">
          <Typography variant="h5">Login</Typography>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" value="false"/>
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <EmailField
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <PasswordField register={register} errors={errors}/>
              </div>
            </div>
            {loginError && (
              <div className="m-2 text-sm">
                <p className="text-red-600">{loginError}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox"
                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>
          </form>
          <div className="m-4 text-sm">
            <a href="" className="font-medium text-indigo-600 hover:text-indigo-500"
               onClick={(e) => {
                 e.preventDefault();
                 history.push('/signup');
               }}>
              Sign up
            </a>
          </div>
          <div className="m-4 text-sm">
            <p className="text-gray-400">Or continue with</p>
          </div>
          <Oauth
            setLoginError={setLoginError}
            history={history}
          />
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

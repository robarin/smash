import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signUp} from '@actions/signUp';
import {useForm} from 'react-hook-form';

import Typography from '@material-ui/core/Typography';
import PageMessage from '@components/Utils/PageMessage';

import EmailField from '@components/Form/EmailField';
import PasswordField from '@components/Form/PasswordField';
import TextField from '@components/Form/TextField';

const Signup = ({signUp}) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {register, formState: {errors}, handleSubmit} = useForm();

  const history = useHistory();

  if (Object.keys(errors).length !== 0) {
    Object.entries(errors).forEach(error => {
      error[1].ref.classList.add('border-red-600');
    })
  }

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      setSuccess(true);
    } catch (error) {
      setError({message: error.message || 'Something went wrong'});
    }
  }

  if (success) {
    return (
      <PageMessage
        title="Signed up successfully"
        text="A confirmation link has been sent to your email address"
      />
    )
  }

  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="mx-auto w-4/5">
        <Typography variant="h5">Sign up</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-4">
            <TextField register={register} errors={errors} name="firstName" label="First name" />
          </div>
          <div className="m-4">
            <TextField register={register} errors={errors} name="lastName" label="Last name" />
          </div>
          <div className="m-4">
            <TextField register={register} errors={errors} name="middleName" label="Middle name" />
          </div>
          <div className="m-4">
            <EmailField register={register} errors={errors}/>
          </div>
          <div className="m-4">
            <PasswordField register={register} errors={errors}/>
          </div>
          {error && (
            <div className="m-4">
              <p className="text-red-600">{error.message}</p>
            </div>
          )}
          <div className="m-4">
            <button type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign up
            </button>
          </div>
          <div className="m-4 text-sm">
            <a href="" className="font-medium text-indigo-600 hover:text-indigo-500"
               onClick={(e) => {
                 e.preventDefault();
                 history.push('/login');
               }}>
              Log in
            </a>
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

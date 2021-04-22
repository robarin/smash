import React from 'react';
import {EMAIL_REGEX, TEXT_FIELD_CLASS_LIST} from './constants';

const EmailField = ({classes, register, errors}) => {
  const classList = classes || TEXT_FIELD_CLASS_LIST;
  const showEmailError = (error) => {
    return error.type === 'pattern' ? 'Invalid email' : 'Email must not be empty'
  }

  const onInputChange = (e) => {
    e.target.classList.remove('border-red-600');
  }

  return (
    <>
      <input {...register('email', {
        required: true,
        pattern: EMAIL_REGEX
      })}
             className={classList}
             placeholder="Email address"
             onChange={onInputChange}
      />
      {errors.email && (
        <p className="mt-2 text-sm text-red-600">
          {showEmailError(errors.email)}
        </p>
      )}
    </>
  )
}

export default EmailField;

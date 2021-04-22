import React from 'react';
import { PASSWORD_MIN_LENGTH, TEXT_FIELD_CLASS_LIST } from './constants';

const PasswordField = ({classes, register, errors}) => {
  const classList = classes || TEXT_FIELD_CLASS_LIST;
  const showPasswordError = (error) => {
    return error.type === 'minLength' ? `Password's min length is ${PASSWORD_MIN_LENGTH}` : 'Password must not be empty'
  }

  const onInputChange = (e) => {
    e.target.classList.remove('border-red-600');
  }

  return (
    <>
      <input {...register('password', {
        required: true,
        minLength: PASSWORD_MIN_LENGTH
      })}
             className={classList}
             type="password"
             placeholder="Password"
             onChange={onInputChange}
      />
      {errors.password && (
        <p className="mt-2 text-sm text-red-600">
          {showPasswordError(errors.password)}
        </p>
      )}
    </>
  )
}

export default PasswordField;

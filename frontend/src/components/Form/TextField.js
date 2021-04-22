import React from 'react';
import {TEXT_FIELD_CLASS_LIST} from './constants';

const TextField = ({classes, register, errors, name, label}) => {
  const classList = classes || TEXT_FIELD_CLASS_LIST;

  const onInputChange = (e) => {
    e.target.classList.remove('border-red-600');
  }

  return (
    <>
      <input {...register(name, {
        required: `${label} must not be empty`,
      })}
             className={classList}
             name={name}
             type="text"
             placeholder={label}
             onChange={onInputChange}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name].message}
        </p>
      )}
    </>
  )
}

export default TextField;

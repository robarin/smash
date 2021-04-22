import React from 'react';

const CustomResponseField = ({name, id, onChange}) => {
  return (
    <textarea
      className="form-input hidden p-2 w-full border mt-2 border-gray-200 rounded"
      name={name}
      id={`custom-response-${id}`}
      onChange={onChange}
    />
  )
}

export default CustomResponseField;

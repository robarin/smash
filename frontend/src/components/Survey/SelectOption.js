import React from 'react';
import Select from 'react-select';

const SelectOption = ({isMulti, options, name, onChange}) => {
  return (
    <Select
      isMulti={isMulti}
      name={name}
      onChange={onChange}
      maxMenuHeight={150}
      className="basic-single z-30"
      classNamePrefix="question-response-select"
      isClearable={true}
      options={options}
    />
  )
}

export default SelectOption;

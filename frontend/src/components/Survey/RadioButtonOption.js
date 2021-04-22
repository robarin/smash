import React from 'react';

const RadioButtonOption = ({text, name, id, value, isChecked, onChange}) => {
  return (
    <label>
      <input type="radio" checked={isChecked}
             className="form-radio" value={value} name={name} id={id} onChange={onChange}/>
      <span className="ml-2">{text}</span>
    </label>
  )
}

export default RadioButtonOption;

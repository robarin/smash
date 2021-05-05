import React from 'react';

const CheckBoxOption = ({text, name, id, isChecked, onChange, value}) => {
  return (
    <label>
      <input type="checkbox" checked={isChecked}
             className="form-checkbox" value={value} name={name} id={id} onChange={onChange}/>
      <span className="ml-2">{text}</span>
    </label>
  )
}

export default CheckBoxOption;

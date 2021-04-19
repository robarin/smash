import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export default ({type, className}) => {
  switch(type) {
    case 'radio':
      return <RadioButtonUncheckedIcon className={className} />;
      break;
    case 'checkbox':
      return <CheckBoxOutlineBlankIcon className={className} />;
      break;
  }
}

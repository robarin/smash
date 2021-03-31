import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

export default ({ href, social, onClick, children }) => {
  return (
    <Link to={{ pathname: href || '' }} onClick={onClick} className="p-3 h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900">
      <span className="mr-1">
        <FontAwesomeIcon icon={['fab', social]} />
      </span>
      {children}
    </Link>
  )
}

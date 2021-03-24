import React from 'react';
import Header from './Header';

const ApplicationLayout = ({ children }) => {
  return (
    <div className="applicationLayout">
      <Header />
      {children}
    </div>
  )
}

export default ApplicationLayout

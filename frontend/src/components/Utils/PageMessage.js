import React from 'react';

const PageMessage = ({title, text}) => {
  return(
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="mx-auto">
        <h1 className="text-2xl text-blue-700 leading-tight">
          {title}
        </h1>
        <br />
        <p className="text-base text-gray-700 leading-normal">
          {text}
        </p>
      </div>
    </div>
  )
}

export default PageMessage

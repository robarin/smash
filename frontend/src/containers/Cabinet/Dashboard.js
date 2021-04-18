import React from 'react';
import ContainerWrapper from "../wrapper";

const Dashboard = () => {
  return(
    <ContainerWrapper>
      <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
        <div className="mx-auto">
          <h1 className="text-2xl text-blue-700 leading-tight">
            SMASH Cabinet
          </h1>
          <p className="text-base text-gray-700 leading-normal">
            Dashboard
          </p>
        </div>
      </div>
    </ContainerWrapper>
  )
}

export default Dashboard

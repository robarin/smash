import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/globalModal';

const ProfileInfo = ({currentUser, dispatch, showModal}) => {
  const { person } = currentUser;
  
  const openProfileEdit = () => {
    dispatch(showModal({type: 'EDIT_PROFILE_FORM'}))
  }
  
  return(
    <div>
      <div className="px-4 py-5 sm:px-6 grid gap-4 grid-cols-12">
        <div className="col-span-2">
          <div className="w-16 h-16 bg-gray-300 rounded-full">
            {person.avatar.url && (
              <img className="block w-16 h-16 bg-gray-300 rounded-full" alt="avatar" src={process.env.REACT_APP_API_URL + person.avatar.thumb.url} />
            )}
          </div>
        </div>
        <div className="col-span-8 text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="col-span-2 text-right">
          <button className="bg-white text-center hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-100 rounded shadow" onClick={openProfileEdit}>Edit</button>
        </div>
      </div>
      <div className="border-t border-gray-200 text-left">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              First name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person.first_name}
            </dd>
            <dt className="text-sm font-medium text-gray-500">
              Last name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person.last_name}
            </dd>
            <dt className="text-sm font-medium text-gray-500">
              Middle name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person.middle_name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {currentUser.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Birth date
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person.birth_date || 'Not specified'}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Gender
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {person.gender.attributes.name}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              About
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  showModal,
  dispatch
})

export default connect(null, mapDispatchToProps)(ProfileInfo);


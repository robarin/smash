import React, {createRef, useState} from 'react';
import {connect} from 'react-redux';
import {requestPost, requestPatch} from '../../utils/request';
import {API_ROUTES} from "../../utils/constants";
import {showFlashMessage} from "../../actions/flash";
import saveCurrentUser from '../../utils/saveCurrentUser';

const EditProfile = ({currentUser, dispatch, showFlashMessage, closeModal}) => {
  const {person} = currentUser;
  const [firstName, setFirstName] = useState(person.first_name);
  const [lastName, setLastName] = useState(person.last_name);
  const [middleName, setMiddleName] = useState(person.middle_name);
  const [editError, setEditError] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = createRef();

  const edit = (e) => {
    e.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName
    }

    requestPatch(API_ROUTES.profile.update, body).then((res) => {
      res.json().then(result => {
        if (res.ok) {
          saveCurrentUser(result);
          closeModal();
          dispatch(showFlashMessage({
            show: true,
            title: 'Success',
            text: 'Your profile has been successfully updated',
            type: 'success',
          }))
        } else {
          setEditError(result.message);
        }
      })
    })
  }

  const onFileChange = () => {
    setFile(fileInputRef.current.files[0])
  }

  const onFileUpload = (e) => {
    e.preventDefault();

    requestPost(API_ROUTES.profile.avatar, {file}).then((res) => {
      res.json().then(result => {
        if (res.ok) {
          saveCurrentUser(result);
          dispatch(showFlashMessage({
            show: true,
            title: 'Success',
            text: 'Your profile image has been successfully updated',
            type: 'success',
          }))
          setFile(null);
        } else {
          setEditError(result.message);
        }
      })
    })
  }

  return (
    <div className="px-4 py-5 sm:px-6 grid gap-4 border-gray-200 text-left grid-cols-12">
      <div className="col-span-3">
        <div className="w-32 h-32 bg-gray-300 rounded-full">
          {person.avatar.url && (
            <img className="block w-32 h-32 bg-gray-300 rounded-full" alt="avatar" src={process.env.REACT_APP_API_URL + person.avatar.thumb.url} />
          )}
        </div>
        <div className="w-full mt-6">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span className="bg-white block text-center w-full hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-100 rounded shadow">Select image</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={onFileChange} />
          </label>
        </div>
        {file && (
          <div className="w-full mt-4">
            <button onClick={onFileUpload} className="bg-white w-full hover:bg-green-200 text-green-800 py-2 px-4 border border-green-200 rounded shadow">Upload</button>
            <p className="text-xs mt-4">{file.name}</p>
          </div>
        )}
      </div>
      <div className="col-span-9">
        <div className="mx-6">
          <h3 className="text-lg leading-6 font-light text-gray-900">
            Edit profile
          </h3>
        </div>
        <form>
          <div className="m-6">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="first_name" className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:outline-none" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="m-6">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="last_name" className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:outline-none" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="m-6">
            <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input type="text" name="middle_name" className="mt-1 p-3 block w-full rounded-md bg-gray-100 focus:outline-none" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          {editError && (
            <div className="m-6">
              <p className="text-red-600">{editError}</p>
            </div>
          )}
          <div className="m-6">
            <button onClick={edit} className="text-white bg-white w-full bg-green-400 hover:bg-green-500 py-2 px-4 rounded shadow">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

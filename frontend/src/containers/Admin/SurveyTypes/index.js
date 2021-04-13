import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { Button } from '@material-ui/core';
import { requestGet, requestPost, requestPatch, requestDelete } from '../../../utils/request';
import { API_ROUTES } from '../../../utils/constants';
import Modal from '../../../components/Admin/Modal';
import Form from '../../../components/Admin/SurveyTypes/Form';
import SurveyTypesList from '../../../components/Admin/SurveyTypes';
import {showFlashMessage} from "../../../actions/flash";

const SurveyTypes = ({dispatch, showFlashMessage}) => {
  const [surveyTypes, setSurveyTypes] = useState([]);
  const defaultModalParams = { 
    open: false, 
    title: 'Default', 
    surveyType: null
  };
  const [modalParams, setModalParams] = useState(defaultModalParams);

  const closeModal = () => {
    setModalParams(defaultModalParams);
  };

  const showNewModal = () => {
    setModalParams({ open: true, title: 'New survey type', surveyType: null });
  };

  const showEditModal = (id) => {
    const surveyType = surveyTypes.find((surveyType) => surveyType.id == id);
    setModalParams({ open: true, title: 'Edit survey type', surveyType: surveyType });
  };

  const showMessage = (type, title, message) => {
    dispatch(showFlashMessage({
      show: true,
      title: title,
      text: message,
      type: type,
    }))
  };

  const handleCreate = (name, description) => {
    const body = { name, description };

    requestPost(API_ROUTES.admin.surveyTypes, body).then((res) => {
      if (res.ok) {
        res.json().then((surveyType) => {
          setSurveyTypes([...surveyTypes, surveyType.data]);
        });
        showMessage('success', 'Survey type', 'Successfully created');
      } else {
        res.json().then((response) => {
          showMessage('error', 'Creating error', response.message);
        });
      }
      closeModal();
    })
  };

  const handleUpdate = (id, name, description) => {
    const body = { name, description };

    requestPatch(`${API_ROUTES.admin.surveyTypes}/${id}`, body).then((res) => {
      if (res.ok) {
        res.json().then((surveyType) => {
          const newSurveysList = [...surveyTypes];
          const index = newSurveysList.findIndex(type => type.id == id);
          newSurveysList.splice(index, 1, surveyType.data);
          setSurveyTypes(newSurveysList);
        });
        showMessage('success', 'Survey type', 'Successfully updated');
      } else {
        res.json().then((response) => {
          showMessage('error', 'Updating error', response.message);
        });
      }
      closeModal();
    })
  };

  const handleDelete = (id) => {
    requestDelete(`${API_ROUTES.admin.surveyTypes}/${id}`).then((res) => {
      if (res.ok) {
        const newSuveyTypesList = surveyTypes.filter((surveyType) => surveyType.id != id);
        setSurveyTypes(newSuveyTypesList);
        showMessage('success', 'Survey type', 'Successfully deleted');
      } else {
        res.json().then((response) => {
          showMessage('error', 'Deleting error', response.message);
        });
      }
    })
  };

  useEffect(() => {
    requestGet(API_ROUTES.admin.surveyTypes).then((res) => {
      if (res.ok) {
        res.json().then((surveyTypes) => {
          setSurveyTypes(surveyTypes.data)
        })
      }
    })
  }, []);

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Survey types
        </h1>
        <Button color='primary' onClick={showNewModal}>Create survey type</Button>
      </div>
      {surveyTypes && <SurveyTypesList list={surveyTypes} handleDelete={handleDelete} handleEdit={showEditModal}/>}
      <div>
        <Modal isOpen={modalParams.open} title={modalParams.title} handleClose={closeModal}>
          <Form surveyType={modalParams.surveyType} handler={modalParams.surveyType ? handleUpdate : handleCreate} />
        </Modal>
      </div>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(mapDispatchToProps)(SurveyTypes);

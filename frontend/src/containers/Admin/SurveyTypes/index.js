import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { Button } from '@material-ui/core';
import Modal from '@components/Admin/Utils/Modal';
import Form from '@components/Admin/SurveyTypes/Form';
import SurveyTypesList from '@components/Admin/SurveyTypes';
import {showFlashMessage} from "@actions/flash";

import {fetchSurveyTypes, updateSurveyType, createSurveyType, deleteSurveyType} from '@actions/surveyType';

const SurveyTypes = ({showFlashMessage, fetchSurveyTypes, updateSurveyType, createSurveyType, deleteSurveyType}) => {
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
    showFlashMessage({
      show: true,
      title: title,
      text: message,
      type: type,
    })
  };

  const handleCreate = async (name, description) => {
    const body = { name, description };

    try {
      const surveyType = await createSurveyType(body);
      setSurveyTypes([...surveyTypes, surveyType]);

      showMessage('success', 'Survey type', 'Successfully created');
      closeModal();
    } catch(error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (id, name, description) => {
    const body = { name, description };
    try {
      const surveyType = await updateSurveyType({id, body});
      const newSurveysList = [...surveyTypes];
      const index = newSurveysList.findIndex(type => type.id === id);

      newSurveysList.splice(index, 1, surveyType);
      setSurveyTypes(newSurveysList);

      showMessage('success', 'Survey type', 'Successfully updated');
      closeModal();
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteSurveyType(id);
      const newSuveyTypesList = surveyTypes.filter((surveyType) => surveyType.id != id);

      setSurveyTypes(newSuveyTypesList);
      showMessage('success', 'Survey type', 'Successfully deleted');
    } catch(error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSurveyTypes().then(result => {
      setSurveyTypes(result);
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

const mapDispatchToProps = {
  showFlashMessage,
  fetchSurveyTypes,
  updateSurveyType,
  createSurveyType,
  deleteSurveyType,
}

export default connect(null, mapDispatchToProps)(SurveyTypes);

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { fetchSurveys, createSurvey, updateSurvey } from '@actions/survey';
import {showFlashMessage} from "@actions/flash";
import {showModal, hideModal} from "@actions/modal";
import SurveysList from '@components/Admin/Surveys';
import Modal from '@components/Admin/Utils/Modal';
import Form from '@components/Admin/Survey/Form';

const Surveys = ({fetchSurveys, createSurvey, updateSurvey, modal, showModal, hideModal, showFlashMessage}) => {
  const newSurveyAttributes = {name: '', description: '', surveyTypeId: null};
  const [surveys, setSurveys] = useState([]);
  const [surveyAttributes, setSurveyAttributes] = useState(newSurveyAttributes);

  const closeModal = () => {
    setSurveyAttributes(newSurveyAttributes);
    hideModal();
  };

  const showNewModal = () => {
    showModal({ title: 'New survey' });
  };

  const showEditModal = (id) => {
    const survey = surveys.find((survey) => survey.id == id);
    const { name, description, survey_type } = survey;
    setSurveyAttributes(
      {
        id: survey.id,
        name,
        description,
        surveyTypeId: survey_type.id,
        surveyTypeName: survey_type.name
      }
    );
    showModal({ title: 'Edit survey' });
  };

  const handleCreate = async (body) => {
    try {
      createSurvey(body).then((result) => setSurveys([...surveys, result]));
      showFlashMessage({
        title: 'Success',
        text: 'New survey was successfully created',
        type: 'success',
      });
      closeModal();
    } catch(error) {
      showFlashMessage({
        title: 'Error',
        text: error.message || 'Something went wrong',
        type: 'error',
      })
    }
  }

  const handleUpdate = async (body) => {
    try {
      const { id, name, description, surveyTypeId } = body;
      updateSurvey(id, { name, description, surveyTypeId }).then((result) => {
        const newSurveys = [...surveys];
        const index = newSurveys.findIndex(res => res.id == result.id);
        newSurveys.splice(index, 1, result);
        setSurveys(newSurveys)
      });
      showFlashMessage({
        title: 'Success',
        text: 'Survey was successfully updated',
        type: 'success',
      });
      closeModal();
    } catch(error) {
      showFlashMessage({
        title: 'Error',
        text: error.message || 'Something went wrong',
        type: 'error',
      })
    }
  }

  useEffect(() => {
    fetchSurveys().then(result => setSurveys(result));
  }, []);

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Surveys
        </h1>
        <Button color='primary' onClick={showNewModal}>Create survey</Button>
      </div>
        <SurveysList list={surveys} handleEdit={showEditModal}/>
      <div>
        <Modal isOpen={modal.open} title={modal.title} handleClose={closeModal}>
          <Form survey={surveyAttributes} handler={surveyAttributes.id ? handleUpdate : handleCreate} />
        </Modal>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})

const mapDispatchToProps = {
  fetchSurveys,
  createSurvey,
  updateSurvey,
  showFlashMessage,
  showModal,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);

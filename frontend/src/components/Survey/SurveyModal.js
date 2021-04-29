import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '@components/Utils/Modal';
import {showModal} from '@actions/modal';
import {submitSurveyResults} from '@actions/survey';
import SurveyBody from './SurveyBody';

const completeView = () => {
  return (
    <div className="flex w-full flex-wrap content-center justify-center h-96">
      <div>
        <div className="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500 block text-4xl w-12 h-12 mx-auto"
               fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
        </div>
        <div className="flex-1">
                <span className="text-2xl block">
                Thanks!
                </span>
        </div>
      </div>
    </div>
  )
}

const SurveyModal = ({modal, showModal, questions, surveyResult, submitSurveyResults}) => {
  const [surveyComplete, setSurveyComplete] = useState(false);

  useEffect(() => {
    showModal({title: 'Quick survey'});
  }, []);

  const onSubmit = async () => {
    await submitSurveyResults(surveyResult);
    setSurveyComplete(true);
  }

  return (
    <div className="w-full">
      {modal.open && (
        <Modal onClose={onSubmit}>
          {surveyComplete
            ? completeView()
            : (
              <div>
                <SurveyBody questions={questions}/>
                <div className="text-center">
                  <button onClick={onSubmit} type="button"
                          className="rounded-md border border-transparent px-4 py-2 bg-green-600 text-base text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Submit
                  </button>
                </div>
              </div>
            )}
        </Modal>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  surveyResult: state.surveyResult
})

const mapDispatchToProps = {
  showModal,
  submitSurveyResults
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyModal);


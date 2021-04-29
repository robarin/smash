import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '@actions/modal';

function Modal({hideModal, children, onClose, modal}) {
  const handleClose = () => {
    if (onClose) onClose();
    hideModal();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <span className="sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block w-1/2 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleClose}>
            <svg className="fill-current h-6 w-6 text-gray-900" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4 ml-4 text-center">
              <h3 className="text-xl">{modal.title}</h3>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})

const mapDispatchToProps = {
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

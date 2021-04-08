import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';
import Modal from './Modal'

import { useStyles } from './styles';
import { removeCurrentUser } from '../../actions/currentUser';
import { hideModal } from '../../actions/globalModal';

const AdminLayout = (props) => {
  const { currentUser, removeCurrentUser, modalType, hideModal, children, dispatch } = props;
  const classes = useStyles();
  const history = useHistory();

  const closeModal = () => {
    dispatch(hideModal())
  };

  if (!currentUser || !currentUser.admin) {
    history.push('/login');
    return <></>;
  }

  const headerProps = {
    history,
    removeCurrentUser,
    dispatch
  }

  return (
    <div className="adminLayout">
      <div className={classes.root}>
        <CssBaseline />
        <Header {...headerProps} />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
          <Modal
            open={modalType !== null}
            onClose={closeModal}
          />
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  modalType: state.globalModal.type,
})

const mapDispatchToProps = dispatch => ({
  removeCurrentUser,
  hideModal,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);

import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';

import { useStyles } from './styles';
import { removeCurrentUser } from '../../actions/currentUser';

const AdminLayout = (props) => {
  const { currentUser, removeCurrentUser, children, dispatch } = props;
  const classes = useStyles();
  const history = useHistory();

  if (!currentUser || !currentUser.isAdmin) {
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
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const mapDispatchToProps = dispatch => ({
  removeCurrentUser,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);


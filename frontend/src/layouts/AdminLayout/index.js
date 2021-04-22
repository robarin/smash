import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';
import FlashDelay from '@components/Utils/FlashDelay';

import { useStyles } from './styles';

const AdminLayout = (props) => {
  const { currentUser, children, flashMessage } = props;
  const classes = useStyles();
  const history = useHistory();

  if (!currentUser.admin) {
    history.push('/login');
    return <></>;
  }

  const headerProps = {
    history
  }

  return (
    <div className="adminLayout">
      {flashMessage.show && (
        <FlashDelay />
      )}
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
  flashMessage: state.flashMessage,
})

export default connect(mapStateToProps)(AdminLayout);

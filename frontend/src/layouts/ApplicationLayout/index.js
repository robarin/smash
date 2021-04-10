import React from 'react';
import { connect } from 'react-redux';
import FlashDelay from '../../components/Utils/FlashDelay';
import Header from './Header';
import Grid from '@material-ui/core/Grid';

const ApplicationLayout = ({ children, flashMessage }) => {
  return (
    <div className="applicationLayout">
      {flashMessage.show && (
        <FlashDelay />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
})

export default connect(mapStateToProps, null)(ApplicationLayout);



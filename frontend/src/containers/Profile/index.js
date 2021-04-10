import React from 'react';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import {showFlashMessage} from "../../actions/flash";

import ProfileInfo from './Info';

const Profile = ({currentUser}) => {
  return (
    <div>
      <Grid container
            direction="row"
            justify="center"
            alignItems="center"
      >
        <Grid item xs={6}>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div>
              <ProfileInfo currentUser={currentUser} />
            </div>
          </div>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



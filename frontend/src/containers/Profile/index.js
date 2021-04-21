import React from 'react';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';

import ContainerWrapper from "@containers/wrapper";
import ProfileInfo from './Info';

const Profile = ({currentUser}) => {
  return (
    <ContainerWrapper>
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
    </ContainerWrapper>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(Profile);

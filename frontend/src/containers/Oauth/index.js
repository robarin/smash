import React, {useEffect} from 'react';
import { connect } from "react-redux";

import GoogleButton from '../../components/Auth/GoogleButton';
import TwitterButton from '../../components/Auth/TwitterButton';
import ActionCable from "actioncable";
import {showFlashMessage} from "../../actions/flash";

const Oauth = (props) => {
  const { saveCurrentUser, history, showFlashMessage, dispatch } = props;
  const cable = ActionCable.createConsumer(`ws://${process.env.REACT_APP_API_HOST}/cable`);
  
  const handleMessage = (message) => {
    const provider = message.data.attributes.provider.replace(/^\w/, (c) => c.toUpperCase());
    saveCurrentUser(message);
    dispatch(showFlashMessage({
      type: 'success',
      title: 'Welcome!',
      text: `You have successfully signed in via ${provider}`,
      show: true,
    }))
    history.push('/dashboard');
  }
  
  useEffect(() => {
    cable.subscriptions.create(
      {channel: 'UsersChannel'},
      {received: message => handleMessage(message)}
    )
  }, []);
  
  return(
    <div className="m-4">
      <div className="m-4"><TwitterButton /></div>
      <div className="m-4"><GoogleButton /></div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(null, mapDispatchToProps)(Oauth);



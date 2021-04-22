import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import GoogleButton from '@components/Auth/GoogleButton';
import TwitterButton from '@components/Auth/TwitterButton';
import ActionCable from "actioncable";
import {showFlashMessage} from "@actions/flash";
import {setCurrentUser} from "@actions/currentUser";

const Oauth = ({ setCurrentUser, showFlashMessage }) => {
  const cable = ActionCable.createConsumer(`ws://${process.env.REACT_APP_API_HOST}/cable`);
  const history = useHistory()

  const handleMessage = (message) => {
    const provider = message.data.attributes.provider.replace(/^\w/, (c) => c.toUpperCase());
    setCurrentUser(message);
    showFlashMessage({
      type: 'success',
      title: 'Welcome!',
      text: `You have successfully signed in via ${provider}`,
      show: true,
    })
    history.push('/dashboard');
  }

  useEffect(() => {
    cable.subscriptions.create(
      {channel: 'UsersChannel'},
      {received: message => handleMessage(message)}
    )
  }, []);

  return(
    <div className="m-4 flex">
      <div className="flex-1 m-2"><TwitterButton /></div>
      <div className="flex-1 m-2"><GoogleButton /></div>
    </div>
  )
}

const mapDispatchToProps = {
  showFlashMessage,
  setCurrentUser,
}

export default connect(null, mapDispatchToProps)(Oauth);

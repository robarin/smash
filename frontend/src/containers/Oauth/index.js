import React, {useEffect} from 'react';

import GoogleButton from '../../components/Auth/GoogleButton';
import TwitterButton from '../../components/Auth/TwitterButton';
import ActionCable from "actioncable";

const Oauth = (props) => {
  const { saveCurrentUser, history } = props;
  const cable = ActionCable.createConsumer(`ws://${process.env.REACT_APP_API_HOST}/cable`);
  
  const handleMessage = (message) => {
    const user = message.data.attributes;
    
    saveCurrentUser(user);
    history.push('/');
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

export default Oauth;

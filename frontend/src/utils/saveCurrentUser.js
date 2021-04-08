import React from 'react';
import { store } from '../store';
import {setCurrentUser} from '../actions/currentUser';

const saveCurrentUser = (result) => {
  const user = result.data.attributes;
  user.person = result.included[0].attributes;
  
  store.dispatch(setCurrentUser(user));
}

export default saveCurrentUser;


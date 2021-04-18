import React from 'react';
import { store } from '../store';
import {setCurrentUser} from '../actions/currentUser';

const saveCurrentUser = (result) => {
  const user = result.data.attributes;

  if (!user.admin) {
    user.person = result.included[0].attributes;
  }

  store.dispatch(setCurrentUser(user));
  return user;
}

export default saveCurrentUser;

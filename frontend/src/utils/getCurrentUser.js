import React from 'react';
import {requestGet} from './request';
import {API_ROUTES} from './constants';
import saveCurrentUser from "./saveCurrentUser";

const getCurrentUser = ({history}) => {
  requestGet(API_ROUTES.me).then((res) => {
    switch (res.status) {
      case 401:
        history.push('/login');
        break;
      case 200:
        res.json().then(result => saveCurrentUser(result));
        break;
    }
  })
}

export default getCurrentUser;

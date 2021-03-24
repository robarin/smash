import React, { useState, useEffect } from 'react';
import { requestGet } from '../../../utils/request';
import { API_ROUTES } from '../../../utils/constants';

import UsersList from '../../../components/Admin/Users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    requestGet(API_ROUTES.admin.users).then((res) => {
      if (res.ok) {
        res.json().then((users) => {
          setUsers(users.data);
        })
      }
    })
  }, []);

  return(
    <div>
      {users && (
        <UsersList list={users}/>
      )}
    </div>
  )
}

export default Users

import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '@actions/users';

import UsersList from '@components/Admin/Users';

const Users = ({fetchUsers}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(result => setUsers(result));
  }, []);

  return(
    <div>
      <UsersList list={users}/>
    </div>
  )
}

const mapDispatchToProps = {
  fetchUsers,
}

export default connect(null, mapDispatchToProps)(Users);



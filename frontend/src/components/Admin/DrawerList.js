import React from 'react';
import { List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import LocalOffer from '@material-ui/icons/LocalOffer';

import DrawerItem from './DrawerItem';

export default () => {
  return (
    <>
      <List>
        <DrawerItem href="/admin" icon={HomeIcon} title="Dashboard" />
        <DrawerItem href="/admin/users" icon={PeopleIcon} title="Users" />
        <DrawerItem href="/admin/tag_types" icon={LocalOffer} title="Tag types" />
      </List>
    </>
  )
}

import React from 'react';
import { List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import LocalOffer from '@material-ui/icons/LocalOffer';
import ReorderIcon from '@material-ui/icons/Reorder';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import DrawerItem from './DrawerItem';

export default () => {
  return (
    <>
      <List>
        <DrawerItem href="/admin" icon={HomeIcon} title="Dashboard" />
        <DrawerItem href="/admin/users" icon={PeopleIcon} title="Users" />
        <DrawerItem href="/admin/surveys" icon={FormatListNumberedIcon} title="Surveys" />
        <DrawerItem href="/admin/tags" icon={LocalOffer} title="Tags" />
        <DrawerItem href="/admin/survey_types" icon={ReorderIcon} title="Survey types" />
      </List>
    </>
  )
}

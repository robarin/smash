import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

export default ({ href, title, icon }) => {
  const Icon = icon;
  const history = useHistory();

  return (
    <ListItem button key={title} onClick={() => history.push(href)}>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )
}

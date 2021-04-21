import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@components/Admin/Icon';

const useStyles = makeStyles({
  listItemIcon: {
    minWidth: 30,
  },
  icon: {
    fontSize: 14,
  },
});

export default ({responses, responseType}) => {
  const classes = useStyles();
  const responseIcons = {
    single: <Icon type='radio' className={classes.icon} />,
    multiple: <Icon type='checkbox' className={classes.icon} />
  };
  const responseIconKey = responseType.match(/single/) ? 'single' : 'multiple';

  return(
    <List>
      {responses.map((response) => {
        return(
          <ListItem key={response.id}>
            <ListItemIcon className={classes.listItemIcon} >{responseIcons[responseIconKey]}</ListItemIcon>
            <ListItemText id={`label-${response.id}`} primary={response.description} secondary={response.name}/>
          </ListItem>
        )
      })}
    </List>
  )
}

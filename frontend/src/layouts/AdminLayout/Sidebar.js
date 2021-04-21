import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Drawer,
  Divider,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DrawerList from '@components/Admin/DrawerList';

import { useStyles } from './styles';

const RESPONSIVE_MENU_ACTIVE = false;

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const toggleDrawer = () => {
    setOpen(!open);
  }

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {RESPONSIVE_MENU_ACTIVE && (
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </div>
        <Divider />
        <DrawerList />
      </Drawer>
    </div>
  );
}

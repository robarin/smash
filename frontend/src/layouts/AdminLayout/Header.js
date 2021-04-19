import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';

import AppBar from '@material-ui/core/AppBar';
import {connect} from "react-redux";
import {logout} from "../../actions/currentUser";

const Header = (props) => {
  const { logout, history } = props;
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex flex-row justify-between w-full">
            <div>
              <Typography variant="h6" noWrap>
                Admin panel
              </Typography>
            </div>
            <div>
              <Button color="default" onClick={() => history.push('/')}>Home</Button>
              <Button color="default" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Header)


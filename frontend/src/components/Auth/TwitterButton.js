import React, {useState} from 'react';
import {Link} from "@material-ui/core";
import NewWindow from 'react-new-window';

const TWITTER_AUTH_URL = `${process.env.REACT_APP_API_URL}/auth/twitter`;

export default function () {
  const [windowOpen, setWindowOpen] = useState(false);
  
  const onClick = (e) => {
    e.preventDefault();
    setWindowOpen(true);
  }
  
  return (
    <>
      {windowOpen && (
        <NewWindow url={TWITTER_AUTH_URL} center="parent" />
      )}
      <Link onClick={onClick}>Log in with Twitter</Link>
    </>
  )
}

import React, {useState} from 'react';
import NewWindow from 'react-new-window';

const GOOGLE_AUTH_URL = `${process.env.REACT_APP_API_URL}/auth/google_oauth2`;

export default function () {
  const [windowOpen, setWindowOpen] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setWindowOpen(true);
  }

  return (
    <div>
      {windowOpen && (
        <NewWindow url={GOOGLE_AUTH_URL} center="parent" />
      )}
      <a href="" className="block w-full py-2 px-4 border rounded-lg border-gray-400 hover:border-gray-600 text-gray-500 hover:text-gray-600" onClick={onClick}>Google</a>
    </div>
  )
}

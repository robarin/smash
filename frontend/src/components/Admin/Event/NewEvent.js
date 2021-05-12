import React from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { createEvent } from '@actions/events';
import {showFlashMessage} from "@actions/flash";
import Form from '@components/Admin/Event/Form';

const NewEvent = ({createEvent, showFlashMessage}) => {
  const history = useHistory();

  const close = () => {
    history.push('/admin/events');
  }

  const handleCreate = async (body) => {
    try {
      const result = await createEvent(body);
      showFlashMessage({
        title: 'Success',
        text: 'New event was successfully created',
        type: 'success',
      });
      close();
    } catch(error) {
      showFlashMessage({
        title: 'Error',
        text: error.message || 'Something went wrong',
        type: 'error',
      })
    }
  }

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight mb-4">
          Create event
        </h1>
        <div>
          <Button color='primary' onClick={close} >Close</Button>
        </div>
      </div>
      <Form event={null} handler={handleCreate} />
    </div>
  )
}

const mapDispatchToProps = {
  showFlashMessage,
  createEvent,
}

export default connect(null, mapDispatchToProps)(NewEvent);

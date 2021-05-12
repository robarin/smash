import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EventsList from '@components/Admin/Events';
import {showFlashMessage} from "@actions/flash";
import {fetchEvents, createEvent, deleteEvent} from '@actions/events';

const Events = ({fetchEvents}) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  const create = () => {
    history.push('/admin/new/events');
  }

  useEffect(() => {
    fetchEvents().then((result) => {
      setEvents(result)
    })
  }, []);

  return(
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Smash events
        </h1>
        <Button color='primary' onClick={create}>Create event</Button>
      </div>
      <EventsList list={events}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})

const mapDispatchToProps = {
  showFlashMessage,
  fetchEvents,
  createEvent,
  deleteEvent,
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);

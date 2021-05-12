import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { fetchEvent, updateEvent, deleteEvent } from '@actions/events';
import {showFlashMessage} from "@actions/flash";
import Form from '@components/Admin/Event/Form';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 10,
  },
});

const Event = ({fetchEvent, updateEvent, deleteEvent}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [edit, setEdit] = useState(false);

  const handleUpdate = async (body) => {
    try {
      const result = await updateEvent(body.id, body);
      setEvent(result);
      setEdit(false);
      showFlashMessage({
        title: 'Success',
        text: 'Event was successfully updated',
        type: 'success',
      });
    } catch(error) {
      showFlashMessage({
        title: 'Error',
        text: error.message || 'Something went wrong',
        type: 'error',
      })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      showFlashMessage({
        title: 'Success',
        text: 'Successfully deleted',
        type: 'success',
      });
      history.push('/admin/events');
    } catch(error) {
      showFlashMessage({
        title: 'Error',
        text: error.message || 'Something went wrong',
        type: 'error',
      })
    }
  };

  useEffect(() => {
    fetchEvent(id).then((result) => {
      setEvent(result);
    })
  }, []);

  return(
    edit ? (
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-blue-700 leading-tight mb-4">
            Edit event
          </h1>
          <div>
            <Button color='primary' onClick={() => setEdit(false)} >Close</Button>
          </div>
        </div>
        <Form event={event} handler={handleUpdate} />
      </div>
    ) : (
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-blue-700 leading-tight mb-4">
            {event && event.name}
          </h1>
          <div>
            <Button color='primary' onClick={handleDelete} >Delete</Button>
            <Button color='primary' onClick={() => setEdit(true)} >Edit</Button>
          </div>
        </div>
        <div>
          {event && <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={3} align="left">
                    <Typography gutterBottom variant="body1" color="textSecondary">
                      Event details
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Type:</TableCell>
                  <TableCell align="left">{event.event_type.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Name:</TableCell>
                  <TableCell align="left">{event.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Description:</TableCell>
                  <TableCell align="left">{event.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Date:</TableCell>
                  <TableCell align="left">{event.date}</TableCell>
                </TableRow>
                <br/>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={3} align="left">
                    <Typography gutterBottom variant="body1" color="textSecondary">
                      Event groups
                    </Typography>
                  </TableCell>
                </TableRow>
                {event.groups.map((group, index) => {
                  return(
                    <TableRow>
                      <TableCell style={{ width: 20 }} align="left">{index + 1}</TableCell>
                      <TableCell style={{ width: 180 }} align="left">{group.name}</TableCell>
                      <TableCell align="left">{group.description}</TableCell>
                    </TableRow>
                  )
                })}
                <br/>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={3} align="left">
                    <Typography gutterBottom variant="body1" color="textSecondary">
                      Location details
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Type:</TableCell>
                  <TableCell align="left">{event.location.location_type.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Name:</TableCell>
                  <TableCell align="left">{event.location.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Description:</TableCell>
                  <TableCell align="left">{event.location.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Province:</TableCell>
                  <TableCell align="left">{event.location.province.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">City:</TableCell>
                  <TableCell align="left">{event.location.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Address:</TableCell>
                  <TableCell align="left">{event.location.street_number}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={2} align="left">Zip:</TableCell>
                  <TableCell align="left">{event.location.zip}</TableCell>
                </TableRow>
                <br/>
                <TableRow>
                  <TableCell component="th" style={{ width: 200 }} colSpan={3} align="left">
                    <Typography gutterBottom variant="body1" color="textSecondary">
                      Event users details
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>}
        </div>
      </div>
    )
  )
}

const mapDispatchToProps = {
  showFlashMessage,
  fetchEvent,
  updateEvent,
  deleteEvent,
}

export default connect(null, mapDispatchToProps)(Event);

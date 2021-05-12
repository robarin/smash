import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Events = ({ list }) => {
  const classes = useStyles();
  const history = useHistory();

  const showEvent = (id) => {
    history.push(`/admin/events/${id}`);
  }

  if (!list || list.length === 0) {
    return <></>;
  }

  return(
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Groups</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((event) => {
              const {
                id,
                name,
                date,
                event_type,
                groups
              } = event;
              const groupNames = groups.map((group) => group.name).join('; ');

              return(
                <TableRow key={id}>
                  <TableCell align="center">{id}</TableCell>
                  <TableCell align="left">{event_type.name}</TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{groupNames}</TableCell>
                  <TableCell align="left">{date}</TableCell>
                  <TableCell align="right">
                    <Button color='primary' onClick={() => showEvent(id)}>
                      <ArrowForwardIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Events;

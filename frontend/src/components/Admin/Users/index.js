import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default ({ list }) => {
  console.log('LIST', list)
  
  const classes = useStyles();

  if (!list || list.length === 0) {
    return <></>;
  }

  return (
    <>
      <TableContainer component={Paper}>s
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((user) => {
              const { attributes: { id, first_name, last_name, email, created_at }} = user;
              
              return (
                <TableRow key={id}>
                  <TableCell align="right">{id}</TableCell>
                  <TableCell align="right">{`${first_name} ${last_name}`}</TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">{created_at}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

import React from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SurveyTypes = ({ list, handleDelete, handleEdit }) => {
  const classes = useStyles();

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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Created at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((surveyType) => {
              const {
                attributes: {
                  id,
                  name,
                  description,
                  created_at
                }
              } = surveyType;

              return(
                <TableRow key={id}>
                  <TableCell align="center">{id}</TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{description}</TableCell>
                  <TableCell align="left">{created_at}</TableCell>
                  <TableCell align="right">
                    <Button color='primary' onClick={() => handleEdit(id)}>
                      <CreateIcon />
                    </Button>
                    <Button color='primary' onClick={() => handleDelete(id)}>
                      <DeleteIcon />
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

export default SurveyTypes;

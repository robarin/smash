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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default ({list}) => {
  const classes = useStyles();

  const showSurvey = (id) => {
    //TODO: show
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
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Created at</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((survey) => {
              const {
                attributes: {
                  id,
                  name,
                  description,
                  created_at,
                  survey_type
                }
              } = survey;

              return(
                <TableRow key={id}>
                  <TableCell align="center">{id}</TableCell>
                  <TableCell align="left">{survey_type.attributes.name}</TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{description}</TableCell>
                  <TableCell align="left">{created_at}</TableCell>
                  <TableCell align="right">
                    <Button color='primary' onClick={() => showSurvey(id)}>
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

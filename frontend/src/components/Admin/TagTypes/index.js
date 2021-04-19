import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
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

const TagTypes = (props) => {
  const { list, handleEdit } = props;
  const classes = useStyles();

  if (!list || list.length === 0) {
    return <></>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Buttons</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((tagType) => {
                const {
                  attributes: {
                    id,
                    name,
                    description
                  }
                } = tagType;

                return (
                  <TableRow key={id}>
                    <TableCell align="right">{id}</TableCell>
                    <TableCell align="right">{name}</TableCell>
                    <TableCell align="right">{description}</TableCell>
                    <TableCell align="right">
                      <Button color='primary' onClick={() => handleEdit(id)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TagTypes;

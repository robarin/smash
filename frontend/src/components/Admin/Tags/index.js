import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {deleteTag} from '@actions/tags';
import {connect} from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Tags = ({list, handleEdit, deleteTag}) => {
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
            {list.map((tag) => {
                const {
                  id,
                  name,
                  description,
                } = tag;

                return (
                  <TableRow key={id}>
                    <TableCell align="right">{id}</TableCell>
                    <TableCell align="right">{name}</TableCell>
                    <TableCell align="right">{description}</TableCell>
                    <TableCell align="right">
                      <Button color='primary' onClick={() => handleEdit(id)}>
                        <CreateIcon/>
                      </Button>
                      <Button color='primary' onClick={() => deleteTag(id)}>
                        <DeleteIcon/>
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


const mapDispatchToProps = {
  deleteTag
}

export default connect(null, mapDispatchToProps)(Tags);


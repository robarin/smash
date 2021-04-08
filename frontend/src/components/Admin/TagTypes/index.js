import React from 'react';
import { connect } from 'react-redux';
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
import { showModal } from '../../../actions/globalModal';
import MODALS from '../../../utils/modals'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TagTypes = (props) => {
  const { list, showModal, dispatch } = props;
  const classes = useStyles();
  const openModal = (id) => {
    dispatch(showModal({
      type: MODALS.TAG_TYPES_FORM,
      modalProps: {
        tagTypeId: id,
        action: 'edit'
      }
    }))
  };

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
                      <Button onClick={() => {openModal(id)}} variant="contained" color="primary">
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

const mapDispatchToProps = dispatch => ({
  showModal,
  dispatch
})

export default connect(mapDispatchToProps)(TagTypes);

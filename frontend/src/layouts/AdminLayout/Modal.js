import React, {useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MuiModal from '@material-ui/core/Modal';
import TagTypeForm from '../../components/Admin/TagTypes/Form'

const modalTypesBindings = {
  TAG_TYPES_FORM: TagTypeForm
}

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Modal({open, onClose, type}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const ModalBody = modalTypesBindings[type]

  return (
    <div>
      <MuiModal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          <div style={modalStyle} className={classes.paper}>
            {ModalBody && <ModalBody />}
          </div>
        </>
      </MuiModal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  globalModal: state.globalModal,
  type: state.globalModal.type,
})

export default connect(mapStateToProps)(Modal);

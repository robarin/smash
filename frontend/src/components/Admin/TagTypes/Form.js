import React from 'react'
import { connect } from 'react-redux';

const Form = ({action}) => {
  let handler
  let title

  if (action === 'new') {
    handler = () => { 'create handler' }
    title = 'Create Tag Type'
  } else if (action === 'edit') {
    handler = () => { 'update handler' }
    title = 'Update Tag Type'
  }

  return <div>
    <h1>{title}</h1>

    <button onClick={handler}></button>
  </div>
}

const mapStateToProps = (state) => ({
  action: state.globalModal.modalProps.action,
})

export default connect(mapStateToProps)(Form);

import React from 'react'
import { setModalType } from '../../../actions/modalType'

const Form = ({action, id}) => {
  let handler
  let title

  if (action === 'create') {
    handler = () => { 'create handler' }
    title = 'Create Tag Type'
  } else if (action === 'update') {
    handler =  () => { 'update handler' }
    title = 'Update Tag Type'
  }

  return <div>
    <h1>{title}</h1>

    <button onClick={handler}></button>
  </div>
}

export default Form

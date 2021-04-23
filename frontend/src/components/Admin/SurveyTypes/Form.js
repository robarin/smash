import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Form = ({surveyType, handler}) => {
  const initialName = surveyType?.name;
  const initialDescription = surveyType?.description;
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [formError, setFormError] = useState();

  const handleSubmit = () => {
    if (!name) {
      return setFormError(true);
    }

    if (surveyType) {
      return handler(surveyType.id, name, description);
    } else {
      return handler(name, description);
    }
  }

  return(
    <div>
      <form >
        <div className="m-4">
          <TextField
            required
            type='text'
            error={formError}
            id='name'
            label='Name'
            helperText={formError ? 'Name is required' : ''}
            variant='outlined'
            fullWidth={true}
            value={name}
            onChange={(e) => {
              setFormError(false);
              setName(e.target.value);
            }}
          />
        </div>
        <div className="m-4">
          <TextField
            type='text'
            id='description'
            label='Description'
            variant='outlined'
            multiline={true}
            rows='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="m-4 text-center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form;

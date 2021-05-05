import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Form = ({onSubmit, tag}) => {
	const { id, name, description } = tag;
	const [tagAttributes, setTagAttributes] = useState({ id, name, description });
	const [formError, setFormError] = useState();
	const handleSubmit = () => {
		if (!tagAttributes.name) { return setFormError(true) }

		return onSubmit(tagAttributes);
	}

	const onChangeField = (e, field) => {
		setTagAttributes({
			...tagAttributes,
			[field]: e.target.value
		})
	}

	return (
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
						value={tagAttributes.name}
						onChange={(e) => onChangeField(e, 'name')}
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
						value={tagAttributes.description}
						onChange={(e) => onChangeField(e, 'description')}
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

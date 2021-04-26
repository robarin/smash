import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import Select from 'react-select';
import { TextField, Button, Typography } from "@material-ui/core";
import { fetchSurveyTypes } from '@actions/surveyType';
import { useForm, Controller } from 'react-hook-form';

const Form = ({survey, handler, fetchSurveyTypes}) => {
  const [surveyTypeOptions, setSurveyTypeOptions] = useState([]);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const defaultSurveyType = survey.surveyTypeId && {value: survey.surveyTypeId, label: survey.surveyTypeName};
  
  const onSubmit = (data) => {
    const body = {
      id: survey.id,
      name: data.name,
      description: data.description,
      surveyTypeId: data.surveyType.value
    }
    return handler(body)
  };

  const getSurveyTypes = async () => {
    const response = await fetchSurveyTypes();
    const surveyTypesAll = response.map(({id, name, description}) => {
      return { id: id, name: name, description: description }
    });

    return surveyTypesAll
  }

  useEffect(() => {
    getSurveyTypes().then((surveyTypesAll) => {
      const options = surveyTypesAll.map((surveyType) => {
        const option = { value: surveyType.id, label: surveyType.name }
        return option
      });
      setSurveyTypeOptions(options);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
          Survey type
        </Typography>
        <Controller
          name="surveyType"
          control={control}
          defaultValue={defaultSurveyType}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <Select
                {...field}
                className="basic-single"
                classNamePrefix="Select survey type"
                isClearable={true}
                options={surveyTypeOptions}
              />
            )
          }}
        />
        {errors.surveyType && (
          <p className="mt-2 text-sm text-red-600">
            Select survey type
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="name"
          control={control}
          defaultValue={survey.name}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Name'
                variant='outlined'
                fullWidth={true}
              />
            )
          }}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">
            Survey name is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="description"
          control={control}
          defaultValue={survey.description}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Description'
                variant='outlined'
                fullWidth={true}
                multiline={true}
                rows='5'
              />
            )
          }}
        />
      </div>
      <div className='m-4 text-center'>
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
}

const mapDispatchToProps = {
  fetchSurveyTypes,
}

export default connect(null, mapDispatchToProps)(Form);

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const useStyles = makeStyles({
  card: {
    minWidth: 650,
    marginBottom: 8,
  },
});

export default ({title, surveyQuestion, questionResponses, responseTypes, close, handler}) => {
  const classes = useStyles();
  const surveyQuestionAttrs = surveyQuestion || { id: null, body: '', position: '', response_type: '' };
  const responseTypesOptions = responseTypes.map((rt) => {
    return { value: rt, label: rt.replaceAll('_', ' ') }
  });
  const defaultResponseType = surveyQuestionAttrs.id && {
    value: surveyQuestionAttrs.response_type, 
    label: surveyQuestionAttrs.response_type.replaceAll('_', ' ')
  };
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      questionResponses: questionResponses
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'questionResponses' });

  const addResponse = () => {
    append({ id: '', name: '', description: '' });
  }

  const onSubmit = (data) => {
    const { body, position, questionResponses } = data;
    const params = {
      id: surveyQuestionAttrs.id,
      response_type: data.responseType.value,
      body,
      position,
      questionResponses
    };
    return handler(params)
  };

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.card} key={surveyQuestionAttrs.id}>
        <CardContent>
          <div className='flex justify-between mb-4'>
            <Typography variant="body1" align='left'>
              {title}
            </Typography>
            <div>
              <Button onClick={() => close()}>Close</Button>
            </div>
          </div>
          <div className='mb-8' key={`question_fields_${surveyQuestionAttrs.id}`}>
            <div className='mb-4'>
              <Controller
                name="body"
                control={control}
                defaultValue={surveyQuestionAttrs.body}
                rules={{ required: true }}
                render={({ field }) => {
                  return(
                    <TextField
                      {...field}
                      type='text'
                      label='Question'
                      variant='outlined'
                      fullWidth={true}
                    />
                  )
                }}
              />
              {errors.body && (
                <p className="mt-2 text-sm text-red-600 text-left">
                  Question body is required
                </p>
              )}
            </div>
            <div className='w-1/4 mb-4'>
              <Controller
                name="position"
                control={control}
                defaultValue={surveyQuestionAttrs.position}
                rules={{ required: true }}
                render={({ field }) => {
                  return(
                    <TextField
                      {...field}
                      type='text'
                      label='Position'
                      variant='outlined'
                      fullWidth={true}
                    />
                  )
                }}
              />
              {errors.position && (
                <p className="mt-2 text-sm text-red-600 text-left">
                  Question position is required
                </p>
              )}
            </div>
            <div className='w-1/4'>
              <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
                Response type
              </Typography>
              <Controller
                name="responseType"
                control={control}
                defaultValue={defaultResponseType}
                rules={{ required: true }}
                render={({ field }) => {
                  return(
                    <Select
                      {...field}
                      className="basic-single"
                      classNamePrefix="Select survey type"
                      isClearable={true}
                      options={responseTypesOptions}
                    />
                  )
                }}
              />
              {errors.responseType && (
                <p className="mt-2 text-sm text-red-600 text-left">
                  Select response type
                </p>
              )}
            </div>
          </div>
          <hr />
          <div className='mt-4' key={`responses_fields_${surveyQuestionAttrs.id}`}>
            <div className='flex justify-between mb-4'>
              <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
                Responses
              </Typography>
              <div>
                <Button onClick={() => addResponse()}>Add response</Button>
              </div>
            </div>
            {fields.map((response, index) => {
              return(
                <div className='flex mb-4' key={`response_${index}`}>
                  <Controller
                    name={`questionResponses[${index}].id`}
                    control={control}
                    defaultValue={response.id}
                    render={({ field }) => {
                      return(
                        <TextField
                          {...field}
                          type='hidden'
                        />
                      )
                    }}
                  />
                  <div className='w-2/4 mr-2'>
                    <Controller
                      name={`questionResponses[${index}].name`}
                      control={control}
                      defaultValue={response.name}
                      rules={{ required: true }}
                      render={({ field }) => {
                        return(
                          <TextField
                            {...field}
                            type='text'
                            label='Response name'
                            variant='outlined'
                            fullWidth={true}
                          />
                        )
                      }}
                    />
                  </div>
                  <div className='w-2/4'>
                    <Controller
                      name={`questionResponses[${index}].description`}
                      control={control}
                      defaultValue={response.description}
                      render={({ field }) => {
                        return(
                          <TextField
                            {...field}
                            type='text'
                            label='Response description'
                            variant='outlined'
                            fullWidth={true}
                          />
                        )
                      }}
                    />
                  </div>
                  <Button color='primary' onClick={() => remove(index)}>
                    <DeleteIcon />
                  </Button>
                </div>
              )
            })}
            {errors.questionResponses && (
              <p className="mt-2 text-sm text-red-600 text-left">
                Response name is required
              </p>
            )}
          </div>
          <div className='m-4 text-center'>
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

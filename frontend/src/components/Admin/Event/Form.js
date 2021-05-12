import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Select from 'react-select';
import { TextField, Button, Typography } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import {fetchEventRelatedEntities} from '@actions/events';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const newEventAttributes = {
  event_type_id: '',
  name: '',
  description: '',
  location: {
    location_type_id: null,
    region_id: null,
    province_id: null,
    city: '',
    streetNumber: '',
    zip: '',
    name: ''
  },
  groups: []
};

const Form = ({event, handler, fetchEventRelatedEntities}) => {
  console.log('Form event', event)
  const classes = useStyles();
  const eventAttributes = event || newEventAttributes;
  const defaultEventType = event && {value: event.event_type.id, label: event.event_type.name}
  const defaultLocationType = event && {value: event.location.location_type.id, label: event.location.location_type.name}
  const defaultRegion = event && {value: event.location.province.region.id, label: event.location.province.region.name}
  const defaultProvince = event && {value: event.location.province.id, label: event.location.province.name}
  const defaultStreetNumber = event && event.location.street_number;
  const defaultGroups = event && event.groups.map(({id, name}) => {
    return {value: id, label: name}
  });
  
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [locationTypeOptions, setLocationTypeOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [regions, setRegions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const defaultDate = () => {
    const currentDate = eventAttributes.date ? new Date(eventAttributes.date) : new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, 0);
    const day = (currentDate.getDate()).toString().padStart(2, 0);
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const date = `${year}-${month}-${day}T${hour}:${minutes}`;

    console.log('D 1', currentDate)
    console.log('D 2', year, month, day)
    console.log('D 3', date)

    return date;
  };
  
  const onRegionChange = (data) => {
    if (!data) return;

    const region = regions.find(({id}) => id == data.value);
    const regionOption = {value: region.id, label: region.name};
    const provinces = region.provinces.map((province) => {
      const option = { value: province.id, label: province.name }
      return option
    });

    setValue('region', regionOption);
    setValue('province', null);
    setProvinceOptions(provinces);
  };

  const onSubmit = (data) => {
    console.log('Data', data)
    const body = {
      eventTypeId: data.eventType.value,
      id: eventAttributes.id,
      name: data.eventName,
      description: data.eventDescription,
      date: data.date,
      location: {
        locationTypeId: data.locationType.value,
        provinceId: data.province.value,
        city: data.city,
        streetNumber: data.streetNumber,
        zip: data.zip,
        name: data.locationName
      },
      groupIds: data.groups.map(({value}) => value)
    }
    return handler(body)
  };

  useEffect(() => {
    fetchEventRelatedEntities().then((result) => {
      const eventTypes = result.event_types.map(({id, name}) => {
        const option = { value: id, label: name }
        return option
      });
      setEventTypeOptions(eventTypes);

      const locationTypes = result.location_types.map(({id, name}) => {
        const option = { value: id, label: name }
        return option
      });
      setLocationTypeOptions(locationTypes);

      const groups = result.groups.map(({id, name}) => {
        const option = { value: id, label: name }
        return option
      });
      setGroupOptions(groups);

      const regionsAll = result.regions.map((region) => {
        const option = { value: region.id, label: region.name }
        return option
      });

      if (eventAttributes.location.region_id) {
        const region = result.regions.find(({id}) => id == eventAttributes.location.region_id);
        const provinces = region.provinces.map((province) => {
          const option = { value: province.id, label: province.name }
          return option
        });
        setProvinceOptions(provinces);
      }

      setRegions(result.regions);
      setRegionOptions(regionsAll);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
          Event type
        </Typography>
        <Controller
          name="eventType"
          control={control}
          defaultValue={defaultEventType}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <Select
                {...field}
                className="basic-single"
                classNamePrefix="Select region"
                isClearable={true}
                options={eventTypeOptions}
              />
            )
          }}
        />
        {errors.eventType && (
          <p className="mt-2 text-sm text-red-600">
            Event type is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="eventName"
          control={control}
          defaultValue={eventAttributes.name}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Event title'
                variant='outlined'
                fullWidth={true}
              />
            )
          }}
        />
        {errors.eventName && (
          <p className="mt-2 text-sm text-red-600">
            Event title is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="eventDescription"
          control={control}
          defaultValue={eventAttributes.description}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Event description'
                variant='outlined'
                fullWidth={true}
                multiline={true}
                rows='4'
              />
            )
          }}
        />
        {errors.eventDescription && (
          <p className="mt-2 text-sm text-red-600">
            Event description is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="date"
          control={control}
          defaultValue={eventAttributes.date}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type="datetime-local"
                label='Event date'
                defaultValue={defaultDate()}
                // "2021-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )
          }}
        />
        {errors.date && (
          <p className="mt-2 text-sm text-red-600">
            Event date is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
          Event groups
        </Typography>
        <Controller
          name="groups"
          control={control}
          defaultValue={defaultGroups}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <Select
                {...field}
                isMulti
                className="basic-multi-select"
                classNamePrefix="Select groups"
                isClearable={true}
                options={groupOptions}
              />
            )
          }}
        />
        {errors.groups && (
          <p className="mt-2 text-sm text-red-600">
            Event group is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
          Location type
        </Typography>
        <Controller
          name="locationType"
          control={control}
          defaultValue={defaultLocationType}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <Select
                {...field}
                className="basic-single"
                classNamePrefix="Select region"
                isClearable={true}
                options={locationTypeOptions}
              />
            )
          }}
        />
        {errors.locationType && (
          <p className="mt-2 text-sm text-red-600">
            Location type is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="locationName"
          control={control}
          defaultValue={eventAttributes.location.name}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Location name'
                variant='outlined'
                fullWidth={true}
              />
            )
          }}
        />
      </div>
      <div className='mb-4'>
        <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
          Region
        </Typography>
        <Controller
          name="region"
          control={control}
          defaultValue={defaultRegion}
          render={({ field }) => {
            return(
              <Select
                {...field}
                className="basic-single"
                classNamePrefix="Select region"
                isClearable={true}
                options={regionOptions}
                onChange={onRegionChange}
              />
            )
          }}
        />
      </div>
      <div className='mb-4'>
        <Typography gutterBottom variant="body2" color="textPrimary" component="p" align='left'>
          Province
        </Typography>
        <Controller
          name="province"
          control={control}
          defaultValue={defaultProvince}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <Select
                {...field}
                className="basic-single"
                classNamePrefix="Select province"
                isClearable={true}
                options={provinceOptions}
                onChange={(data) => setValue('province', data)}
              />
            )
          }}
        />
        {errors.province && (
          <p className="mt-2 text-sm text-red-600">
            Select province
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="city"
          control={control}
          defaultValue={eventAttributes.location.city}
          rules={{ required: true }}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='City'
                variant='outlined'
                fullWidth={true}
              />
            )
          }}
        />
        {errors.city && (
          <p className="mt-2 text-sm text-red-600">
            City is required
          </p>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name="streetNumber"
          control={control}
          defaultValue={defaultStreetNumber}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Address'
                variant='outlined'
                fullWidth={true}
                multiline={true}
                rows='2'
              />
            )
          }}
        />
      </div>
      <div className='mb-4'>
        <Controller
          name="zip"
          control={control}
          defaultValue={eventAttributes.location.zip}
          render={({ field }) => {
            return(
              <TextField
                {...field}
                type='text'
                label='Zip'
                variant='outlined'
                fullWidth={true}
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
  fetchEventRelatedEntities,
}

export default connect(null, mapDispatchToProps)(Form);

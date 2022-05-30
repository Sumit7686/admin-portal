import axios from 'axios';
import { baseUrl } from '../env/config';
import { toast } from 'react-toastify';

export const eventScheduleSaveChanges = (value) => async () => {
  try {
    const valueObj = {
      spree: value.spree,
      date: value.date,
      logo: value.logo,
      featured_image: value.image,
      primary_color: value.color,
      numberOfDays: value.days
    };
    const response = await axios.post(`${baseUrl}/event/event-schedule`, valueObj);
    const data = response.data;
    // console.log('imageUpload :::', data.data);
    toast.success('Save Event.');
    return data.data;
  } catch (e) {
    console.log('e eventScheduleSaveChanges :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const createNewEvent = (value) => async () => {
  try {
    console.log('value createNewEvent :::', value);
    const valueObj = {
      spree: value.spree,
      day: Number(value.eventDay),
      event_name: value.eventName,
      time: value.eventTime,
      subtitle: value.subtitle,
      description: value.eventDescription,
      learnMore: value.learnMoreLink,
      active: value.active
    };
    const response = await axios.post(`${baseUrl}/event/new-event`, valueObj);
    const data = response.data;
    // console.log('value createNewEvent :::', data.data.days);
    // toast.success(response.data.message);
    toast.success('Successfully add new event.');
    return data.data;
  } catch (e) {
    console.log('e createNewEvent :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getEvent = (value) => async () => {
  try {
    // console.log('value getEvent spree :::', value);
    const response = await axios.get(`${baseUrl}/event/get-event/${value}`);
    const data = response.data;
    // console.log('value getEvent :::', data);
    // toast.success(response.data.message);
    return data.data;
  } catch (e) {
    console.log('e getEvent :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const deleteEvent = (value) => async () => {
  try {
    console.log('value deleteEvent :::', value);
    const response = await axios.post(`${baseUrl}/event/delete-event/`, {
      id: value.id,
      spree: value.spree
    });
    const data = response.data;
    // console.log('value :::', data.data);
    // toast.success(response.data.message);
    return data.data;
  } catch (e) {
    console.log('e deleteEvent :::', e);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getEventDataById = (value) => async () => {
  try {
    console.log('value getEventDataById spree :::', value);
    const response = await axios.post(`${baseUrl}/event/get-event-id`, {
      id: value.id,
      spree: value.spree
    });
    const data = response.data;
    // console.log('value :::', data.data);
    // toast.success(response.data.message);
    return data;
  } catch (e) {
    console.log('e getEventDataById :::', e);
    {
      value.id !== null && toast.error(e.response.data.message);
    }
    return e.response.data;
  }
};

export const editEventData = (value) => async () => {
  try {
    console.log('value editEventData :::', value);
    const valueObj = {
      spree: value.spree,
      id: value.id,
      time: value.eventTime,
      event_name: value.eventName,
      subtitle: value.subtitle,
      description: value.eventDescription,
      day: value.eventDay,
      learnMore: value.learnMoreLink,
      active: value.active
    };
    // console.log('value valueObj :::', valueObj);
    const response = await axios.post(`${baseUrl}/event/edit-event`, valueObj);
    const data = response.data;
    console.log('value editEventData :::', data.data);
    toast.success('Updated successfully.');
    return data;
  } catch (e) {
    console.log('e editEventData :::', e);
    {
      value.id !== null && toast.error(e.response.data.message);
    }
    return e.response.data;
  }
};

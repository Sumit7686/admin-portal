import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createNewEvent, getEventDataById, editEventData } from '../../../Services/EventSchedule';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from '../EventSchedule.module.css';
import back from '../../../Assets/Images/back.svg';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import EditEvent from './EditEvent';
import Select from 'react-select';

function EventScheduleCreateNew(props) {
  let navigate = useNavigate();
  const { state } = useLocation();

  const [selectedOption, setSelectedOption] = React.useState({ label: 'false', value: false });

  const options = [
    { label: 'true', value: true },
    { label: 'false', value: false }
  ];

  const saveChangesvalidation = Yup.object().shape({
    eventName: Yup.string().required('Event Name is Required'),
    eventTime: Yup.string().required('Event Time is Required'),
    eventDay: Yup.number()
      .required('Event Day is Required')
      .min(1, 'Please Enter the Day between 01 to 07')
      .max(7, 'Please Enter the Day between 01 to 07'),
    subtitle: Yup.string().required('Subtitle is Required'),
    eventDescription: Yup.string().required('Event Description is Required'),
    learnMoreLink: Yup.string(),
    active: Yup.boolean()
  });

  const dataEdit = async (value) => {
    value.spree = props.spree;
    console.log('data edit event :::', value);
    const data = await props.editEventData(value);
    console.log('dataEdit data :::', data);
    navigate('/event-schedule');
  };

  const createNewEventData = async (values) => {
    values.active = selectedOption.value;
    console.log('values subtitle :::', values);
    values.spree = props.spree;
    const data = await props.createNewEvent(values);
    console.log('createNewEventData data :::', data);
    navigate('/event-schedule');
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <div>
        <Link to="/event-schedule">
          <img src={back} alt="Back Button" />
        </Link>
        <h1>Create New Event</h1>
      </div>
      {state ? (
        <EditEvent dataEdit={dataEdit} />
      ) : (
        <Formik
          initialValues={{
            eventName: '',
            eventTime: '',
            eventDay: '',
            subtitle: '',
            eventDescription: '',
            learnMoreLink: '',
            active: ''
          }}
          validationSchema={saveChangesvalidation}
          onSubmit={(values) => {
            // console.log('values :::', values);
            createNewEventData(values);
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              role="form"
              className={classes.newEventScheduleFormsContainer}
              style={{ width: '100%', display: 'flex' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '72%' }} className={classes.newEventScheduleForm}>
                  <Form.Group>
                    <Row className={classes.newEventScheduleFormRow}>
                      <Col xl={6}>
                        <Form.Label className={classes.newEventFormLabel}>Event Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={values.eventName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          name="eventName"
                          className={classes.newEventFormInput}
                        />
                        {errors.eventName && touched.eventName && (
                          <div style={{ color: 'red' }}>{errors.eventName} </div>
                        )}
                      </Col>

                      <Col xl={4}>
                        <Form.Label className={classes.newEventFormLabel}>Event Time</Form.Label>
                        <Form.Control
                          type="text"
                          name="eventTime"
                          value={values.eventTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          className={classes.newEventFormInput}
                        />
                        {errors.eventTime && touched.eventTime && (
                          <div style={{ color: 'red' }}>{errors.eventTime} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px'
                          }}>
                          Format i.e. 11:00AM to 12:30PM{' '}
                        </div>
                      </Col>

                      <Col xl={2}>
                        <Form.Label className={classes.newEventFormLabel}>Event Day</Form.Label>
                        <Form.Control
                          type="number"
                          name="eventDay"
                          value={values.eventDay}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          className={classes.newEventFormInput}
                        />
                        {errors.eventDay && touched.eventDay && (
                          <div style={{ color: 'red' }}>{errors.eventDay} </div>
                        )}
                      </Col>
                    </Row>
                  </Form.Group>

                  <Row className={classes.newEventScheduleFormRow}>
                    <Form.Group>
                      <Col xl={12}>
                        <Form.Label className={classes.newEventFormLabel}>Subtitle*</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="subtitle"
                          value={values.subtitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          rows="4"
                          style={{ resize: 'none' }}
                          className={classes.newEventFormInput}
                        />
                        {errors.subtitle && touched.subtitle && (
                          <div style={{ color: 'red' }}>{errors.subtitle} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px'
                          }}>
                          Can also be used as a subtitle to the event name.
                        </div>
                      </Col>
                    </Form.Group>
                  </Row>
                  <Row className={classes.newEventScheduleFormRow}>
                    <Form.Group>
                      <Col xl={12}>
                        <Form.Label className={classes.newEventFormLabel}>
                          Event Description*
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="eventDescription"
                          value={values.eventDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          rows="4"
                          style={{ resize: 'none' }}
                          className={classes.newEventFormInput}
                        />
                        {errors.eventDescription && touched.eventDescription && (
                          <div style={{ color: 'red' }}>{errors.eventDescription} </div>
                        )}
                        <div
                          style={{
                            color: '#121212',
                            fontFamily: 'Magdelin-Medium',
                            fontSize: '14px'
                          }}>
                          Describe your event briefly
                        </div>
                      </Col>
                    </Form.Group>
                  </Row>

                  <Row className={`${classes.newEventScheduleFormRow} ${classes.lastFormRow}`}>
                    <Col xl={6}>
                      <Form.Label className={classes.newEventFormLabel}>Learn More Link</Form.Label>
                      <Form.Control
                        type="text"
                        name="learnMoreLink"
                        value={values.learnMoreLink}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className={classes.newEventFormInput}
                      />
                      {errors.learnMoreLink && touched.learnMoreLink && (
                        <div style={{ color: 'red' }}>{errors.learnMoreLink} </div>
                      )}
                      <div
                        style={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Medium',
                          fontSize: '14px'
                        }}>
                        Include complete URL. Typically used for event sponsor links or presentation
                        <br />
                        Materials.
                      </div>
                    </Col>
                    <Col xl={2}>
                      <Form.Label className={classes.newEventFormLabel}>Active</Form.Label>
                      <Select
                        defaultValue={selectedOption}
                        onChange={(item) => {
                          setSelectedOption(item);
                        }}
                        options={options}
                        value={selectedOption}
                      />
                      {errors.active && touched.active && (
                        <div style={{ color: 'red' }}>{errors.active}</div>
                      )}
                    </Col>
                  </Row>
                </div>

                <div className={classes.eventDetailsContainer}>
                  <div className={classes.informationContainer}>
                    <span className={classes.informationTxt}>INFORMATION</span>
                    <hr style={{ height: '0.1rem' }} />
                    <Row style={{ marginBottom: '1.8rem', marginTop: '1.8rem' }}>
                      <Col xl={6} style={{ textAlign: 'left' }}>
                        <span className={classes.createUpdateTxt}>Created</span>
                      </Col>
                      <Col xl={6} style={{ textAlign: 'right' }}>
                        <span className={classes.createUpdateTxt}>NaN Days Ago</span>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: '1rem' }}>
                      <Col xl={6} style={{ textAlign: 'left' }}>
                        <span className={classes.createUpdateTxt}>Lase Update</span>
                      </Col>
                      <Col xl={6} style={{ textAlign: 'right' }}>
                        <span className={classes.createUpdateTxt}>NaN Hours Ago</span>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <button type="submit" className={`w-100 ${classes.saveBtn}`}>
                      Save
                    </button>

                    <button className={`w-100 ${classes.deleteBtn}`}>Delete</button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { createNewEvent, getEventDataById, editEventData })(
  EventScheduleCreateNew
);

import React from 'react';
import classes from '../EventSchedule.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { eventScheduleSaveChanges, getEvent } from '../../../Services/EventSchedule';
import { imageUpload } from '../../../Services/ImageUploadServices';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import { Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import uploadImg from '../../../Assets/Images/image.svg';

function EventScheduleTableForm(props) {
  let navigate = useNavigate();

  const [logo, setLogo] = React.useState();
  const [image, setImage] = React.useState();
  const [logoUrl, setLogoUrl] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [colorName, setColorName] = React.useState('#fff');
  const [loader, setLoader] = React.useState(false);
  const [logoError, setLogoError] = React.useState(true);
  const [imageError, setImageError] = React.useState(true);

  React.useEffect(() => {
    var color_picker = document.getElementById('color-picker');
    var color_picker_wrapper = document.getElementById('color-picker-wrapper');
    color_picker.onChange = function () {
      color_picker_wrapper.style.backgroundColor = color_picker.value;
    };
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  }, [colorName, props]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleChangeImage(e) {
    setLoader(true);
    setImage(URL.createObjectURL(e.target.files[0]));
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(',')[1];
    const imageObj = {
      name: e.target.files[0].name,
      contentType: e.target.files[0].type,
      file: base64
    };
    console.log('imageObj', imageObj);
    const data = await props.imageUpload(imageObj);
    // console.log('login data image :::', data);
    setImageUrl(data.url);
    setImageError(false);
    setLoader(false);
  }

  async function handleChangeLogo(e) {
    setLoader(true);
    setLogo(URL.createObjectURL(e.target.files[0]));
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(',')[1];
    const imageObj = {
      name: e.target.files[0].name,
      contentType: e.target.files[0].type,
      file: base64
    };
    const data = await props.imageUpload(imageObj);
    console.log('login data logo :::', data);
    setLogoUrl(data.url);
    setLogoError(false);
    setLoader(false);
  }

  const saveChanges = async (values) => {
    if (values.edit !== 'edit') {
      values.color = colorName;
      values.logo = logoUrl;
      values.image = imageUrl;
    }
    values.spree = props.spree;
    console.log('data save :::', values);
    const data = await props.eventScheduleSaveChanges(values);
    console.log('saveChanges daat :::', data);
    navigate('/event-schedule');
  };

  const saveChangesvalidation = Yup.object().shape({
    date: Yup.date().required('Required'),
    days: Yup.number().required('Required')
    // logo: Yup.mixed().required('A logo is required')
    // image: Yup.mixed().required('A image is required')
    // color: Yup.string().required('Required')
  });

  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '3px 3px 8px rgba(0,0,0,0.1)',
        padding: '7% 10%',
        marginTop: '4.3rem'
      }}>
      {props.data.status !== 'error' ? (
        <EditForm data={props.data} saveChanges={(data) => saveChanges(data)} />
      ) : (
        <Formik
          initialValues={{
            date: '',
            days: '',
            logo: '',
            image: '',
            color: ''
          }}
          validationSchema={saveChangesvalidation}
          onSubmit={(values) => {
            logoUrl === undefined ? setLogoError(true) : setLogoError(false);
            imageUrl === undefined ? setImageError(true) : setImageError(false);
            values.logo = !logoError && logoUrl;
            values.image = !imageError && imageUrl;
            console.log('values :::', values, logoError, imageError);
            !logoError && !imageError && saveChanges(values);
          }}>
          {({ values, handleChange, handleSubmit, isSubmitting, errors, touched, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
                <Form.Group>
                  <Col xl={12}>
                    <Form.Label className={classes.newEventFormLabel}>StartDate*</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={classes.newEventFormInput}
                    />
                    {errors.date && touched.date && (
                      <div style={{ color: 'red' }}>{errors.date} </div>
                    )}
                  </Col>
                </Form.Group>
              </Row>

              <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
                <Form.Group>
                  <Col xl={12}>
                    <Form.Label className={classes.newEventFormLabel}>Number for Days*</Form.Label>
                    <Form.Control
                      type="number"
                      name="days"
                      value={values.days}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={classes.newEventFormInput}
                    />
                    {errors.days && touched.days && (
                      <div style={{ color: 'red' }}>{errors.days} </div>
                    )}
                  </Col>
                </Form.Group>
              </Row>

              <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
                <Form.Group>
                  <Col xl={12}>
                    <Form.Label className={classes.newEventFormLabel}>Featured Logo*</Form.Label>
                    <label htmlFor="inputLogoTag" className={classes.labelFile}>
                      <p className={classes.selectedFile}>
                        <span className="googleSpan">
                          <img
                            src={logo === undefined ? uploadImg : logo}
                            alt=""
                            style={{
                              maxWidth: logo !== undefined && '95%',
                              maxHeight: logo !== undefined && '100px'
                            }}
                          />
                        </span>
                      </p>
                      <input
                        id="inputLogoTag"
                        type="file"
                        onChange={handleChangeLogo}
                        className={classes.inputFile}
                      />
                    </label>
                    {logoError && logoUrl === undefined && (
                      <div style={{ color: 'red' }}>Logo is Required</div>
                    )}
                  </Col>
                </Form.Group>
              </Row>

              <Row className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}>
                <Form.Group>
                  <Col xl={12}>
                    <Form.Label className={classes.newEventFormLabel}>Banner Image*</Form.Label>
                    <label htmlFor="inputImageTag" className={classes.labelFile}>
                      <p className={classes.selectedFile}>
                        <span className="googleSpan">
                          <img
                            src={image === undefined ? uploadImg : image}
                            alt=""
                            style={{
                              maxWidth: image !== undefined && '95%',
                              maxHeight: image !== undefined && '100px'
                            }}
                          />
                        </span>
                      </p>
                      <input
                        id="inputImageTag"
                        type="file"
                        onChange={handleChangeImage}
                        className={classes.inputFile}
                      />
                    </label>
                    {imageError && imageUrl === undefined && (
                      <div style={{ color: 'red' }}>Image is Required</div>
                    )}
                  </Col>
                </Form.Group>
              </Row>

              <Row
                className={`${classes.newEventScheduleFormRow}`}
                style={{ marginBottom: '4rem' }}>
                <Form.Group>
                  <Col xl={12}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Form.Label
                        className={classes.newEventFormLabel}
                        style={{ marginBottom: '10rem', paddingBottom: '10%' }}>
                        Background Color*
                      </Form.Label>

                      <div className={classes.colorPickerContainer}>
                        <div
                          id="color-picker-wrapper"
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            marginRight: '1rem',
                            zIndex: '10'
                          }}>
                          <Form.Control
                            type="color"
                            name="color"
                            id="color-picker"
                            value={
                              colorName === null
                                ? (values.color = '#000000')
                                : (values.color = colorName)
                            }
                            onChange={(e) => setColorName(e.target.value)}
                          />
                        </div>
                        <span className={classes.colorNameText}>
                          {colorName === null ? '#000000' : colorName}
                        </span>
                      </div>
                    </div>
                    {errors.color && touched.color && (
                      <div style={{ color: 'red' }}>{errors.color} </div>
                    )}
                  </Col>
                </Form.Group>
              </Row>

              <Grid item xs={12} sm={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loader && true}
                  sx={{
                    backgroundColor: 'black',
                    width: '100%',
                    fontFamily: 'Magdelin-Bold',
                    fontSize: '16px',
                    borderRadius: '10px'
                  }}>
                  save changes
                </Button>
              </Grid>
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

export default connect(mapStateToProps, { imageUpload, getEvent, eventScheduleSaveChanges })(
  EventScheduleTableForm
);

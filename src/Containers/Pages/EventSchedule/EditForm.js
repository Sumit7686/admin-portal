import React from 'react';
import classes from '../EventSchedule.module.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { imageUpload } from '../../../Services/ImageUploadServices';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';

function EditForm(props) {
  const [logoUrl, setLogoUrl] = React.useState(props.data.logo);
  const [imageUrl, setImageUrl] = React.useState(props.data.featured_image);
  const [logo, setLogo] = React.useState();
  const [image, setImage] = React.useState();
  const [loader, setLoader] = React.useState(false);

  const [colorName, setColorName] = React.useState(props.data.primary_color);
  const [daysValue, setDaysValue] = React.useState(props.data.numberOfDays);
  const [date, setDate] = React.useState(moment(props.data.date).format('YYYY-MM-DD'));

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
    const data = await props.imageUpload(imageObj);
    setImageUrl(data.url);
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
    setLoader(false);
  }

  React.useEffect(() => {
    setDaysValue(props.data.numberOfDays);
    setDate(moment(props.data.date).format('YYYY-MM-DD'));
    setColorName(props.data.primary_color);
    setLogoUrl(props.data.logo);
    setImageUrl(props.data.featured_image);
    setLogo();
    setImage();
  }, [props.data]);

  React.useEffect(() => {
    var color_picker = document.getElementById('color-picker');
    var color_picker_wrapper = document.getElementById('color-picker-wrapper');
    color_picker.onChange = function () {
      color_picker_wrapper.style.backgroundColor = color_picker.value;
    };
    color_picker_wrapper.style.backgroundColor = color_picker.value;
  }, [colorName]);

  const editChangesvalidation = Yup.object().shape({
    date: Yup.date().required('Required')
    // days: Yup.number().required('Required')
    // logo: Yup.mixed().required('A logo is required')
    // image: Yup.mixed().required('A image is required')
    // color: Yup.string().required('Required')
  });

  return (
    <Formik
      initialValues={{
        date: date,
        days: daysValue,
        logo: logoUrl,
        image: imageUrl,
        color: colorName
      }}
      validationSchema={editChangesvalidation}
      onSubmit={(values) => {
        values.date = date;
        values.color = colorName;
        values.logo = logoUrl;
        values.image = imageUrl;
        values.days = parseInt(daysValue);
        values.edit = 'edit';
        console.log('edit form values :::', values);
        props.saveChanges(values);
      }}>
      {({ errors, touched, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Row
            className={`${classes.newEventScheduleFormRow} ${classes.marginBottom}`}
            style={{ marginBottom: '1.5rem' }}>
            <Form.Group>
              <Col xl={12}>
                <Form.Label className={classes.newEventFormLabel}>Start Date*</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  className={classes.newEventFormInput}
                />
                {errors.date && touched.date && <div style={{ color: 'red' }}>{errors.date} </div>}
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
                  value={daysValue}
                  onChange={(e) => {
                    setDaysValue(e.target.value);
                  }}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  className={classes.newEventFormInput}
                />
                {errors.days && touched.days && <div style={{ color: 'red' }}>{errors.days} </div>}
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
                        src={logo === undefined ? logoUrl : logo}
                        alt=""
                        style={{
                          maxWidth: logo !== undefined ? '95%' : '95%',
                          maxHeight: logo !== undefined ? '100px' : '100px'
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
                        src={image === undefined ? imageUrl : image}
                        alt=""
                        style={{
                          maxWidth: image !== undefined ? '95%' : '95%',
                          maxHeight: image !== undefined ? '100px' : '100px'
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
              </Col>
            </Form.Group>
          </Row>
          <Row className={`${classes.newEventScheduleFormRow}`} style={{ marginBottom: '4rem' }}>
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
                        marginRight: '1rem'
                      }}>
                      <Form.Control
                        type="color"
                        name="color"
                        id="color-picker"
                        value={colorName === null ? '#000000' : colorName}
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
              Edit changes
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { imageUpload })(EditForm);

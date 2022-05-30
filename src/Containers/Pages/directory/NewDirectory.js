import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import classes from '../EventSchedule.module.css';
import back from '../../../Assets/Images/back.svg';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import uploadImg from '../../../Assets/Images/image.svg';
import { imageUpload } from '../../../Services/ImageUploadServices';
import { createNewDirectory, editDirectory } from '../../../Services/Directory';
import { connect } from 'react-redux';
import EditDirectory from './EditDirectory';
import { useNavigate, useLocation } from 'react-router';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8d8c8c' : 'white',
    '&:hover': {
      background: '#cac4c4'
    }
  }),
  control: (styles) => ({
    ...styles,
    border: '1px solid #707070',
    borderRadius: '10px',
    width: '100px',
    display: 'flex',
    '&:hover': {
      borderColor: '#000'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 3,
    width: '100px',
    marginTop: '5px',
    padding: 0
  }),
  menuList: (base) => ({
    ...base,
    height: 'auto',
    padding: 0
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#707070';
    return { ...provided, transition, color, opacity };
  }
};

function NewDirectory(props) {
  const [active, setActive] = React.useState({ label: 'true', value: true });
  const [hidden, setHidden] = React.useState({ label: 'false', value: false });
  const [loader, setLoader] = React.useState(false);
  const [logoError, setLogoError] = React.useState(true);
  const [imageError, setImageError] = React.useState(true);

  const { state } = useLocation();
  // console.log('state NewDirectory :::', state);
  let navigate = useNavigate();

  const [image, setImage] = React.useState();
  const [logo, setLogo] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [logoUrl, setLogoUrl] = React.useState();

  const directoryvalidation = Yup.object().shape({
    dirName: Yup.string().required('Directory Name is Required'),
    dirCategory: Yup.string().required('Directory Category is Required'),
    dirDescription: Yup.string().required('Directory Description is Required'),
    // bannerImage: Yup.mixed().required('Banner Image is Required'),
    // logo: Yup.mixed().required('Logo is Required'),
    caratValue: Yup.number().required('Carat Value is Required')
    // active: Yup.boolean().required('Active is Required'),
    // hidden: Yup.boolean().required('Hidden is Required')
  });

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
    console.log('handleChangeImage logo :::', data);
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
    console.log('handleChangeLogo logo :::', data);
    setLogoUrl(data.url);
    setLogoError(false);
    setLoader(false);
  }

  const saveDirectory = async (values) => {
    values.spree = props.spree;
    const data = await props.createNewDirectory(values);
    console.log('saveDirectory data :::', data);
    navigate('/directory');
  };

  const editDirectory = async (values) => {
    values.spree = props.spree;
    console.log('values edit :::', values);
    const data = await props.editDirectory(values);
    console.log('editDirectory data :::', data);
    navigate('/directory');
  };

  return (
    <div className={classes.newEventScheduleContainer}>
      <div>
        <Link to="/directory">
          <img src={back} alt="Back Button" />
        </Link>
        <h1>Create New Shop</h1>
      </div>
      {state ? (
        <EditDirectory data={editDirectory} />
      ) : (
        <Formik
          initialValues={{
            dirName: '',
            dirCategory: '',
            dirDescription: '',
            bannerImage: '',
            logo: '',
            caratValue: 0,
            active: '',
            hidden: ''
          }}
          validationSchema={directoryvalidation}
          onSubmit={(values) => {
            logoUrl === undefined ? setLogoError(true) : setLogoError(false);
            imageUrl === undefined ? setImageError(true) : setImageError(false);
            values.logo = !logoError && logoUrl;
            values.bannerImage = !imageError && imageUrl;
            values.active = active.value;
            values.hidden = hidden.value;
            console.log('values :::', values, active.value, hidden.value);
            !logoError && !imageError && saveDirectory(values);
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <Form
              onSubmit={handleSubmit}
              role="form"
              className={classes.newEventScheduleFormsContainer}
              style={{ width: '100%', display: 'flex' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '72%' }} className={classes.newEventScheduleForm}>
                  <Form.Group>
                    <Row className={classes.newEventScheduleFormRow}>
                      <Col xl={7}>
                        <Form.Label className={classes.newEventFormLabel}>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={values.dirName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="dirName"
                          className={classes.newEventFormInput}
                        />
                        {errors.dirName && touched.dirName && (
                          <div style={{ color: 'red' }}>{errors.dirName} </div>
                        )}
                      </Col>

                      <Col xl={5}>
                        <Form.Label className={classes.newEventFormLabel}>Category</Form.Label>
                        <Form.Control
                          type="text"
                          name="dirCategory"
                          value={values.dirCategory}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.newEventFormInput}
                        />
                        {errors.dirCategory && touched.dirCategory && (
                          <div style={{ color: 'red' }}>{errors.dirCategory} </div>
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                  <Row className={classes.newEventScheduleFormRow}>
                    <Form.Group>
                      <Col xl={12}>
                        <Form.Label className={classes.newEventFormLabel}>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="dirDescription"
                          value={values.dirDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows="4"
                          style={{ resize: 'none' }}
                          className={classes.newEventFormInput}
                        />
                        {errors.dirDescription && touched.dirDescription && (
                          <div style={{ color: 'red' }}>{errors.dirDescription} </div>
                        )}
                      </Col>
                    </Form.Group>
                  </Row>

                  <Form.Group>
                    <Row className={classes.newEventScheduleFormRow}>
                      <Col xl={7}>
                        <Form.Label className={classes.newEventFormLabel}>Banner Image</Form.Label>
                        <label
                          htmlFor="inputImageTag"
                          className={classes.labelFile}
                          style={{ width: '100%' }}>
                          <p className={classes.selectedFile}>
                            <span className="googleSpan">
                              <img src={image === undefined ? uploadImg : image} alt="" />
                            </span>
                          </p>
                          <input
                            name="bannerImage"
                            id="inputImageTag"
                            type="file"
                            onChange={handleChangeImage}
                            className={classes.inputFile}
                          />
                        </label>
                        {imageError && imageUrl === undefined && (
                          <div style={{ color: 'red' }}>Banner Image is Required</div>
                        )}
                      </Col>

                      <Col xl={5}>
                        <Form.Label className={classes.newEventFormLabel}>Logo</Form.Label>
                        <label
                          htmlFor="inputLogoTag"
                          className={classes.labelFile}
                          style={{ width: '100%' }}>
                          <p className={classes.selectedFile}>
                            <span className="googleSpan">
                              <img src={logo === undefined ? uploadImg : logo} alt="" />
                            </span>
                          </p>
                          <input
                            name="logo"
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
                    </Row>
                  </Form.Group>

                  <Form.Group>
                    <div style={{ display: 'flex', width: '40%' }}>
                      <div style={{ width: '100px', marginRight: '1rem' }}>
                        <Form.Label className={classes.newEventFormLabel}>Carat Value</Form.Label>
                        <Form.Control
                          type="number"
                          value={values.caratValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="caratValue"
                          className={classes.newEventFormInput}
                        />
                        {errors.caratValue && touched.caratValue && (
                          <div style={{ color: 'red' }}>{errors.caratValue} </div>
                        )}
                      </div>

                      <div style={{ width: '20%', paddingRight: '3rem', marginRight: '2rem' }}>
                        <Form.Label className={classes.newEventFormLabel}>Active</Form.Label>

                        <Select
                          options={[
                            { label: 'true', value: true },
                            { label: 'false', value: false }
                          ]}
                          styles={customStyles}
                          defaultValue={active}
                          onChange={(val) => setActive(val)}
                          value={active}
                        />
                        {errors.active && touched.active && (
                          <div style={{ color: 'red' }}>{errors.active} </div>
                        )}
                      </div>

                      <div style={{ width: '20%', paddingRight: '3rem', marginRight: '2rem' }}>
                        <Form.Label className={classes.newEventFormLabel}>Hidden</Form.Label>
                        <Select
                          options={[
                            { label: 'true', value: true },
                            { label: 'false', value: false }
                          ]}
                          styles={customStyles}
                          defaultValue={hidden}
                          onChange={(val) => setHidden(val)}
                          value={hidden}
                        />
                        {errors.hidden && touched.hidden && (
                          <div style={{ color: 'red' }}>{errors.hidden} </div>
                        )}
                      </div>
                    </div>
                  </Form.Group>
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
                    <button
                      type="submit"
                      className={`w-100 ${classes.saveBtn}`}
                      disabled={loader && true}>
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

export default connect(mapStateToProps, { imageUpload, createNewDirectory, editDirectory })(
  NewDirectory
);

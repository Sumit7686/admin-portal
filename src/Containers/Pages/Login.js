import React from 'react';
import './Login.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Header from '../../Components/Header';
import logo from '../../Assets/Images/logo.svg';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { useAppContext } from '../../Lib/ContextLib';
import IconButton from '@mui/material/IconButton';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { loginAuth } from '../../Services/AuthServices';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #707070',
    fontSize: 16,
    width: '100%',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

function Login(props) {
  let navigate = useNavigate();
  const { setAuthenticated } = useAppContext();
  const [passwordShow, setPasswordShow] = React.useState(false);
  const signInvalidation = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
  });

  const getData = async (value) => {
    // console.log('data getData :::', value);
    const data = await props.loginAuth(value);
    if (data) {
      navigate('/');
      setAuthenticated(true);
      localStorage.setItem('isAuthenticated', data.token);
    }
  };

  const route = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="main">
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-65px',
          height: '100vh'
        }}>
        <div className="container-child">
          <img src={logo} className="logo-img" />
          <Typography sx={{ fontFamily: 'Magdelin-Black', fontSize: '32px', color: '#121212' }}>
            Carat Apps
          </Typography>
          <Typography sx={{ fontFamily: 'Magdelin-Medium', fontSize: '20px', color: '#121212' }}>
            Destination Dashboard
          </Typography>
        </div>
        <Grid
          sx={{
            borderRadius: '10px',
            p: 2,
            boxShadow: 5,
            backgroundColor: 'white',
            marginTop: '8%'
          }}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={signInvalidation}
            onSubmit={(values) => {
              getData(values);
            }}>
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} sx={{ paddingTop: '40px' }}>
                    <FormControl variant="standard" fullWidth>
                      <Typography
                        htmlFor="bootstrap-input"
                        sx={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px'
                        }}>
                        Email or Username
                      </Typography>
                      <BootstrapInput
                        id="bootstrap-input"
                        name="email"
                        label="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {errors.email && touched.email && <div className="error">{errors.email}</div>}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    style={{ paddingTop: '10px' }}>
                    <Typography variant="standard"></Typography>
                    <Typography
                      variant="caption"
                      onClick={route}
                      sx={{
                        color: '#121212',
                        fontFamily: 'Magdelin-Medium',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}>
                      Forgot Password?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ paddingTop: '0px' }}>
                    <FormControl variant="standard" fullWidth>
                      <Typography
                        htmlFor="bootstrap-input"
                        sx={{
                          color: '#121212',
                          fontFamily: 'Magdelin-Bold',
                          fontSize: '16px'
                        }}>
                        Password
                      </Typography>
                      <div>
                        <BootstrapInput
                          id="bootstrap-input"
                          name="password"
                          label="password"
                          type={passwordShow ? 'text' : 'password'}
                          value={values.password}
                          sx={{ '& label': { padding: '0px 10px' }, width: '90%' }}
                          onChange={handleChange}
                        />
                        <IconButton onClick={() => setPasswordShow(!passwordShow)}>
                          {passwordShow ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                        </IconButton>
                      </div>
                    </FormControl>

                    {errors.password && touched.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} align="center">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: 'black',
                        width: '100%',
                        fontFamily: 'Magdelin-Bold',
                        fontSize: '16px',
                        borderRadius: '10px'
                      }}>
                      Log in
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return { todos: state.spree };
}

export default connect(mapStateToProps, { loginAuth })(Login);

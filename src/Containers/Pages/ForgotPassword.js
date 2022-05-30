import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { forgotAuth } from '../../Services/AuthServices';

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

function ForgotPassword(props) {
  let navigate = useNavigate();

  const forgotValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  });

  const forgotData = async (value) => {
    // console.log('data forgotData :::', value);
    const data = await props.forgotAuth(value);
    console.log('data forgot response:::', data);
    if (data) {
      navigate('/login');
    }
  };

  return (
    <div className="main">
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
        <div className="container-child">
          <Typography sx={{ fontFamily: 'Magdelin-Black', fontSize: '20px', color: '#121212' }}>
            Forgot Password
          </Typography>
        </div>
        <Grid
          sx={{
            borderRadius: '10px',
            p: 2,
            boxShadow: 5,
            backgroundColor: 'white',
            marginTop: '8%',
            width: '100%'
          }}>
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={forgotValidation}
            onSubmit={(values) => {
              forgotData(values);
            }}>
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Typography sx={{ my: 2 }}>
                  Enter a valid Email to receive instructions on how to reset your password.
                </Typography>
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
                        Email
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
                      Submit
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

export default connect(mapStateToProps, { forgotAuth })(ForgotPassword);

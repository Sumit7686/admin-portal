import axios from 'axios';
import { login } from '../Actions/Login';
import { baseUrl } from '../env/config';
import { toast } from 'react-toastify';

export const loginAuth = (value) => async (dispatch) => {
  try {
    const body = { username: value.email, password: value.password, loginType: 'web' };
    const response = await axios.post(`${baseUrl}/auth/login`, body);
    const { data } = response.data;
    dispatch(login(data));
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.token;
    toast.success(response.data.message);
    return data;
  } catch (e) {
    console.log('e :::', e);
    toast.error(e.response.data.message);
    return false;
  }
};

export const forgotAuth = (value) => async () => {
  try {
    const body = { email: value.email };
    const response = await axios.post(`${baseUrl}/auth/forgot-password`, body);
    const data = response.data;
    toast.success(response.data.message);
    return data;
  } catch (e) {
    console.log('e forgot :::', e.response);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getAdminData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/user/me`);
    const { data } = response.data;
    dispatch(login(data));
    // toast.success(response.data.message);
    return data;
  } catch (e) {
    console.log('e getAdminData :::', e.response);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const logout = () => async () => {
  try {
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('isAuthenticated');
    toast.success('Logout.');
    return true;
  } catch (e) {
    console.log('e logout :::', e.response);
    toast.error(e.response.data.message);
    return 'Logout Error.';
  }
};

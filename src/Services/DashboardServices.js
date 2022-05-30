import axios from 'axios';
import { baseUrl } from '../env/config';
import { toast } from 'react-toastify';
// import { useAppContext } from '../Lib/ContextLib';
// const { setAuthenticated } = useAppContext();

export const getSpree = () => async () => {
  try {
    const response = await axios.get(`${baseUrl}/spree`);
    const data = response.data;
    return data;
  } catch (e) {
    console.log('e getSpree :::', e.response.data.message);
    if (e.response.data.message === 'Unauthorized Request') {
      localStorage.removeItem('isAuthenticated');
      delete axios.defaults.headers.common['Authorization'];
      // setAuthenticated(false);
    }
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

export const getTop5User = (value) => async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/spree/${value}`);
    const { data } = response.data;
    // console.log('getTop5User data :::', data);
    return data;
  } catch (e) {
    console.log('e getTop5User :::', e.response.data.message);
    toast.error(e.response.data.message);
    return e.response.data;
  }
};

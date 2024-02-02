// authActions.js
import axios from 'axios';
import toast from 'react-hot-toast';

const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/institute-user/login`;
const LOGOUT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user/logout`;

export const login = (username, password) => async (dispatch) => {
  let data = {
    username: username,
    password: password
  };
  try {
    // Make API request to login
    const response = await axios.post(LOGIN_API_ENDPOINT, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);

    // Store token and user ID in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userData);

    if (response.data.status) {
      // Dispatch success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.data.token,
          userId: response.data.userData
        }
      });
      window.location.replace('/');
      toast.success('Login Successful');
      return { success: true, message: 'Login successfully' };
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: response.data.message
      });
      toast.error(response.data.message);
      return { success: false, message: 'Failed to delete group' };
    }
  } catch (error) {
    // Dispatch error action
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response.data.message
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Make API request to login
    const response = await axios.post(LOGOUT_API_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Remove token and user ID from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    // Dispatch logout action
    dispatch({
      type: 'LOGOUT',
      payload: {
        message: response.data.message
      }
    });
  } catch (error) {
    // Dispatch error action
    dispatch({
      type: 'LOGOUT_FAILURE',
      payload: error.response.data.message
    });
  }
};

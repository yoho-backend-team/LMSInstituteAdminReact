// authActions.js
import axios from 'axios';
import toast from 'react-hot-toast';

const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/auth/admin/login/`;
const LOGOUT_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/institute-user/logout`;
// import { updateFcmToken } from 'features/user-management/users-page/services/userServices';
// import { requestForToken } from '../../firebase';
export const login = (username, password) => async (dispatch) => {
  let data = {
    email: username,
    password: password
  };
  try {
    // Make API request to login
    const response = await axios.post(LOGIN_API_ENDPOINT, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
    console.log(response,response.data);

    if (response.data.status==="success") {
      // Store token and user ID in localStorage
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data.user));
      localStorage.setItem('permissions', JSON.stringify(response.data.data.permissions));
      localStorage.setItem('branches', JSON.stringify(response.data.data.branches));
      localStorage.setItem("institute",JSON.stringify(response.data.data.institue))
      
      // Dispatch success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.data.data.token,
          userData: response.data.data.user,
          permissions: response.data.data.permissions,
          branches: response.data.data.branches,
          institute: response.data.data.institue,
          selectedBranchId: response.data.data.branches[0]?.uuid
        }
      });
      // const fcmToken = await requestForToken();
      // const updateToken = await updateFcmToken({ fcm_token: fcmToken });
      // console.log(updateToken);
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
    console.log(error)
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response.data.message
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Make API request to login
    const response = await axios.post(
      LOGOUT_API_ENDPOINT,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log(response);
    if (response.data.status) {
      // Remove token and user ID from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('permissions');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('branches');

      // Dispatch logout action
      dispatch({
        type: 'LOGOUT',
        payload: {
          message: response.data.message
        }
      });
      window.location.replace('/login');
      toast.success('Logout Successful');
    }
  } catch (error) {
    // Dispatch error action
    dispatch({
      type: 'LOGOUT_FAILURE',
      payload: error.response.data.message
    });
  }
};

export const updateSelectedBranch = (newBranch) => ({
  type: 'UPDATE_SELECTED_BRANCH',
  payload: newBranch
});
export const updateAuthBranch = (newBranch) => ({
  type: 'UPDATE_BRANCH',
  payload: newBranch
});

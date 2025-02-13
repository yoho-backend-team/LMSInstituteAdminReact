// authActions.js
import axios from 'axios';
import toast from 'react-hot-toast';
import client from 'api/client';
import { HTTP_END_POINTS } from 'api/client/http_end_points';
import secureLocalStorage from 'react-secure-storage';
import { setBranches, setInstitute, setIsAuthenticated, setOtp, setPermissions, setSelectedBranchId, setToken, setUserData } from 'utils/localStroageService';
// import { removeSecureItem, setBranches, setInstitute, setIsAuthenticated, setOtp, setPermissions, setSelectedBranchId, setToken, setUserData } from 'utils/localStroageService';
import { removeSecureItem, setBranches, setInstitute, setIsAuthenticated, setOtp, setPermissions, setSelectedBranchId, setToken, setUserData } from 'utils/localStroageService';
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
    const response = await axios.post(LOGIN_API_ENDPOINT, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.data.otpVerify) {
      setOtp(response.data.data);
      toast.success(response.data.message);
      return { otpVerify: true };
    }

    setIsAuthenticated(true);
    setToken(response.data.data.token);
    setUserData(response.data.data.user);
    setPermissions(response.data.data.permissions);
    setBranches(response.data.data.branches);
    setInstitute(response.data.data.institute);
   setSelectedBranchId(response.data.data.branches[0]?.uuid);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token: response.data.data.token,
        userData: response.data.data.user,
        permissions: response.data.data.permissions,
        branches: response.data.data.branches,
        institute: response.data.data.institute,
        selectedBranchId: response.data.data.branches[0]?.uuid
      }
    });

    window.location.replace('/');
    toast.success('Login Successful');
    return { success: true, message: 'Login successfully' };
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error?.response?.data?.message
    });
    throw new Error(error?.response?.data?.message);
  }
};

export const VerifyOtp = (otp, email, token) => async (dispatch) => {
  const data = {
    otp: otp,
    email: email,
    token: token
  };
  try {
    const response = await client.users.verifyOtp(data);

    if (response.status === 'success') {
      setIsAuthenticated(true);
      setToken(response.data.token);
      setUserData(response.data.user);
      setPermissions(response.data.permissions);
      setBranches(response.data.branches);
      setInstitute(response.data.institute);
      secureLocalStorage.removeItem('otp');
      console.log(response, 'response');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.data.token,
          userData: response.data.user,
          permissions: response.data.permissions,
          branches: response.data.branches,
          institute: response.data.institute,
          selectedBranchId: response.data.branches[0]?.uuid
        }
      });
      // const fcmToken = await requestForToken();
      // const updateToken = await updateFcmToken({ fcm_token: fcmToken });

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
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response.data.message
    });
  }
};

export const logout = (data) => async (dispatch) => {
  try {
    // const response = await axios.post(
    //   LOGOUT_API_ENDPOINT,
    //   {},
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    //   }
    // );
    const response = await client.users.logout(data);

    if (response.status) {
      // Remove token and user ID from localStorage
      secureLocalStorage.removeItem('token');
      secureLocalStorage.removeItem('userData');
      secureLocalStorage.removeItem('permissions');
      secureLocalStorage.removeItem('isAuthenticated');
      secureLocalStorage.removeItem('branches');
      secureLocalStorage.removeItem('institute');

      // Dispatch logout action
      dispatch({
        type: 'LOGOUT',
        payload: {
          message: response.message
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

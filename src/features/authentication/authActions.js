// authActions.js
import axios from 'axios';
import toast from 'react-hot-toast';
import client from 'api/client';
import { HTTP_END_POINTS } from 'api/urls';

const LOGIN_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}api/institutes/auth/admin/login/`;
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
   
    console.log(response,response.data);
    if(response.data.data.otpVerify){
       localStorage.setItem("otp",JSON.stringify(response.data.data))
       toast.success(response.data.message)
       return {otpVerify:true}
    }

    if (response.data.status==="success") {
      
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data.user));
      localStorage.setItem('permissions', JSON.stringify(response.data.data.permissions));
      localStorage.setItem('branches', JSON.stringify(response.data.data.branches));
      localStorage.setItem("institute",JSON.stringify(response.data.data.institute))
      console.log(response,"response",response.data.data.institute)
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

export const VerifyOtp = (otp,email,token) => async (dispatch) => {
  const data ={
    otp : otp,
    email : email ,
    token : token 
  }
  try {
    
  
    const response = await client.users.verifyOtp(data)
    console.log(response,"response")
    if (response.status==="success") {
      
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
      localStorage.setItem('branches', JSON.stringify(response.data.branches));
      localStorage.setItem("institute",JSON.stringify(response.data.institute))
      localStorage.removeItem("otp")
    
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
    console.log(error)
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response.data.message
    });
  }
}

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
    const response = await client.users.logout(data)
    console.log(response);
    if (response.status) {
      // Remove token and user ID from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('permissions');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('branches');
      localStorage.removeItem("institute")
      

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
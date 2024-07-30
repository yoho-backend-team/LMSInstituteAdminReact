// userService.js
import client from 'api/client';
import axios from 'axios';

const USER_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/user`;
const USER_API_USER_NAME_CHECK_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/user/check-username`;

const PROFILE_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/profile-management`;

export const getAllUsers = async (data) => {
  try {
    const response = await client.user.getAll(data)
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch users. Status: ${error?.response.data?.message}`);
  }
};
export const getUserActivityLog = async (data) => {
  try {
    const response = await client.student.activity(data)
    // Check if the response status is successful
    
    return { success: true, data: response.data };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers Activity Log:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch users. Activity Log: ${response.status}`);
  }
};
export const getUserById = async (data) => {
  try {
    const response = await client.user.getWithId(data)
    // Check if the response status is successful
    
      return { success: true, data: response.data };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch users. Status: ${response.status}`);
  }
};
export const updateUserStatus = async (data) => {
  try {
    const response = client.user.update(data)
  
    return { success: true, message: 'User status updated successfully' };
  } catch (error) {
    console.error('Error in addUser:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};
export const userChangePassword = async (data) => {
  try {
    const response = await axios.put(`${USER_API_ENDPOINT}/password-update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'Password Changed Successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};
export const updateUser = async (data) => {
  try {
    const response = await client.user.update(data)
   
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.error('Error in editUser:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};
export const addUser = async (data) => {
  try {
    const response = await client.user.add(data)
   
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error in addUser:', error);
    return { success: false, message: error?.response.data.message };
  }
};

export const checkUserName = async (userName) => {
  try {
    const response = await axios.post(
      `${USER_API_USER_NAME_CHECK_ENDPOINT}`,
      { username: userName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        // params: { username: userName }
      }
    );

    if (response.data.status) {
      return { success: true, message: 'UserName valid' };
    } else {
      return { success: false, message: 'UserName Invalid' };
    }
  } catch (error) {
    console.error('Error in searchUsers:', error);
    throw error;
  }
};
export const deleteUsers = async (userId) => {
  try {
    const response = await client?.user?.delete({userId:userId})


    return { success: true, message: 'User deleted successfully' };
    
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return { success: false, message: 'Failed to delete group' };
  }
};
export const getUserProfileById = async (data) => {
  try {
    const response = await client.admin.me(data)

    // Check if the response status is successful
    return { success: true, data: response.data };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllUsers:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const updateFcmToken = async (data) => {
  try {
    const response = await axios.post(`${USER_API_ENDPOINT}/update-token`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: data
    });

    if (response.data.status) {
      return { success: true, message: 'User Token updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};

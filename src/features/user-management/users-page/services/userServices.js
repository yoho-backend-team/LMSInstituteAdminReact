// groupService.js
import client from 'api/client';
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';
import secureLocalStorage from 'react-secure-storage';

const USER_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/user`;
const USER_API_USER_NAME_CHECK_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/user/check-username`;

const PROFILE_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/profile-management`;

export const getAllUsers = async (data) => {
  try {
    const response = await client.user.getAll(data);
    return response;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw new Error(`Failed to fetch users. Status: ${error?.response.data?.message}`);
  }
};

export const getStaffActivityLogs = async (params) => {
  try {
    const response = await client.TeachingStaff.getActivtiy(params);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserActivityLog = async (data) => {
  try {
    const response = await client.student.activity(data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error in getAllUsers Activity Log:', error);
    throw new Error(`Failed to fetch users. Activity Log: ${response.status}`);
  }
};

export const getUserById = async (data) => {
  try {
    const response = await client.user.getWithId(data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw new Error(`Failed to fetch users. Status: ${response.status}`);
  }
};

export const updateUserStatus = async (data) => {
  try {
    const response = client.user.update(data);
    return { success: true, message: 'User status updated successfully' };
  } catch (error) {
    console.error('Error in addUser:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const userChangePassword = async (data) => {
  try {
    const response = await client.admin.change_password(data);
    return { success: true, message: 'Password Changed Successfully' };
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await client.user.update(data);
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.error('Error in editUser:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const addUser = async (data) => {
  try {
    const response = await client.user.add(data);
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
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
        }
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
    const response = await client?.user?.delete({ userId: userId });
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return { success: false, message: 'Failed to delete group' };
  }
};

export const getUserProfileById = async (data) => {
  try {
    const response = await client.admin.me(data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
};

export const updateFcmToken = async (data) => {
  try {
    const response = await axios.post(`${USER_API_ENDPOINT}/update-token`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
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

export const getAllTickets = async (data) => {
  try {
    const response = await client.ticket.admin.get_all(data);
    return response;
  } catch (error) {
    console.error('Error in getAllTickets:', error);
    throw new Error(`Failed to fetch Tickets. Status: ${error.response?.status}`);
  }
};

export const updateTicket = async (data) => {
  try {
    const response = await axios.put(`${_TICKET_UPDATE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Ticket updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Ticket' };
    }
  } catch (error) {
    console.error('Error in updateTicket:', error);
    throw error;
  }
};

export const CreateTicket = async (data) => {
  try {
    await client.ticket.admin.create_ticket(data);
    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {
    const error_message = getErrorMessage(error);
    throw new Error(error_message);
  }
};

export const getAdminTicketWithId = async (data) => {
  try {
    const response = await client.ticket.admin.get_with_id(data);
    return response;
  } catch (error) {
    const error_message = getErrorMessage(error);
    throw new Error(error_message);
  }
};

export const updateAdminTicket = async (params, data) => {
  try {
    const response = await client.ticket.admin.update_ticket(params, data);
    return response;
  } catch (error) {
    const error_message = await getErrorMessage(error);
    throw new Error(error_message);
  }
};
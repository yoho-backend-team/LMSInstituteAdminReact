// StaffNotificationservice.js
import client from 'api/client';
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';

const STAFF_NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/notification-management/staff-notifications`;

export const getAllStaffNotifications = async (data) => {
  try {
    const response = await client.notification.staff.get_staff_notification(data)
    return response;
  } catch (error) {
    console.error('Error in getAllStaffNotifications:', error);
    throw error;
  }
};

export const getAllStaffDetailsWithRoleName = async (data) => {
  try {
  const response = await client.staff.get(data) 
  return {success:false,messag:response?.message,data:response} 
  } catch (error) {
    return {success:false,message:error?.message}
  }
}

export const getTeachingStaffsWithBranch = async (data) => {
  try {
  const response = await client.TeachingStaff.getWithBranch(data)
  return { success: false, message : response?.message, data:response}
  } catch (error) {
    return {success:false,message:error?.response?.data?.message}
  }
}

export const addStaffNotification = async (data) => {
  try {
    const response = await client.notification.staff.add_staff_notification(data)

    return { success: true, message: 'Staff Notification created successfully' };
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
};

export const deleteStaffNotification = async (StaffNotificationId) => {
  try {
    const response = await axios.delete(`${STAFF_NOTIFICATION_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StaffNotificationId }
    });

    if (response.data.status) {
      return { success: true, message: 'StaffNotification deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StaffNotification' };
    }
  } catch (error) {
    console.error('Error in deleteStaffNotification:', error);
    throw error;
  }
};

export const updateStaffNotification = async (data) => {
  try {
    const response = await axios.put(`${STAFF_NOTIFICATION_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StaffNotification updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StaffNotification' };
    }
  } catch (error) {
    console.error('Error in updateStaffNotification:', error);
    throw error;
  }
};

export const resendStaffNotification = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_PUBLIC_API_URL}/api/notification/staff-notification-resend`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StafftNotification Resend successfully' };
    } else {
      return { success: false, message: 'Failed to resend StaffNotification' };
    }
  } catch (error) {
    console.error('Error in resendStudentNotification:', error);
    throw error;
  }
};

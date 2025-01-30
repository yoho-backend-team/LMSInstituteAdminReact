// studentNotificationservice.js
import client from 'api/client';
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';

const STUDENT_NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/notification`;

export const getAllStudentNotifications = async (data) => {
  try {
    const response = await client.notification.student.get_student_notification(data)
    return response;
  } catch (error) {
    console.error('Error in getAllStudentNotifications:', error);
    throw error;
  }
};

export const searchStudentNotifications = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchStudentNotifications:', error);
    throw error;
  }
};

export const addStudentNotification = async (data) => {
  try {
    const response = await client.notification.student.add_student_notification(data)

    return { success: true, message: 'StudentNotification created successfully' };
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
};

export const deleteStudentNotification = async (StudentNotificationId) => {
  try {
    const response = await axios.delete(`${STUDENT_NOTIFICATION_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentNotificationId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentNotification deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentNotification' };
    }
  } catch (error) {
    console.error('Error in deleteStudentNotification:', error);
    throw error;
  }
};

export const updateStudentNotification = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_NOTIFICATION_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentNotification updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentNotification' };
    }
  } catch (error) {
    console.error('Error in updateStudentNotification:', error);
    throw error;
  }
};

export const resendStudentNotification = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_NOTIFICATION_API_ENDPOINT}/student-notification-resend`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response;

  } catch (error) {
    console.error('Error in resendNotification:', error);
    throw error;
  }
};

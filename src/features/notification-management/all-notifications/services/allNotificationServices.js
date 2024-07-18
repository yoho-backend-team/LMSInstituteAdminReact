// Notificationservice.js
import client from 'api/client';
import axios from 'axios';

const NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/notification-management`;
// const NOTIFICATION_AUTHBYUSER_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/get-notification-by-auth`;
export const getAllNotifications = async (data) => {
  try {
    const response = await client.notification.institute.get_institute_notification(data)
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchNotifications = async (searchQuery) => {
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
    console.error('Error in searchNotifications:', error);
    throw error;
  }
};

export const addNotification = async (data) => {
  try {
    const response = await client.notification.institute.add_institute_notification(data)

    return { success: true, message: 'Notification created successfully' };
  } catch (error) {
    console.error('Error in addNotification:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const deleteNotification = async (NotificationId) => {
  try {
    const response = await axios.delete(`${NOTIFICATION_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: NotificationId }
    });

    if (response.data.status) {
      return { success: true, message: 'Notification deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Notification' };
    }
  } catch (error) {
    console.error('Error in deleteNotification:', error);
    throw error;
  }
};

export const updateNotification = async (data) => {
  try {
    const response = await axios.put(`${NOTIFICATION_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Notification updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Notification' };
    }
  } catch (error) {
    console.error('Error in updateNotification:', error);
    throw error;
  }
};

export const resendNotification = async (data) => {
  try {
    const response = await axios.post(`${NOTIFICATION_API_ENDPOINT}/send-notification`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });


    if (response.data.status) {
      return { success: true, message: 'Notification Resend successfully' };
    } else {
      return { success: false, message: 'Failed to resend Notification' };
    }
  } catch (error) {
    console.error('Error in resendStudentNotification:', error);
    throw error;
  }
};

export const getAllNotificationsByAuth = async (data) => {
  try {
    const response = await axios.get(`${NOTIFICATION_API_ENDPOINT}/get-notification-by-auth`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response?.data?.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch AllNotifications. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllNotifications:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getLastNotifications = async (data) => {
  try {
    const response = await axios.get(`${NOTIFICATION_API_ENDPOINT}/get-last-notifications`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response?.data?.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Notifications. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getNotifications:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

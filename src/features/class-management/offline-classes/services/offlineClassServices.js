// groupService.js
import axios from 'axios';

const OFFLINE_CLASS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/class-management/offline-class`;

export const getAllOfflineClasses = async (data) => {
  try {
    const response = await axios.get(`${OFFLINE_CLASS_API_END_POINT}/get-offline-class-by-branch-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch OfflineClasses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllOfflineClasses:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchOfflineClasses = async (searchQuery) => {
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
    console.error('Error in searchOfflineClasses:', error);
    throw error;
  }
};

export const addOfflineClass = async (data) => {
  try {
    const response = await axios.post(`${OFFLINE_CLASS_API_END_POINT}/create-offline-class`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'OfflineClass created successfully' };
    } else {
      return { success: false, message: 'Failed to create OfflineClass' };
    }
  } catch (error) {
    console.error('Error in addOfflineClass:', error);
    throw error;
  }
};

export const deleteOfflineClass = async (data) => {
  try {
    const response = await axios.delete(`${OFFLINE_CLASS_API_END_POINT}/offline-class-delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'OfflineClass deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete OfflineClass' };
    }
  } catch (error) {
    console.error('Error in deleteOfflineClass:', error);
    throw error;
  }
};

export const updateOfflineClass = async (data) => {
  try {
    const response = await axios.put(`${OFFLINE_CLASS_API_END_POINT}/update-offline-class`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'OfflineClass updated successfully' };
    } else {
      return { success: false, message: 'Failed to update OfflineClass' };
    }
  } catch (error) {
    console.error('Error in updateOfflineClass:', error);
    throw error;
  }
};

export const getOfflineClassDetails = async (data) => {
  try {
    const response = await axios.get(`${OFFLINE_CLASS_API_END_POINT}/list-offline-class-by-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return {
        success: true,
        data: response?.data
      };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch batch. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getOfflineClassDetails:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

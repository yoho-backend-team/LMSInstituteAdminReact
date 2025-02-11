// groupService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const OFFLINE_CLASS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/class-management/offline-class`;

export const getAllOfflineClasses = async (data) => {
  try {
    const response = await client?.offline_class?.getAll(data)
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllOfflineClasses:', error);
    throw new Error(`Failed to fetch OfflineClasses. Status: ${error?.response?.data?.message}`);
  }
};

export const searchOfflineClasses = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
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
    const response = await client.offline_class.create(data)
    return { success: true, message: 'OfflineClass created successfully' };
  } catch (error) {
    console.error('Error in addOfflineClass:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to create OfflineClass' };
  }
};

export const deleteOfflineClass = async (data) => {
  try {
    const response = await client.offline_class.delete(data)

    return { success: true, message: 'OfflineClass deleted successfully' };
  } catch (error) {
    console.error('Error in deleteOfflineClass:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to delete OfflineClass' };
  }
};

export const updateOfflineClass = async (data) => {
  try {
    const response = await client.offline_class.update(data)
    return { success: true, message: 'OfflineClass updated successfully' };
  } catch (error) {
    console.error('Error in updateOfflineClass:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to update OfflineClass' };
  }
};

export const getOfflineClassDetails = async (data) => {
  try {
    const response = await client.offline_class.getWithId(data)
    // Check if the response status is successful
   
      return {
        success: true,
        data: response?.data
      };
    
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getOfflineClassDetails:', error);

    throw new Error(`Failed to fetch batch. Status: ${error?.response?.data?.message}`);
  }
};
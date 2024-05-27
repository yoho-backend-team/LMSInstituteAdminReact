// liveClassService.js
import client from 'api/client';
import axios from 'axios';

const LIVE_CLASS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/class-management/live-class`;

export const getAllLiveClasses = async (data) => {
  try {
    const response = await client.online_class.getAll(data)
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllLiveClasses:', error)
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch LiveClasses. Status: ${error?.response?.data?.message}`);
  }
};

export const searchLiveClasses = async (searchQuery) => {
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
    console.error('Error in searchLiveClasses:', error);
    throw error;
  }
};

export const addLiveClass = async (data) => {
  try {
    const response = await client?.online_class.create(data)
    return { success: true, message: 'LiveClass created successfully' };
  } catch (error) {
    console.error('Error in addLiveClass:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to create LiveClass' };
  }
};

export const deleteLiveClass = async (data) => {
  try {
    const response = await client?.online_class.delete(data)
  
    return { success: true, message: 'LiveClass deleted successfully' };
  } catch (error) {
    console.error('Error in deleteLiveClass:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to delete LiveClass' };
  }
};

export const updateLiveClass = async (data) => {
  try {
    const response = await client.online_class.update(data)
    return { success: true, message: 'LiveClass updated successfully' };
  } catch (error) {
    console.error('Error in updateLiveClass:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message :  'Failed to update LiveClass' };
  }
};

export const getLiveClassDetails = async (data) => {
  try {
    const response = await client.online_class.getWithId(data)
   
    return {
      success: true,
      data: response?.data
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getliveClassDetails:', error);
    throw new Error(`${error?.response?.data?.message}`);
  }
};

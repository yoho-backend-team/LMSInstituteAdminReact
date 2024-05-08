import axios from 'axios';
import client from 'api/client';            

const COMMUNITY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institute`;

export const getAllCommunities = async (data) => {
  try {
    console.log(data)
    const response = await client.community.getAll(data)

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      // Return the response directly, without extracting chatId
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Communities. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Communities:', error);
    throw error;
  }
};

export const getCommunityDetails = async (data) => {
  try {
    const response = await axios.get(`${COMMUNITY_API_END_POINT}/get-by-batch-id`, {
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
      throw new Error(`Failed to Community Details. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get Community Details:', error);
    throw error;
  }
};

export const getAllBatchChats = async (chatId) => {
  try {
    const response = await axios.get(`${COMMUNITY_API_END_POINT}/message/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response.data.data;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Communities. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Communities:', error);
    throw error;
  }
};

export const sendMessage = async (data) => {
  try {
    const response = await axios.post(`${COMMUNITY_API_END_POINT}/message-create`, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Community created successfully' };
    } else {
      return { success: false, message: 'Failed to create Community' };
    }
  } catch (error) {
    console.error('Error in addCommunity:', error);
    throw error;
  }
};

export const deleteCommunity = async (data) => {
  try {
    const response = await axios.delete(`${COMMUNITY_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Community deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Community' };
    }
  } catch (error) {
    console.error('Error in deleteCommunity:', error);
    throw error;
  }
};

export const updateCommunity = async (data) => {
  try {
    const response = await axios.post(`${COMMUNITY_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Community updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Community' };
    }
  } catch (error) {
    console.error('Error in updateCommunity:', error);
    throw error;
  }
};

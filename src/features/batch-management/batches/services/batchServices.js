// groupService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const BATCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institute`;

export const getAllBatchesByBranch = async (data) => {
  try {
    const response = await client.batch.getAll(data)

    // Check if the response status is successful

    return response;   
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllBatches:', error);

    throw error;
  }
};
export const getAllBatches = async (data) => {
  try {
    const response = await client.batch.getAll(data)
   
    return { success: true, data: response.data };
   
  } catch (error) {
    // Log the error for debugging purposes
 
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch batches. Status: ${error}`);
  }
};
export const getBatchesByCourse = async (data) => {
  try {
    const response = await client.batch.getAll(data)
    // Check if the response status is successful
    
      return { success: true, data: response.data };
      
     } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllBatches:', error);
    throw new Error(`Failed to fetch batches. Status: ${error}`);
  }
};

export const getBatchDetails = async (data) => {
  try {
    const response = await client.batch.getWithId(data)

    // Check if the response status is successful
    if (response.status) {
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
    console.error('Error in getBatchDetails:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getAllActiveBatchesByCourse = async (data) => {
  try {
    const response = await axios.get(`${BATCH_API_ENDPOINT}/get-by-course-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: data
    });

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch batches. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllBatches:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const addBatch = async (data) => {
  try {
    const response = await client.batch.create(data)

    if (response.status) {
      return { success: true, message: 'Batch created successfully' };
    } else {
      return { success: false, message: 'Failed to create batch' };
    }
  } catch (error) {
    console.error('Error in addBatch:', error);
    throw error;
  }
};

export const deleteBatch = async (data) => {
  try {
    const response = await client.batch.delete(data)

    return { success: true, message: 'Batch deleted successfully' };
  } catch (error) {
    console.error('Error in deleteBatch:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const updateBatch = async (data) => {
  try {
    const response = await client.batch.update(data)

    return { success: true, message: 'Batch updated successfully' };
  } catch (error) {
    console.error('Error in updateBatch:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const updateBatchStatus = async (data) => {
  try {
    const response = await client.batch.update(data)
 
    return { success: true, message: 'Batch updated successfully' };
  } catch (error) {
    console.error('Error in updateBatch:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

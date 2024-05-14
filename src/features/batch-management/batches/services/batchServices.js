// groupService.js
import client from 'api/client';
import axios from 'axios';

const BATCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institute/admin/batch-management/institute-batches`;

export const getAllBatchesByBranch = async (data) => {
  try {
    const response = await client.branch.getAll(data)
    console.log(response);
    // Check if the response status is successful
    if (response.status) {
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
export const getAllBatches = async (data) => {
  try {
    const response = await client.batch.getAll(data)
    console.log(response);
   
    return { success: true, data: response.data };
   
  } catch (error) {
    // Log the error for debugging purposes
 
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch batches. Status: ${error}`);
  }
};
export const getBatchesByCourse = async (data) => {
  try {
    console.log(data,"data")
    const response = await client.batch.getAll(data)
    console.log(response);
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
    console.log(response);
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
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
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
    const response = await axios.delete(`${BATCH_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'Batch deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Batch' };
    }
  } catch (error) {
    console.error('Error in deleteBatch:', error);
    throw error;
  }
};

export const updateBatch = async (data) => {
  try {
    const response = await axios.post(`${BATCH_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Batch updated successfully' };
    } else {
      return { success: false, message: 'Failed to update batch' };
    }
  } catch (error) {
    console.error('Error in updateBatch:', error);
    throw error;
  }
};

export const updateBatchStatus = async (data) => {
  try {
    const response = await axios.post(`${BATCH_API_ENDPOINT}/status-change`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Batch updated successfully' };
    } else {
      return { success: false, message: 'Failed to update batch' };
    }
  } catch (error) {
    console.log(error)
    console.error('Error in updateBatch:', error);
    throw error;
  }
};

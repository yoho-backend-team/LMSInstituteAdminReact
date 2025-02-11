// groupService.js
import client from 'api/client';
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';
import secureLocalStorage from 'react-secure-storage';

const BRANCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/1450d694-350b-4d78-90e9-ae2bc21f8677/branches/`;

export const getAllBranchesByInstitute = async (data) => {
  try {
    const response = await client.branch.getAll(data)

    // Check if the response status is successful
    if (response.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Branches. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllBranches:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getActiveBranches = async (params) => {
  try {
    const response = await client.branch.getAll(params)
   return response
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
};

export const addBranch = async (data) => {
  try {
    const response = await client.branch.create(data)

    return { success: true, message: 'Branch created successfully' };
  } catch (error) {
    console.error('Error in addBranch:', error);
    return { success: false, message: error.response.data.message? error.response.data.message : 'Failed to create Branch' };
  }
};

export const deleteBranch = async (data) => {
  try {
    const response = await axios.delete(`${BRANCH_API_ENDPOINT}${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
    });

    return { success: true, message: 'Branch deleted successfully' };
  } catch (error) {
    console.error('Error in deleteBranch:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to delete Branch' };
  }
};

export const updateBranch = async (data) => {
  try {
    const response = await axios.patch(`${BRANCH_API_ENDPOINT}${data.uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    
    return { success: true, message: 'Branch updated successfully' };
  } catch (error) {
    console.error('Error in updateBranch:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to update Branch' };
  }
};

export const updateBranchStatus = async (data) => {
  try {
    const response = await axios.patch(`${BRANCH_API_ENDPOINT}${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

   
    return { success: true, message: 'Branch updated successfully' };
  } catch (error) {
    console.error('Error in updateBranch:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const getBranchById = async (data) => {
  try {
    const response = await axios.get(`${BRANCH_API_ENDPOINT}${data.branch_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
    });
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch BranchesById. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getBranchById:', error);
    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

// groupService.js
import axios from 'axios';

const BRANCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/1450d694-350b-4d78-90e9-ae2bc21f8677/branches/`;

export const getAllBranchesByInstitute = async (data) => {
  try {
    const response = await axios.get(`${BRANCH_API_ENDPOINT}?page=${data?.page}`, {
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
      throw new Error(`Failed to fetch Branches. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllBranches:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getActiveBranches = async () => {
  try {
    const response = await axios.get(`${BRANCH_API_ENDPOINT}?is_active=true`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    // Check if the response status is successful
    console.log(response)
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Active Branches. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getActiveBranches:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const addBranch = async (data) => {
  try {
    const response = await axios.post(`${BRANCH_API_ENDPOINT}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Branch created successfully' };
    } else {
      return { success: false, message: response.data.error? response.data.error : 'Failed to create Branch' };
    }
  } catch (error) {
    console.error('Error in addBranch:', error);
    return { success: false, message: error.response.data.error? error.response.data.error : 'Failed to create Branch' };
  }
};

export const deleteBranch = async (data) => {
  try {
    const response = await axios.delete(`${BRANCH_API_ENDPOINT}${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    });

    if (response.data.status) {
      return { success: true, message: 'Branch deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Branch' };
    }
  } catch (error) {
    console.error('Error in deleteBranch:', error);
    throw error;
  }
};

export const updateBranch = async (data) => {
  try {
    const response = await axios.patch(`${BRANCH_API_ENDPOINT}${data.uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Branch updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Branch' };
    }
  } catch (error) {
    console.error('Error in updateBranch:', error);
    throw error;
  }
};

export const updateBranchStatus = async (data) => {
  console.log(data);
  try {
    const response = await axios.patch(`${BRANCH_API_ENDPOINT}${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Branch updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Branch' };
    }
  } catch (error) {
    console.error('Error in updateBranch:', error);
    throw error;
  }
};

export const getBranchById = async (data) => {
  try {
    console.log(data,"data")
    const response = await axios.get(`${BRANCH_API_ENDPOINT}${data.branch_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    });
    console.log('getBranchById:', response);
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

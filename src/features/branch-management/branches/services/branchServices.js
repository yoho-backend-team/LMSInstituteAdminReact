// groupService.js
import axios from 'axios';

const BRANCH_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/Branch-management/Branch`;

export const getAllBranches = async () => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Check if the response status is successful
    if (response.status === 200) {
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

export const searchBranches = async (searchQuery) => {
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
    console.error('Error in searchBranches:', error);
    throw error;
  }
};

export const addBranch = async (data) => {
  try {
    const response = await axios.post(`${BRANCH_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Branch created successfully' };
    } else {
      return { success: false, message: 'Failed to create Branch' };
    }
  } catch (error) {
    console.error('Error in addBranch:', error);
    throw error;
  }
};

export const deleteBranch = async (BranchId) => {
  try {
    const response = await axios.delete(`${BRANCH_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: BranchId }
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
    const response = await axios.put(`${BRANCH_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Branch updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Branch' };
    }
  } catch (error) {
    console.error('Error in updateBranch:', error);
    throw error;
  }
};

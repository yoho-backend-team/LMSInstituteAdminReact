// StaffIdCardService.js
import axios from 'axios';

const STAFF_ID_CARDS_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/staffidcard`;

export const getAllStaffIdCards = async (data) => {
  try {
    const response = await axios.get(`${STAFF_ID_CARDS_API_ENDPOINT}/${data?.instituteid}/${data?.branchid}?page=${data?.page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Staff Id Cards. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffiCards:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStaffIdCards = async (searchQuery) => {
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
    console.error('Error in searchStaffIdCards:', error);
    throw error;
  }
};

export const addStaffIdCard = async (data) => {
  try {
    const response = await axios.post(`${STAFF_ID_CARDS_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StaffIdCard created successfully' };
    } else {
      return { success: false, message: 'Failed to create StaffIdCard' };
    }
  } catch (error) {
    console.error('Error in addStaffIdCard:', error);
    throw error;
  }
};

export const deleteStaffIdCard = async (StaffIdCardId) => {
  try {
    const response = await axios.delete(`${STAFF_ID_CARDS_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StaffIdCardId }
    });

    if (response.data.status) {
      return { success: true, message: 'StaffIdCard deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StaffIdCard' };
    }
  } catch (error) {
    console.error('Error in deleteStaffIdCard:', error);
    throw error;
  }
};

export const updateStaffIdCard = async (data) => {
  try {
    const response = await axios.put(`${STAFF_ID_CARDS_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StaffIdCard updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StaffIdCard' };
    }
  } catch (error) {
    console.error('Error in updateStaffIdCard:', error);
    throw error;
  }
};

export const updateStaffIdCardStatus = async (uuid, data) => {
  try {
    const response = await axios.put(`${STAFF_ID_CARDS_API_ENDPOINT}/${uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Staff updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Staff' };
    }
  } catch (error) {
    console.error('Error in updateStaff:', error);
    throw error;
  }
};

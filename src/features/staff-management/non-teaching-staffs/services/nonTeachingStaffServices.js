// NonTeachingStaffservice.js
import client from 'api/client';
import axios from 'axios';
import { useInstitute } from 'utils/get-institute-details';
import { useBranchId } from 'utils/get-institute-details';
import secureLocalStorage from 'react-secure-storage';

const NON_TEACHING_STAFF_API_END_POINT_get = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes`;

const NON_TEACHING_STAFF_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/Non-teaching-staff`;

export const getAllNonTeachingStaffs = async (data) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/non-teaching-staff/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: data
    });

    // Check if the response status is successful
    if (response.data) {
      return { success: true, data: response.data.data};
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch non teaching staffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in non teaching staffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getAllActiveNonTeachingStaffs = async (data) => {
  try {
    const response = await axios.get(`${NON_TEACHING_STAFF_API_END_POINT}/active`, {
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
      throw new Error(`Failed to fetch TeachingStaffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchNonTeachingStaffs = async (searchQuery) => {
  try {
    const response = await axios.get(`${NON_TEACHING_STAFF_API_END_POINT}/search`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchNonTeachingStaffs:', error);
    throw error;
  }
};

export const addNonTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/auth/Non-teaching-staff/register`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaff created successfully' };
    } else {
      return { success: false, message: 'Failed to create NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in addNonTeachingStaff:', error);
    throw error;
  }
};

export const deleteNonTeachingStaff = async (data) => {
  try {
    const response = await axios.delete(`${NON_TEACHING_STAFF_API_END_POINT_get}/${data?.instituteId}/branches/${data?.branchid}/non-teaching-staff/${data?.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaff deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in deleteNonTeachingStaff:', error);
    throw error;  
  }
};

export const updateNonTeachingStaff = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/non-teaching-staff/update/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Token ${secureLocalStorage.getItem('token')}`
        }
      }
    );

    if (response.data.status) {
      return { success: true, message: response.data.message, response: response.data };
    } else {
      return { success: false, message: 'Failed to update non-teaching staff' };
    }
  } catch (error) {
    console.error('Error in updateNonTeachingStaff:', error);
    throw error;
  }
};

export const nonTeachingStaffById = async (data) => {
  try {
    const response = await client.users.getnonstaffWithId(data)
    // Check if the response status is successful
    if (response.status) {
      return { success: true, data: response.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch a Nonstaff. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in fetching  Nonstaff:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const nonteachstaffStatusChange = async (uuid, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/non-teaching-staff/updatestatus/${uuid}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${secureLocalStorage.getItem('token')}`
        }
      }
    );

    if (response.data.status) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in staff status change:', error);
    throw error;
  }
};
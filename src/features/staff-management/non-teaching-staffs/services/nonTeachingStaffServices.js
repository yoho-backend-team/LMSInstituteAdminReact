// NonTeachingStaffservice.js
import client from 'api/client';
import axios from 'axios';
import { useInstitute } from 'utils/get-institute-details';
import { useBranchId } from 'utils/get-institute-details';

const NON_TEACHING_STAFF_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/Non-teaching-staff`;

export const getAllNonTeachingStaffs = async (data) => {
  try {
    const response = await client.nonTeachingStaff.get(data)

    console.log('Non-teachingStaffs:', response);

    // Check if the response status is successful
    if (response.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch NonTeachingStaffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllNonTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const getAllActiveNonTeachingStaffs = async (data) => {
  try {
    const response = await axios.get(`${NON_TEACHING_STAFF_API_END_POINT}/active`, {
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
    const response = await axios.get
    (`${NON_TEACHING_STAFF_API_END_POINT}/search`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
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
    const response = await axios.post(`${NON_TEACHING_STAFF_API_END_POINT}/register`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

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

export const deleteNonTeachingStaff = async (nonTeachingStaffId) => {
  try {
    const response = await axios.delete(`${NON_TEACHING_STAFF_API_END_POINT}/:id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: { id: nonTeachingStaffId }
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
    console.log(data,"data")
    const response = await axios.put(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/non-teaching-staff/update/${data.id}`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'NonTeachingStaff updated successfully' };
    } else {
      return { success: false, message: 'Failed to update NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in updateNonTeachingStaff:', error);
    throw error;
  }
};

export const nonTeachingStaffById = async (data) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/non-teaching-staff/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log('non-teachingStaff:', response);
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch teaching staffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in teaching staffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

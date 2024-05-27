// TeachingStaffservice.js
import client from 'api/client';
import axios from 'axios';
import { useBranchId, useInstitute } from 'utils/get-institute-details';

const TEACHING_STAFF_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/teaching-staff`;

export const getAllTeachingStaffs = async (data) => {
  try {
    const response = await client.TeachingStaff.get(data)
    console.log(response);

    // Check if the response status is successful
    if (response.status) {
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
export const getAllActiveTeachingStaffs = async (data) => {
  try {
    const response = await client?.TeachingStaff.get(data)

    console.log(response);

    // Check if the response status is successful
   
      return response;
    
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch TeachingStaffs. Status: ${error.response.data.message}`);

  }
};

export const searchTeachingStaffs = async (searchQuery) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT}/search`, {
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
    console.error('Error in searchTeachingStaffs:', error);
    throw error;
  }
};

export const addTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_API_END_POINT}/register`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'TeachingStaff created successfully' };
    } else {
      return { success: false, message: 'Failed to create TeachingStaff' };
    }
  } catch (error) {
    console.error('Error in addTeachingStaff:', error);
    throw error;
  }
};

export const deleteTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_API_END_POINT}/delete`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
   
      return { success: true, message: 'TeachingStaff deleted successfully' };
   
  } catch (error) {
    console.error('Error in deleteTeachingStaff:', error);
    return { success: false, message: error?.response?.data?.message? error?.response?.data?.message: 'Failed to delete StaffSalaies' };
  }
};

export const updateTeachingStaff = async (data) => {
  try {
    console.log(localStorage.getItem("token"))
    const institute = useInstitute().getInstituteId()
    const branch = useBranchId()
    const response = await axios.put(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${institute}/branches/${branch}/teaching-staff/update/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'TeachingStaff updated successfully' };
    } else {
      return { success: false, message: 'Failed to update TeachingStaff' };
    }
  } catch (error) {
    console.error('Error in updateTeachingStaff:', error);
    throw error;
  }
};

export const TeachingStaffById = async (data) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT}/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log('teachingStaff:', response);
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data};
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

export const staffChangePassword = async (data) => {
  try {
    const response = await axios.put(`${TEACHING_STAFF_API_END_POINT}/change-password`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'User status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};

export const staffStatusChange = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Staff status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in staff:', error);
    throw error;
  }
};

export const staffById = async (data) => {
  try {
       const response = await client.users.getStudentWithId(data)
    console.log(response,data);
    // Check if the response status is successful
    if (response.status) {
      return { success: true, data: response.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch a student. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in fetching  student:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
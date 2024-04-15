// TeachingStaffservice.js
import axios from 'axios';

const TEACHING_STAFF_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/staff-management/teaching-staff`;

export const getAllTeachingStaffs = async (data) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT}/read-by-branch-id`, {
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
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT}/get-staff-by-status`, {
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
      throw new Error(`Failed to fetch TeachingStaffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchTeachingStaffs = async (searchQuery) => {
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
    console.error('Error in searchTeachingStaffs:', error);
    throw error;
  }
};

export const addTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_API_END_POINT}/create`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
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
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'TeachingStaff deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete TeachingStaff' };
    }
  } catch (error) {
    console.error('Error in deleteTeachingStaff:', error);
    throw error;
  }
};

export const updateTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
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
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT}/read-by-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log('teachingStaff:', response);
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

export const staffChangePassword = async (data) => {
  try {
    const response = await axios.put(`${TEACHING_STAFF_API_END_POINT}/status-update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
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
        Authorization: `Bearer ${localStorage.getItem('token')}`
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

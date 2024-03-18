// groupService.js
import axios from 'axios';

const TEACHING_STAFF_SALARIES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/payment-management/staff-salaries`;

export const getAllStaffSalaries = async (data) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_SALARIES_API_END_POINT}/read-by-branch-id`, {
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
      throw new Error(`Failed to fetch TeachingStaffSalaries. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffSalaries:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchTeachingStaffSalaries = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data.status) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchTeachingStaffSalaries:', error);
    throw error;
  }
};

export const addTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_SALARIES_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'TeachingStaffSalary created successfully' };
    } else {
      return { success: false, message: 'Failed to create TeachingStaffSalary' };
    }
  } catch (error) {
    console.error('Error in addTeachingStaffSalary:', error);
    throw error;
  }
};

export const deleteTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.delete(`${TEACHING_STAFF_SALARIES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(data);
    if (response.data.status) {
      return { success: true, message: 'TeachingStaffSalary deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete TeachingStaffSalary' };
    }
  } catch (error) {
    console.error('Error in deleteTeachingStaffSalary:', error);
    throw error;
  }
};

export const updateTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_SALARIES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'TeachingStaffSalary updated successfully' };
    } else {
      return { success: false, message: 'Failed to update TeachingStaffSalary' };
    }
  } catch (error) {
    console.error('Error in updateTeachingStaffSalary:', error);
    throw error;
  }
};

export const updateTeachingStaffSalaryStatus = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_SALARIES_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Course updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Course' };
    }
  } catch (error) {
    console.error('Error in updateCourse:', error);
    throw error;
  }
};

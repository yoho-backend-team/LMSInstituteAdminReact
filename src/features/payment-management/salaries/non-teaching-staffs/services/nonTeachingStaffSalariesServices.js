// groupService.js
import axios from 'axios';

const NON_TEACHING_STAFF_SALARIES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/NonTeachingStaffSalary-management/NonTeachingStaffSalary`;

export const getAllNonTeachingStaffSalaries = async () => {
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
      throw new Error(`Failed to fetch NonTeachingStaffSalaries. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllNonTeachingStaffSalaries:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchNonTeachingStaffSalaries = async (searchQuery) => {
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
    console.error('Error in searchNonTeachingStaffSalaries:', error);
    throw error;
  }
};

export const addNonTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.post(`${NON_TEACHING_STAFF_SALARIES_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaffSalary created successfully' };
    } else {
      return { success: false, message: 'Failed to create NonTeachingStaffSalary' };
    }
  } catch (error) {
    console.error('Error in addNonTeachingStaffSalary:', error);
    throw error;
  }
};

export const deleteNonTeachingStaffSalary = async (NonTeachingStaffSalaryId) => {
  try {
    const response = await axios.delete(`${NON_TEACHING_STAFF_SALARIES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: NonTeachingStaffSalaryId }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaffSalary deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete NonTeachingStaffSalary' };
    }
  } catch (error) {
    console.error('Error in deleteNonTeachingStaffSalary:', error);
    throw error;
  }
};

export const updateNonTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.put(`${NON_TEACHING_STAFF_SALARIES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'NonTeachingStaffSalary updated successfully' };
    } else {
      return { success: false, message: 'Failed to update NonTeachingStaffSalary' };
    }
  } catch (error) {
    console.error('Error in updateNonTeachingStaffSalary:', error);
    throw error;
  }
};

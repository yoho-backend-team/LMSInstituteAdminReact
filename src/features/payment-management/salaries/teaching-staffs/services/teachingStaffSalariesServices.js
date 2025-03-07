// groupService.js
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const TEACHING_STAFF_SALARIES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/payments/staff-salary`;

export const getAllStaffSalaries = async (data) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_SALARIES_API_END_POINT}/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: data
    });
    
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffSalaries:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch TeachingStaffSalaries. Status: ${error?.response?.data.message}`);
  }
};

export const addTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_SALARIES_API_END_POINT}`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
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
    const response = await axios.delete(`${TEACHING_STAFF_SALARIES_API_END_POINT}/${data.transaction_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: data
    });
    
      return { success: true, message: 'TeachingStaffSalary deleted successfully' };
  } catch (error) {
    console.error('Error in deleteTeachingStaffSalary:', error);
    return { success: false, message: error?.response?.data?.message? error?.response?.data?.message: 'Failed to delete StaffSalary' };
  }
};

export const updateTeachingStaffSalary = async (data) => {
  try {
    const response = await axios.put(`${TEACHING_STAFF_SALARIES_API_END_POINT}/update/${data._id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    }); 
   return { success: true, message: 'TeachingStaffSalary updated successfully' };
  } catch (error) {
    console.error('Error in updateTeachingStaffSalary:', error);
    return { success: false, message: error?.response?.data?.message? error?.response?.data?.message: 'Failed to update TeachingStaffSalary' };
  }
};

export const updateTeachingStaffSalaryStatus = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_SALARIES_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

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
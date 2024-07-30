// groupService.js
import client from 'api/client';
import axios from 'axios';

const STUDENT_ATTENDANCES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/attendance`;

export const getAllStudentAttendances = async (data) => {
  try {
    const response = await client.attedence.get_all_student_attedence(data)
    // Check if the response stat
      return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentAttendances:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StudentAttendances. Status: ${error?.response?.data?.message}`);
  }
};

export const searchStudentAttendances = async (searchQuery) => {
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
    console.error('Error in searchStudentAttendances:', error);
    throw error;
  }
};

export const addStudentAttendance = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_ATTENDANCES_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentAttendance created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentAttendance' };
    }
  } catch (error) {
    console.error('Error in addStudentAttendance:', error);
    throw error;
  }
};

export const deleteStudentAttendance = async (StudentAttendanceId) => {
  try {
    const response = await axios.delete(`${STUDENT_ATTENDANCES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentAttendanceId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentAttendance deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentAttendance' };
    }
  } catch (error) {
    console.error('Error in deleteStudentAttendance:', error);
    throw error;
  }
};

export const updateStudentAttendance = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_ATTENDANCES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentAttendance updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentAttendance' };
    }
  } catch (error) {
    console.error('Error in updateStudentAttendance:', error);
    throw error;
  }
};

export const getClassDetails = async (data) => {
  try {
    const response = await client.attedence.get_with_id(data)

    // Check if the response status is successful
    return {
      success: true,
      data: response?.data
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getOfflineClassDetails:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch batch. Status: ${error?.response?.data?.message}`);
  }
};

export const updateStudentAttendanceStatus = async (data) => {
  try {
    const response = await client.attedence.mark_attedence(data)

    return { success: true, message: 'StudentAttendance status updated successfully' };
  } catch (error) {
    console.error('Error in updateStudentAttendance:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};
